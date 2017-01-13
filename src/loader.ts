class Loader {
    private $wrapper: JQuery;
    constructor($wrapper: JQuery) {
        this.$wrapper = $wrapper;
    }
    start() {
        this.$wrapper.removeClass('hide');
    }
    end() {
        this.$wrapper.addClass('hide');
    }
}