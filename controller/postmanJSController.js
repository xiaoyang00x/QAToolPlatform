$(document).ready(function () {
    $("button#getToken").click(function () {
        $('#getTokenForm').formValidation();
        if ($("input[name='username']").val().length > 0 && $("input[name='password']").val().length > 0) {
            $("input[name='token4request']").attr("value", "");
            $.ajax({
                cache: true,
                type: "POST",
                url: "http://" + window.serverIP + ":3000/postman/getToken",
                data: $('#getTokenForm').serialize(),// 你的formid
                async: false,
                error: function (request) {
                    alert("Ajax请求失败了");
                },
                success: function (data) {
                    try {
                        $("input[name='token4request']").attr("value", data.msg.data.token);
                    }
                    catch (err) {
                        $("input[name='token4request']").attr("value", "用户名或密码错误");
                    }
                }
            })
        }
    })
});


$(document).ready(function () {
    $("button#sendRequest").click(function () {
        $('#resultForm').formValidation();
        $("textarea[name='response']").val();
        if ($("input[name='token4request']").val().length > 0 && $("input[name='URL']").val().length > 0) {
            $.ajax({
                cache: true,
                type: "POST",
                url: "http://" + window.serverIP + ":3000/postman/getResult",
                data: $('#resultForm').serialize(),// 你的formid
                async: false,
                error: function (request) {
                    alert("Connection error");
                },
                success: function (data) {
                    $("textarea[name='response']").val(JSON.stringify(data));
                }
            })
        }
    })
});


$(document).ready(function () {
    $("button#saveRequest").click(function () {
        $('#resultForm').formValidation();
        if ($("input[name='token4request']").val().length > 0 && $("input[name='URL']").val().length > 0) {
            swal({
                    title: "确认保存接口?",
                    text: "点击ok保存",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                function () {
                    setTimeout(function () {
                        swal("接口保存成功!");
                        $.ajax({
                            cache: true,
                            type: "POST",
                            url: "http://" + window.serverIP + ":3000/postman/save",
                            data: $('#resultForm').serialize(),// 你的formid
                            async: false,
                            error: function (request) {
                                alert("Connection error");
                            },
                            success: function (data) {
                                window.location.reload();
                            }
                        })
                    }, 2000);
                });
        }
    })
});

$(document).ready(function () {
    $("button#deleteRequest").click(function () {
        var interfaceName = $("input[name='interfaceName']").val();
        $('#resultForm').formValidation();
        if ($("input[name='token4request']").val().length > 0 && $("input[name='URL']").val().length > 0) {
            swal({
                    title: "确认删除接口?",
                    text: "点击ok删除",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                function () {
                    setTimeout(function () {
                        swal("删除接口成功!");
                        $.ajax({
                            cache: true,
                            type: "POST",
                            url: "http://" + window.serverIP + ":3000/postman/deleteInterface",
                            data: {'interfaceName': interfaceName},// 你的formid
                            async: false,
                            error: function (request) {
                                alert("Connection error");
                            },
                            success: function (data) {
                                window.location.reload();
                            }
                        })
                    }, 2000);
                });
        }

    })
});


function changeArea(obj) {
    var interfaceName = $(obj).attr("value");
    console.log(interfaceName);//(1)
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://" + window.serverIP + ":3000/postman/getAllInterfaceByName",
        data: {'interfaceName': interfaceName},// 你的formid
        async: false,
        error: function (request) {
            alert("Connection error");
        },
        success: function (data) {
            var data = data[0];
            $("input[name='token4request']").attr("value", data.token4request);
            $("input[name='URL']").attr("value", data.URL);
            $("input[name='interfaceName']").attr("value", data.interfaceName);
            $("select[name='method']").val(data.method);
            $("textarea[name='body']").text(data.body);
            $("textarea[name='response']").val("");
        }
    })
}
