'use strict';

module.exports = grunt;

function grunt (grunt) {
    require('load-grunt-tasks')(grunt);

    var files = {
            less: {}
        };

    files.less['dist/app/app.css'] = 'dist/app/app.less';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            local: {
                files: {
                    src: [
                        'source/app/**/*.js',
                        '!source/app/lib/**/*.js',
                        '!source/app/**/*.spec.js'
                    ]
                }
            }
        },

        clean: {
            before: ['dist/**/*'],
            after: [
                'dist/app'
            ]
        },

        copy: {
            dev: {
                files: [{
                    cwd: 'source',
                    expand: true,
                    src: ['**'],
                    dest: 'dist'
                }]
            },
            prod: {
                files: [{
                    cwd: 'source',
                    expand: true,
                    src: ['**'],
                    dest: 'dist'
                }]
            }
        },

        importLess: {
            files: [
                './lib/reset-css/reset.css',
                './lib/lesshat/build/lesshat.less'
            ]
        },

        less: {
            options: {
                relativeUrls: true
            },
            dev: {
                files: files.less
            },
            prod: {
                options: {
                    compress: true,
                    rootpath: './dist'
                },
                files: files.less
            }
        },

        strip_code: {
            local: {
                src: [
                    'dist/app/**/*.js',
                    '!dist/app/lib/**/*.js'
                ]
            }
        },

        templating: {
            scripts: [
                'dist/app/lib/fastclick/lib/fastclick.js'
            ]
        },

        watch: {
            all: {
                files: [
                    'source/app/**/*.less',
                    'source/app/**/*.jpg',
                    'source/app/**/*.png',
                    'source/app/**/*.gif',
                    'source/app/**/*.js',
                    'source/app/**/*.html'
                ],
                tasks: [
                    'compile'
                ]
            },
            jshint: {
                files: [
                    'source/app/**/*.js',
                    '!source/app/lib/**/*.js',
                    '!source/app/**/*.spec.js'
                ],
                tasks: ['jshint:local']
            },
            copy: {
                files: [
                    'source/app/**/*.js'
                ],
                tasks: [
                    'compile'
                ]
            },
            templating: {
                files: [
                    'source/app/!(lib)/**/*.html',
                    'source/*.html'
                ],
                tasks: [
                    'compile'
                ]
            }
        },

        connect: {
            local: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    base: './dist'
                }
            }
        },

        karma: {
            options: {
                frameworks: ['mocha', 'sinon-chai'],
                basePath: './',
                files: grunt.file.expand([
                    '!source/app/lib/**/*',
                    'source/app/*.js',
                    'source/app/!(lib)/**/*.html',
                    'source/app/!(lib)/**/*.js'
                ]),
                reporters: ['progress'],
                port: 9876,
                runnerPort: 9100,
                colors: true,
                logLevel: 'ERROR',
                autoWatch: true,
                browsers: ['PhantomJS'],
                captureTimeout: 5000,
                singleRun: false,
                reportSlowerThan: 500
            },
            local: {
                options: {
                    singleRun: true,
                    preprocessors: {
                        'source/app/!(lib)/**/*.html': ['html2js']
                    },
                }
            },
            coverage: {
                options: {
                    reporters: ['progress', 'coverage'],
                    preprocessors: {
                        'source/app/**/!(*.spec).js': ['coverage'],
                        '!source/app/lib/**/*.js': ['coverage'],
                        'source/app/!(lib)/**/*.html': ['html2js']
                    },
                    coverageReporter: {
                        dir : 'test/coverage/',
                        reporters: [{
                            type: 'html'
                        }, {
                            type: 'text'
                        }]
                    }
                }
            }
        },

        uglify: {
            prod: {
                options: {
                    screwIE8: true
                },
                files: {
                    'dist/app/app.js': [
                        'dist/app/lib/fastclick/lib/fastclick.js',
                        'dist/app/*.js',
                        'dist/app/!(lib)/**/*.js',
                        '!dist/app/**/*.spec.js'
                    ]
                }
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            prod: {
                files: grunt.file.expandMapping(['app/**/*.html'], 'dist', {cwd: 'source'})
            }
        }
    });

    grunt.registerTask('import-less', 'Creating less file with all application imports', function () {
        var config = grunt.config.get('importLess'),
            files = config.files.concat(['./!(lib)/**/*.less']),
            dest = 'dist/app/',
            sources = grunt.file.expand({cwd: dest}, files),
            content = '';

        sources.forEach(function (path) {
            var line = path.replace(dest, '');

            content += "@import (less) '" + line + "';" + '\n';
        });

        grunt.file.write(dest + 'app.less', content);
    });

    grunt.registerTask('templating', 'Compiling templates...', function (env) {
        var config = grunt.config.get(this.name),
            files = 'dist/*.html';

        files = grunt.file.expand(files);

        files.forEach(function (file) {
            var namespace = file.split('/').pop().split('.')[0],
                scriptsPath = [
                    'dist/app/**/*.js',
                    '!' + 'dist/app/lib/**/*.js',
                    '!' + 'dist/app/**/*.spec.js'
                ],
                templatePath = [
                    'dist/app/!(lib)/**/*.html'
                ],
                scripts = config.scripts.concat(grunt.file.expand(scriptsPath)),
                styles = ['dist/app/app.css'],
                templates = grunt.file.expand(templatePath),
                layout = grunt.file.read(file),
                compiledTemplates = '',
                compiledScripts = '',
                compiledStyles = '',
                content,
                i;

            if (env === 'dev') {
                for (i in templates) {
                    compiledTemplates += '<script id="' + resolvePath(file, templates[i]).replace('app/', '') + '" type="text/template">' + grunt.file.read('dist/' + resolvePath(file, templates[i])) + '</script>';
                }

                for (i in scripts) {
                    compiledScripts += '\n\t\t<script src="' + resolvePath(file, scripts[i]) + '"></script>';
                }

                for(i in styles){
                    compiledStyles += '<link rel="stylesheet" href="' + resolvePath(file, styles[i]) + '">';
                }
            }                       

            if (env === 'prod') {
                scripts = ['dist/app/app.js'];
                compiledScripts += '<script>';
                compiledStyles += '<style>';

                for (i in templates) {
                    compiledTemplates += '<script id="' + resolvePath(file, templates[i]).replace('app/', '') + '" type="text/template">' + grunt.file.read('dist/' + resolvePath(file, templates[i])) + '</script>';
                }

                for (i in scripts) {
                    compiledScripts += grunt.file.read('dist/' + resolvePath(file, scripts[i]));
                }

                for (i in styles) {
                    compiledStyles += grunt.file.read('dist/' + resolvePath(file, styles[i]));
                }

                compiledScripts += '</script>';
                compiledStyles += '</style>';
            }

            content = grunt.template.process(layout, {data: {
                templates: compiledTemplates,
                scripts: compiledScripts,
                styles: compiledStyles
            }});

            grunt.file.write(file, content);
        });

        function resolvePath (to, from) {
            to = to.split('/');
            to.pop();
            to = to.join('/') + '/';

            return from.replace(to, '');
        }
    });

    grunt.registerTask('compile', 'For Build and QA environments', function (env) {
	env = env || 'local';

        grunt.task.run([
            'clean:before',
            'copy:dev',
            'configure:' + env,
            'import-less',
            'less:dev',
            'templating:dev'
        ]);
    });

    grunt.registerTask('default', 'For local development', function () {
        grunt.task.run([
            'compile',
            'connect:local',
            'watch'
        ]);
    });

    grunt.registerTask('build', 'For Staging and Production environments', function (env) {
        grunt.task.run([
            'jshint:local',
            'karma:local',
            'clean:before',
            'copy:prod',
            'configure:' + env,
            'import-less',
            'less:prod',
            'strip_code:local',
            'uglify:prod',
            'htmlmin:prod',
            'templating:prod',
            'clean:after'
        ]);
    });

    grunt.registerTask('test', function (env) {
        grunt.task.run('karma:coverage');
    });

    grunt.registerTask('configure', 'Writes configuration for communicating with the server', function (env) {
        var indexContent,
            domain = {
                local: "'http://localhost:8081/api'",
                prod: "'//' + window.location.hostname + '/api/v1'"
            };

        indexContent = [
            "'use strict';\n\n" +
            "(function (App) {\n" +
            "\tApp.prototype.config = {};\n" +
            "\tApp.prototype.config.ENV = '" + env + "';\n" +
            "\tApp.prototype.config.API = " + domain[env] + ";\n" +
            "}(window.App));"
        ].join('');

        grunt.file.write('dist/app/core/config.js', indexContent);
    });
}
