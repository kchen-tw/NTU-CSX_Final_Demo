/**
 * 抓取 Google Sheet 的資料，並且以 JSON 格式回傳
 * @param {any} options
 *              action = 'search'; 設定為抓取的動作為查詢
 *
 * @param {any} callback
 * @author kchen.tw
 * @since 0.1.1 01/09/2017 kchen.tw
 * @version 0.1.1
 *
 */
function queryData(options, callback) {
    var defaults = {
        action: 'search',
        apiUrl: 'https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec',
    };

    var params = $.extend({}, defaults, options);

    var op = ['data', 'filter'];
    for (var idx in op) {
        if (params[op[idx]] && !Array.isArray(params[op[idx]])) {
            params[op[idx]] = [params[op[idx]]];
        }
        params[op[idx]] = JSON.stringify(params[op[idx]] || []);
    }

    request = $.ajax({
        url: options.api || options.apiUrl,
        type: 'post',
        // dataType: "jsonp",
        data: $.param(params)
    });

    request.done(function(response, textStatus, jqXHR) {
        if (callback)
            callback(response, textStatus, jqXHR);
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
        console.error(
            "The following error occured: " +
            textStatus, errorThrown
        );
    });
}