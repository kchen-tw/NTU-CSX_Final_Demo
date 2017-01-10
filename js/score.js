function CalcScore() {}

function CalcScore1(itemNum) {
    Gps = [
            [document.myForm.Gp1_1, document.myForm.Gp1_2, document.myForm.Gp1_3],
            [document.myForm.Gp2_1, document.myForm.Gp2_2],
            [document.myForm.Gp3_1, document.myForm.Gp3_2],
            [document.myForm.Gp4_1, document.myForm.Gp4_2],
            [document.myForm.Gp5_1, document.myForm.Gp5_2, document.myForm.Gp5_3]
        ]
        //alert("call CalcScore OK "+ itemNum);
    var sum = 0;
    var ct = 0;
    var score = 0;
    for (var i = 0; i < 3; i++) {
        qexist = document.getElementsByName('Gp' + itemNum + '_' + (i + 1));
        if (qexist.length > 0) {
            ct++;
            //alert(1);
            for (s = 0; s < 5; s++)
                if (Gps[itemNum - 1][i][s].checked) {
                    score = 5 - s;
                }
            sum += score;
        }
    }
    //alert(sum);
    sc = "score" + itemNum;
    eval(sc).value = sum / ct;
}

function RadioGen(itemNum, QueNum) {
    document.write('<div class="controlgroup-vertical" >');
    for (var r = 5; r > 0; --r) {
        document.write('<label for="est' + itemNum + '_' + QueNum + '_' + r + '">' + r + '</label>');
        document.write('<input type="radio" name="Gp' + itemNum + '_' + QueNum + '" id="est' + itemNum + '_' + QueNum + '_' + r + '" onClick="CalcScore1(' + itemNum + ');">');
    }
    document.write('</div>');
}

function formSubmit() {
    ans = confirm("請問確定要送出嗎？成績送出後無法更改！");
    if (!ans) {
        //alert("No");
        return 0;
    }
    //document.getElementById("myForm").submit()
}


var options = {
    api: 'https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec',
    // api: 'https://script.google.com/a/macros/csie.ntu.edu.tw/s/AKfycbx2VJc30mJ_EeQ2zN_8W0EYBoHf5yhyeuflgzx_bl6H/dev',
    sheet: 'team_list'
};



queryData(options, function(res) {
    //console.log(res);
    //console.log(res.data.length)
    var tlen = res.data.length;
    $("input[name$='TeamID']").val(res.data[0].team_id);
    $("input[name$='TeamName']").val(res.data[0].team_name);

    /*
    $("#select").append($("<option></option>").attr("value", "值").text("文字"));
    $("#select").append($("<option></option>").prop("value", "值").text("文字"));
    // 產生 Option 項目
    function GetOption(text, value) {
    	return "<option value = '" + value + "'>" + text + "</option>"
    }
    */
    for (var i = 0; i < tlen; i++) {
        $("#select").append($("<option></option>").attr("value", res.data[i].team_name).text(res.data[i].team_name));
    }

    $("#select").change(function() {
        $("option:selected", this).each(function() {
            //alert(this.value);
            $("input[name$='TeamID']").val(res.data[this.index].team_id);
            $("input[name$='TeamName']").val(res.data[this.index].team_name);
        });
    });
});

$(function() {
    $(".controlgroup").controlgroup();
    $(".controlgroup-vertical").controlgroup({
        "direction": "vertical"
    });
});