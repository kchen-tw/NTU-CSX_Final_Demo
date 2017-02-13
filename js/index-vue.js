// 當網頁載入完開始javascript
$(function () {


    var gsheet = new GSheet('https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec');

    var loader = new Loader($('.loader-wrapper'));

    var project_card_group = new Vue({
        el: '#project_card_group',
        data: {
            projects: [],
        },
        beforeCreate: function () {
            // $('.loader-wrapper').removeClass('hide');
            loader.start();
            let self = this;
            gsheet.run({
                sheet: 'team_list',
                filter: {
                    demo: true
                },
                done: function (response) {
                    self.projects = response.data;
                }
            });
        },
        updated: function () {
            loader.end();
            // $('.loader-wrapper').addClass('hide');
        }
    });

    var teammate_card_group = new Vue({
        el: '#teammate_card_group',
        data: {
            teammate: [],
        },
        beforeCreate: function () {

            loader.start();
            let self = this;
            gsheet.run({
                sheet: 'teammate',
                done: function (response) {
                    self.teammate = response.data;
                }
            });            

        },
        updated: function () {
            loader.end();
            // $('.loader-wrapper').addClass('hide');
        }
    });

})