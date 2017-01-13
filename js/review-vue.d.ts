/// <reference path="../node_modules/vue/types/index.d.ts" />
/// <reference types="jquery" />
declare class Loader {
    private $wrapper;
    constructor($wrapper: JQuery);
    start(): void;
    end(): void;
}
interface GSheetOption {
    sheet: string;
    action?: string;
    filter?: any;
    data?: any;
    done?: (response?, textStatus?, jqXHR?) => void;
    fail?: (jqXHR?, textStatus?, errorThrown?) => void;
}
declare class GSheet {
    private _apiUrl;
    constructor(apiUrl: string);
    private getJSON(obj);
    run(option: GSheetOption): void;
}
