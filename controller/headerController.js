$(function () {

    var pcCount = 0;
    var appCount = 0;
    var httpCount = 0;
    var rpcCount = 0;
    var totleCount = 0;
    var totlePassCount = 0;


    function initTestCaseCount() {
        $.ajax({
            cache: true,
            type: "POST",
            url: "http://" + window.serverIP + ":3000/home/initTestCaseCount",
            async: false,
            error: function (request) {
                alert("Connection error");
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["_id"] == "rpc")
                        rpcCount = data[i]["num_tutorial"];
                    else if (data[i]["_id"] == "app")
                        appCount = data[i]["num_tutorial"];
                    else if (data[i]["_id"] == "pc")
                        pcCount = data[i]["num_tutorial"];
                    else
                        httpCount = data[i]["num_tutorial"];
                }
                totleCount = pcCount + appCount + httpCount + rpcCount;
            }
        })
    }


    function initPassTestCaseCount() {
        $.ajax({
            cache: true,
            type: "POST",
            url: "http://" + window.serverIP + ":3000/home/initTestCasePassCount",
            async: false,
            error: function (request) {
                alert("Connection error");
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    totlePassCount = totlePassCount + data[i]["num_tutorial"];
                }
            }
        })
    }


    initTestCaseCount();
    initPassTestCaseCount();

    $("#totalPassTestCaseCount").html(totlePassCount);
    $("#totalTestCaseCount").html(totleCount);


});
