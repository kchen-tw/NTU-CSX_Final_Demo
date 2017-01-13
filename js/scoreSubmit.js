$('#query').on('click', function() {
    // if (formSubmit() == 0) {
    //     return;
    // }
    // 設定查詢資料
    var options = {
        api: 'https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec',
        action: 'update',
        sheet: 'team_score',
    };

    var filter = {
        team_id: parseInt($("input[name$='TeamID']")[0].value),
        reviewer_id: parseInt($("input[name$='ReviewerID']")[0].value),
        final_demo: false
    };
    var data = {
        score_1: parseFloat($("input[name$='score1']")[0].value),
        score_2: parseFloat($("input[name$='score2']")[0].value),
        score_3: parseFloat($("input[name$='score3']")[0].value),
        score_4: parseFloat($("input[name$='score4']")[0].value),
        score_5: parseFloat($("input[name$='score5']")[0].value),
    };

    //console.log(filter);
    //console.log(data);

    options.data = data;
    options.filter = filter;

    $('.loader-wrapper').removeClass('hide');

    // 查詢資料
    queryData(options, function(response) {

        // console.log(response);

        if (response.result) {
            $('#output').text(JSON.stringify(response.data, null, 4));
        } else {
            console.log(response);
        }
        $('.loader-wrapper').addClass('hide');
    });
});

var tid = $.url(document.URL).param('reviewer_id');
//alert(tid);
$("input[name$='ReviewerID']").val(tid);
//$("input[name$='ReviewerName']").val(res.data[this.index].reviewer_name);


var optionsReviewers = {
    api: 'https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec',
    // api: 'https://script.google.com/a/macros/csie.ntu.edu.tw/s/AKfycbx2VJc30mJ_EeQ2zN_8W0EYBoHf5yhyeuflgzx_bl6H/dev',
    sheet: 'reviewer',
    filter: {
        level: 0
    }
};

queryData(optionsReviewers, function(res) {
    //console.log(res);
    var jlen = res.data.length;
    var foundInd = -1;
    for (var i = 0; i < jlen; i++) {
        if (res.data[i].reviewer_id == tid) {
            foundInd = i;
        }
    }
    if (foundInd != -1)
        $("input[name$='ReviewerName']").val(res.data[foundInd].reviewer_name);
    else {
        $("input[name$='ReviewerName']").val(res.data[0].reviewer_name);
        $("input[name$='ReviewerID']").val(res.data[0].reviewer_id);
    }
    // alert("No this Reviewer ID");
});

// queryData(options2, function(res) {
//     //console.log(res);

//     var jlen = res.data.length;
//     $("input[name$='ReviewerID']").val(res.data[0].reviewer_id);
//     $("input[name$='ReviewerName']").val(res.data[0].reviewer_name);

//     for (var i = 0; i < jlen; i++) {
//         $("#ReviewerNames").append($("<option></option>").attr("value", res.data[i].reviewer_name).text(res.data[i].reviewer_name));
//     }

//     $("#ReviewerNames").change(function() {
//         $("option:selected", this).each(function() {
//             //alert(this.value);
//             $("input[name$='ReviewerID']").val(res.data[this.index].reviewer_id);
//             $("input[name$='ReviewerName']").val(res.data[this.index].reviewer_name);
//         });
//     });
// });