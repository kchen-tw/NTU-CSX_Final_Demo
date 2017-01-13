chart.dimension.radius.fieldName = [];
chart.dimension.radius.fieldId = [];

fieldId = [];

var chartData = [
    { "radius": [], "order": "創意" },
    { "radius": [], "order": "實踐" },
    { "radius": [], "order": "溝通協作" },
    { "radius": [], "order": "專題報告表現" },
    { "radius": [], "order": "專業技術" }
];

var getReviewer = function(level, team_id) {
    var options = {
        api: 'https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec',
        sheet: 'reviewer',
        filter: {
            level: parseInt(level)
        }
    };

    queryData(options, function(res_reviewer) {

        for (var key_reviewer in res_reviewer.data) {

            reviewer_id = res_reviewer.data[key_reviewer].reviewer_id;

            fieldId[reviewer_id] = res_reviewer.data[key_reviewer].reviewer_name;
        }

        getScore(team_id)
    })
}



var getScore = function(team_id) {

    team_id = parseInt(team_id);

    if (isNaN(team_id)) {
        team_id = 1;
    }

    var options = {
        api: 'https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec',
        sheet: 'team_score',
        filter: [{
            team_id: team_id,
            final_demo: true
        }]
    };

    queryData(options, function(response) {

        if (response.result && response.data.length > 0) {

            for (var key in response.data) {
                chartData[0].radius[key] = response.data[key]['score_1'];
                chartData[1].radius[key] = response.data[key]['score_2'];
                chartData[2].radius[key] = response.data[key]['score_3'];
                chartData[3].radius[key] = response.data[key]['score_4'];
                chartData[4].radius[key] = response.data[key]['score_5'];

                var reviewer_id = response.data[key]['reviewer_id'];

                chart.dimension.radius.fieldName.push(fieldId[reviewer_id]);
            }

            var mychart = new plotdb.view.chart(chart, { data: chartData });
            mychart.attach(document.getElementById("wrapper"));
            mychart.update();
        } else {
            $('#wrapper').addClass('hide');
            $('#no_score').removeClass('hide');
        }

        $('.loader-wrapper').addClass('hide');
    });
};

$(document).ready(function() {
    var team_id = $.url(document.URL).param('team_id');

    var options = {
        api: 'https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec',
        sheet: 'team_list',
    };

    $('.loader-wrapper').removeClass('hide');

    queryData(options, function(response) {

        for (var key in response.data) {

            var select_string = '';
            if (team_id == response.data[key].team_id) {
                select_string = 'selected';
                $('#team_name').text(response.data[key].team_name);
                $('#course_name').text(response.data[key].course_name);
            }
            var option = '<option value="' + response.data[key].team_id + '" ' + select_string + '>' + response.data[key].team_name + '</option>';
            $('#team_lists').append(option);
        }
    });

    $('#team_lists').on('change', function() {
        window.location.href = './radar.html?team_id=' + parseInt($(this).val());
    });

    getReviewer(1, team_id);
});