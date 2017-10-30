$(function () {

    //initialize form wizard
    $('#rootwizard').bootstrapWizard({

        'tabClass': 'nav nav-tabs tabdrop',
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').not('.tabdrop').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#rootwizard').find('#bar .progress-bar').css({width: $percent + '%'});

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $('#rootwizard').find('.pager .next').hide();
                $('#rootwizard').find('.pager .finish').show();
                $('#rootwizard').find('.pager .finish').removeClass('disabled');
            } else {
                $('#rootwizard').find('.pager .next').show();
                $('#rootwizard').find('.pager .finish').hide();
            }
        },

        onNext: function (tab, navigation, index) {

            var form = $('.form' + index)

            form.parsley('validate');

            if (form.parsley('isValid')) {
                tab.addClass('success');
            } else {
                return false;
            }

        },

        onTabClick: function (tab, navigation, index) {

            var form = $('.form' + (index + 1))

            form.parsley('validate');

            if (form.parsley('isValid')) {
                tab.addClass('success');
            } else {
                return false;
            }

        }

    });

    // Initialize tabDrop
    $('.tabdrop').tabdrop({text: '<i class="fa fa-th-list"></i>'});


    $("#finish").click(function () {
        $.ajax({
            cache: true,
            type: "POST",
            url: "http://" + window.serverIP + ":3000/signup",
            data: $("form").serialize(),// 你的formid
            async: false,
            error: function (request) {
                console.log("进到error了");
                alert(request);
            },
            success: function (data) {
                console.log("进到success了");
                if (data == "该用户名已被注册") {
                    swal({
                        title: '注册失败',
                        html: $('<div>')
                            .addClass('some-class')
                            .text('用户名已经存在'),
                        animation: false,
                        customClass: 'animated tada'
                    }).then(function (){
                        window.location.reload();
                    })
                } else {
                    swal({
                        title: '注册成功',
                        html: $('<div>')
                            .addClass('some-class')
                            .text('该账号可以使用喽'),
                        animation: false,
                        customClass: 'animated tada'
                    }).then(function () {
                        window.location.reload();

                    })
                }

            }
        })
    })


})