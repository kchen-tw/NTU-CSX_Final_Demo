interface GSheetOption {
    sheet: string;
    action?: string;
    filter?: any;
    data?: any;
    done?: (response?, textStatus?, jqXHR?) => void;
    fail?: (jqXHR?, textStatus?, errorThrown?) => void;
}


class GSheet {
    private _apiUrl: string;

    constructor(apiUrl: string) {
        this._apiUrl = apiUrl;
    }
    private getJSON(obj: any): string {
        if (obj && !Array.isArray(obj)) {
            obj = [obj];
        }
        return JSON.stringify(obj || [])
    }
    run(option: GSheetOption) {
        var params: GSheetOption = {
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
    }

}