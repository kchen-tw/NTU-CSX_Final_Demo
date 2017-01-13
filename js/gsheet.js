var GSheet = (function () {
    function GSheet(apiUrl) {
        this._apiUrl = apiUrl;
    }
    GSheet.prototype.getJSON = function (obj) {
        if (obj && !Array.isArray(obj)) {
            obj = [obj];
        }
        return JSON.stringify(obj || []);
    };
    GSheet.prototype.run = function (option) {
        var params = {
            sheet: option.sheet,
            filter: this.getJSON(option.filter),
            data: this.getJSON(option.data),
        };
        if (option.action) {
            params.action = option.action;
        }
        var request = $.ajax({
            url: this._apiUrl,
            type: 'post',
            // dataType: "jsonp",
            data: $.param(params)
        });
        if (option.done) {
            request.done(function (response, textStatus, jqXHR) {
                option.done(response, textStatus, jqXHR);
            });
        }
        if (option.fail) {
            request.fail(function (jqXHR, textStatus, errorThrown) {
                option.fail(jqXHR, textStatus, errorThrown);
            });
        }
    };
    return GSheet;
}());
