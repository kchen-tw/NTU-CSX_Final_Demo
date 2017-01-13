// 當網頁載入完開始javascript
$(function () {
    var reviewer_id = +purl().param('reviewer_id');
    var gsheet = new GSheet('https://script.google.com/macros/s/AKfycbzTfdt_q9aNqvWp7LW9JKy6sZeL9fK-KjDcsuaFdmoLlzYsu0-R/exec');
    var loader = new Loader($('.loader-wrapper'));
    loader.start();
    var dataPanel = new Vue({
        el: '#data-panel',
        data: {
            reviewers: [],
            projects: [],
            scoreList: [],
            rname: "",
            rid: reviewer_id,
            tid: 1,
        },
        beforeCreate: function () {
            var self = this;
            gsheet.run({
                sheet: 'reviewer',
                filter: {
                    level: 1
                },
                done: function (response) {
                    self.reviewers = response.data;
                    var reviewer = $.grep(self.reviewers, function (o, index) {
                        return (o.reviewer_id == reviewer_id);
                    });
                    // console.dir(reviewer);
                    self.rname = (reviewer.length > 0) ? reviewer[0].reviewer_name : self.reviewers[0].reviewer_name;
                    self.rid = (reviewer.length > 0) ? reviewer[0].reviewer_id : self.reviewers[0].reviewer_id;
                }
            });
            gsheet.run({
                sheet: 'team_list',
                filter: {
                    demo: true
                },
                done: function (response) {
                    self.projects = response.data;
                }
            });
            gsheet.run({
                sheet: 'score_table',
                done: function (response) {
                    self.scoreList = response.data;
                }
            });
        },
        mounted: function () {
            if (!reviewer_id) {
                $('#reviewer').show();
            }
            else {
                // $('#modalReviewerName').text(this.rname);
                $('#project').show();
            }
            loader.end();
        },
        methods: {
            setReviewer: function (event) {
                var rid = $(event.target).data('reviewer-id');
                var rname = $(event.target).data('reviewer-name');
                this.rid = rid;
                this.rname = rname;
                $('#scoreModalLong').data('reviewer-id', rid);
                $('#reviewer').hide();
                $('#project').show();
            },
            setTeam: function (even) {
                this.tid = $(event.target).data('team-id');
            },
            sendScore: function (even) {
                loader.start();
                // let score = this.scoreList.map(function (obj) {
                //     let ret = {};
                //     ret[obj.score_id] = $('input[name=' + obj.score_id + ']:checked').val();
                //     return ret;
                // })
                var score = {};
                for (var _i = 0, _a = this.scoreList; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    score[obj.score_id] = $('input[name=' + obj.score_id + ']:checked').val();
                }
                // console.dir(score);
                // let filter = {
                //     team_id: this.tid,
                //     reviewer_id: this.rid,
                // };
                // let data = score;
                var self = this;
                gsheet.run({
                    sheet: 'team_score',
                    action: 'update',
                    filter: {
                        team_id: this.tid,
                        reviewer_id: this.rid,
                        final_demo: true,
                    },
                    data: score,
                    done: function (response) {
                        for (var _i = 0, _a = self.scoreList; _i < _a.length; _i++) {
                            var obj = _a[_i];
                            //$('input[name=' + obj.score_id + ']').removeAttr('checked');
                            $('input[name=' + obj.score_id + ']').each(function (i, v) {
                                //      v.checked = false;
                                //    $(this).removeAttr('checked');
                                v.checked = false;
                                v.removeAttribute("checked");
                            });
                        }
                        $('#scoreModalLong').modal('hide');
                        loader.end();
                    }
                });
            },
        }
    });
    $('#scoreModalLong').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var team_id = button.data('team-id'); // Extract info from data-* attributes
        var team_name = button.data('team-name'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text(team_name);
        // modal.find('.modal-body input').val(recipient)
    });
});
