// var link = [];

var initEvent = function() {
    // var l = link.length;
    var l = initEvent.team.length;
    var a = 0;

    var COUNT_START = 10 * 5 * 60; // tenths * seconds * hours
    // var COUNT_START = 100;
    var count = COUNT_START;
    var playing = false;

    playpause = document.getElementById('playpause');
    reset = document.getElementById('reset');
    playpause.onclick = playbtn;
    reset.onclick = reseting;

    function playbtn() {
        if (playing) {
            playing = false;
            playpause.innerHTML = "▶";
        } else if (!playing) {
            playing = true;
            console.log("Play!");
            playpause.innerHTML = "‖";
        }
    }

    function reseting() {
        playing = false;
        playpause.innerHTML = "▶";
        console.log("Reset Timer!");
        count = COUNT_START;
        clearTimeout(tt);
        countdown();
    }

    function changeIframeUrl(index) {
        $('iframe').attr('src', initEvent.team[index].slide_url);
        $('#data-frame').attr('data-team-index', index);
        $('#data-frame').trigger('iframe-src-changed');
    }

    function countdown() {
        avs = a < l - 1 && a >= 0 ? true : false;
        displayTime();
        if (count == 0) {
            playing = false;
            // console.log(avs);
            if (avs) {
                var j = confirm('時間到，下一組！');
                reseting();
            } else {
                alert('這是最後一組了！謝謝觀賞');
            }
            console.log('第' + (a + 1) + "組");
            if (j) {
                changeIframeUrl(++a);
                setTimeout(playbtn, 2000);
            }
        } else if (playing) {
            // clearTimeout(tt);
            tt = setTimeout(countdown, 100);
            count--;
        } else {
            // clearTimeout(tt);
            tt = setTimeout(countdown, 100);
        }
    }


    function displayTime() {
        var tenths = count;
        var sec = Math.floor(tenths / 10); // 300
        var hours = Math.floor(sec / 3600); //  1 / 12
        var mins = Math.floor(sec / 60); // 5
        sec = sec - mins * (60);
        // console.log('0');
        if (hours < 1) {
            document.getElementById('time_left').innerHTML = LeadingZero(mins) + ':' + LeadingZero(sec);
        } else {
            document.getElementById('time_left').innerHTML = hours + ':' + LeadingZero(mins) + ':' + LeadingZero(sec);
        }
    }

    function LeadingZero(Time) {
        return (Time < 10) ? "0" + Time : +Time;
    }

    // 頁面跳轉

    $('#next').on('click', function() {
        console.log(avs);
        if (avs) {
            // $('iframe').attr('src', initEvent.team[++a].slide_url);
            changeIframeUrl(++a);
            console.log('第' + (a + 1) + "組");

        } else {
            return false;
        }
    });

    $('#pre').on('click', function() {
        if (a > 0) {
            // $('iframe').attr('src', initEvent.team[--a].slide_url);
            changeIframeUrl(--a);
            console.log('第' + (a + 1) + "組");
        } else {
            return false;
        }
    });

    $('#jump').on('click', function() {
        var jump = prompt("輸入要跳轉的組別");
        a = jump - 1;
        if (a >= l) {
            alert("沒這麼多組別，跳至最後一組");
            a = l - 1;
            changeIframeUrl(a);
            console.log('第' + (a + 1) + "組");
        }
        changeIframeUrl(a);
    });

    countdown();
};

var initData = function(callback) {
    var options = {
        api: 'https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec',
        // api: 'https://script.google.com/a/macros/csie.ntu.edu.tw/s/AKfycbx2VJc30mJ_EeQ2zN_8W0EYBoHf5yhyeuflgzx_bl6H/dev',
        sheet: 'team_list',
        filter: {
            presentation: true,
        }
    };

    // 查詢資料
    queryData(options, function(response) {

        if (response.result) {
            callback(response.data);
        } else {
            console.log(response);
        }
    });
};



// 當網頁載入完開始javascript
$(function() {

    var setteamData = function(index) {
        $('.team-name').text(initEvent.team[index].team_name);
        $('.course-name').text(initEvent.team[index].course_name);
        $('.team-index').text("報告順序：" + (index + 1));
    };

    $('.loader-wrapper').removeClass('hide');

    initData(function(data) {
        link = [];
        initEvent.team = [];

        for (var i = 0; i < data.length; i++) {
            link.push(data[i].slide_url);
            initEvent.team.push(data[i]);
        }

        $('#data-frame').attr('src', initEvent.team[0].slide_url);
        // $('.team-data').text(initEvent.team[0].team_name);
        setteamData(0);

        $('#data-frame').on('iframe-src-changed', function() {
            var idx = parseInt($(this).attr('data-team-index'));
            setteamData(idx);
        });
        $('.team-data').removeClass('hide');
        $('.loader-wrapper').addClass('hide');
        initEvent();
    });

});