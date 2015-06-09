'use strict';

(function (App) {
    var Ajax = function () {
    };

    Ajax.prototype.get = function (options) {
        options.method = 'GET';

        return this.call(options);
    };

    Ajax.prototype.post = function (options) {
        options.method = 'POST';

        return this.call(options);
    };

    Ajax.prototype.call = function (options) {
        var xmlhttp = new XMLHttpRequest(),
            query = '';

        options = options || {};

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (!('loader' in options)) {
                    this.parent.loader();
                }

                if (xmlhttp.status === 200) {
                    var response = xmlhttp.responseText || '';

                    if (response) {
                        response = JSON.parse(response);
                    }

                    options.success && options.success(response);
                }
            }
        }.bind(this);

        if (options.method === 'GET' && options.data) {
            query = '?' + Object.keys(options.data).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
            }).join('&');

            delete options.data;
        }

        if (!('loader' in options)) {
            this.parent.loader(true);
        }

        xmlhttp.open(options.method, options.url + query);
        xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xmlhttp.send(options.data ? JSON.stringify(options.data) : '');

        return xmlhttp;
    };

    App.prototype.Utils.Ajax = Ajax;
}(window.App));
