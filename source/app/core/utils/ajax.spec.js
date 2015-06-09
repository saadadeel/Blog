'use strict';

describe('core: ', function () {
    beforeEach(function () {
        window.XMLHttpRequest = function () {};

        window.XMLHttpRequest.prototype.open = sinon.spy();
        window.XMLHttpRequest.prototype.setRequestHeader = sinon.spy();
        window.XMLHttpRequest.prototype.send = sinon.spy();
    });

    afterEach(function () {
        delete window.XMLHttpRequest;
    });

    describe('When the "mood-selector" is being instantiated', function () {
        var ajax;

        beforeEach(function () {
            ajax = new App.prototype.Utils.Ajax({
                loader: sinon.spy()
            });

            ajax.parent = {
                loader: sinon.spy()
            };
        });

        describe('Given there is a POST method', function () {
            var method = 'post';

            describe('And there is an endpoint', function () {
                var url = 'http://localhost';

                describe('And there is data', function () {
                    var data = {
                        hello: 'world'
                    };

                    describe('And there is a successful callback', function () {
                        var cb = sinon.spy();

                        describe('When the ajax function is being called', function () {
                            var ajaxCall,
                                stubParentLoader;

                            beforeEach(function () {
                                ajaxCall = ajax[method]({
                                    url: url,
                                    data: data,
                                    success: cb
                                });
                            });

                            it('should open connection using specified method and url', function () {
                                expect(window.XMLHttpRequest.prototype.open).to.be.calledWith(method.toUpperCase(), url);
                            });

                            it('should set request header to accept json', function () {
                                expect(window.XMLHttpRequest.prototype.setRequestHeader).to.be.calledWith('Content-Type', 'application/json;charset=UTF-8');
                            });

                            it('should send the data as stringified JSON', function () {
                                expect(window.XMLHttpRequest.prototype.send).to.be.calledWith(JSON.stringify(data));
                            });

                            it('should initiate loading state', function () {
                                expect(ajax.parent.loader).to.be.calledWith(true);
                            });

                            describe('Given server returns data', function () {
                                var response = {
                                    id: 123
                                };

                                describe('When the request is successfully executed', function () {
                                    beforeEach(function () {
                                        ajax.parent.loader.reset();

                                        ajaxCall.readyState = 4;
                                        ajaxCall.status = 200;
                                        ajaxCall.responseText = JSON.stringify(response);

                                        ajaxCall.onreadystatechange();
                                    });

                                    afterEach(function () {
                                        cb.reset();
                                    });

                                    it('should hide the loading state', function () {
                                        expect(ajax.parent.loader).to.be.calledWith();
                                    });

                                    it('should execute the success callback', function () {
                                        expect(cb).to.be.calledWith(response);
                                    });
                                });
                            });

                            describe('Given server returns no data', function () {
                                describe('When the request is successfully executed', function () {
                                    beforeEach(function () {
                                        ajax.parent.loader.reset();

                                        ajaxCall.readyState = 4;
                                        ajaxCall.status = 200;

                                        ajaxCall.onreadystatechange();
                                    });

                                    afterEach(function () {
                                        cb.reset();
                                    });

                                    it('should hide the loading state', function () {
                                        expect(ajax.parent.loader).to.be.calledWith();
                                    });

                                    it('should execute the success callback', function () {
                                        expect(cb).to.be.calledWith();
                                    });
                                });
                            });

                            describe('When the request is unsuccessfully executed', function () {
                                beforeEach(function () {
                                    ajax.parent.loader.reset();

                                    ajaxCall.readyState = 4;
                                    ajaxCall.status = 400;

                                    ajaxCall.onreadystatechange();
                                });

                                afterEach(function () {
                                    cb.reset();
                                });

                                it('should hide the loading state', function () {
                                    expect(ajax.parent.loader).to.be.calledWith();
                                });

                                it('should not execute the success callback', function () {
                                    expect(cb).to.not.be.called;
                                });
                            });
                        });
                    });
                });
            });
        });

        describe('Given there is a GET method', function () {
            var method = 'get';

            describe('And there is an endpoint', function () {
                var url = 'http://localhost';

                describe('When the ajax function is being called', function () {
                    beforeEach(function () {
                        ajax[method]({
                            url: url
                        });
                    });

                    it('should open connection using specified method and url', function () {
                        expect(window.XMLHttpRequest.prototype.open).to.be.calledWith(method.toUpperCase(), url);
                    });

                    it('should set request header to accept json', function () {
                        expect(window.XMLHttpRequest.prototype.setRequestHeader).to.be.calledWith('Content-Type', 'application/json;charset=UTF-8');
                    });

                    it('should send the data as stringified JSON', function () {
                        expect(window.XMLHttpRequest.prototype.send).to.be.calledWith('');
                    });
                });
            });
        });
    });
});
