$(function () {

    // Initialize card flip
    $('.card.hover').hover(function () {
        $(this).addClass('flip');
    }, function () {
        $(this).removeClass('flip');
    });

    // Initialize flot chart
    var d1 = new Array;
    var d2 = new Array;
    var d3 = new Array;
    var d4 = new Array;

    var pcCount = 0;
    var appCount = 0;
    var httpCount = 0;
    var rpcCount = 0;
    var totleCount = 0;
    var passPcCount = 0;
    var passAppCount = 0;
    var passHttpCount = 0;
    var passRpcCount = 0;

    function initLineChart(array, type) {
        $.ajax({
            cache: true,
            type: "POST",
            url: "http://" + window.serverIP + ":3000/home/getLineChart",
            data: {"deviceType": type},
            async: false,
            error: function (request) {
                alert("Connection error");
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    array[i] = data[i];
                }
            }
        })
    }


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


    function getPassTestCaseCount() {
        $.ajax({
            cache: true,
            type: "POST",
            url: "http://" + window.serverIP + ":3000/home/getPassTestCaseCount",
            async: false,
            error: function (request) {
                alert("Connection error");
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["_id"] == "rpc")
                        passRpcCount = data[i]["passnum_tutorial"];
                    else if (data[i]["_id"] == "app")
                        passAppCount = data[i]["passnum_tutorial"];
                    else if (data[i]["_id"] == "pc")
                        passPcCount = data[i]["passnum_tutorial"];
                    else
                        passHttpCount = data[i]["passnum_tutorial"];
                }
            }
        })
    }


    initTestCaseCount();
    getPassTestCaseCount();
    initLineChart(d1, "pc");
    initLineChart(d2, "app");
    initLineChart(d3, "http");
    initLineChart(d4, "rpc");


    if (d1.length == 0) {
        var d1 = [
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
            [5, 1],
            [6, 1],
            [7, 1],
            [8, 1],
            [9, 1],
            [10, 1],
            [11, 1],
            [12, 1]
        ]
    }

    if (d2.length == 0) {
        d2 = [
            [1, 2],
            [2, 2],
            [3, 2],
            [4, 2],
            [5, 2],
            [6, 2],
            [7, 2],
            [8, 2],
            [9, 2],
            [10, 2],
            [11, 2],
            [12, 2]
        ]
    }


    if (d3.length == 0) {
        d3 = [
            [1, 3],
            [2, 3],
            [3, 3],
            [4, 3],
            [5, 3],
            [6, 3],
            [7, 3],
            [8, 3],
            [9, 3],
            [10, 3],
            [11, 3],
            [12, 3]
        ];
    }

    if (d4.length == 0) {
        d4 = [
            [1, 4],
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 4],
            [6, 4],
            [7, 4],
            [8, 4],
            [9, 4],
            [10, 5],
            [11, 4],
            [12, 4]
        ];
    }


    var months = ["January", "February", "March", "April", "May", "Juny", "July", "August", "September", "October", "November", "December"];


    // flot chart generate
    var plot = $.plotAnimator($("#statistics-chart"),
        [
            {
                label: 'PCUI自动化',
                data: d1,
                lines: {lineWidth: 3},
                shadowSize: 0,
                color: '#d9544f'
            },
            {
                label: "AppUI自动化",
                data: d2,
                lines: {lineWidth: 3},
                shadowSize: 0,
                color: '#3f4e62'
            },
            {
                label: "接口自动化",
                data: d3,
                lines: {lineWidth: 3},
                shadowSize: 0,
                color: '#16a085'
            },

            {
                label: "Rpc自动化",
                data: d4,
                lines: {lineWidth: 3},
                shadowSize: 0,
                color: '#ffc100'
            },

            {
                label: 'PCUI自动化',
                data: d1,
                points: {show: true, fill: true, radius: 6, fillColor: "rgba(0,0,0,.5)", lineWidth: 2},
                color: '#d9544f',
                shadowSize: 0
            },
            {
                label: 'AppUI自动化',
                data: d2,
                points: {show: true, fill: true, radius: 6, fillColor: "rgba(0,0,0,.5)", lineWidth: 2},
                color: '#3f4e62',
                shadowSize: 0
            },
            {
                label: '接口自动化',
                data: d3,
                points: {show: true, fill: true, radius: 6, fillColor: "rgba(0,0,0,.5)", lineWidth: 2},
                color: '#16a085',
                shadowSize: 0
            },
            {
                label: 'Rpc自动化',
                data: d4,
                points: {show: true, fill: true, radius: 6, fillColor: "rgba(0,0,0,.5)", lineWidth: 2},
                color: '#ffc100',
                shadowSize: 0
            }
        ], {

            xaxis: {

                tickLength: 0,
                tickDecimals: 0,
                min: 1,
                ticks: [[1, "JAN"], [2, "FEB"], [3, "MAR"], [4, "APR"], [5, "MAY"], [6, "JUN"], [7, "JUL"], [8, "AUG"], [9, "SEP"], [10, "OCT"], [11, "NOV"], [12, "DEC"]],

                font: {
                    lineHeight: 24,
                    weight: "300",
                    color: "#ffffff",
                    size: 14
                }
            },

            yaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: "rgba(255,255,255,.3)",

                font: {
                    lineHeight: 13,
                    weight: "300",
                    color: "#ffffff"
                }
            },

            grid: {
                borderWidth: {
                    top: 0,
                    right: 0,
                    bottom: 1,
                    left: 1
                },
                borderColor: 'rgba(255,255,255,.3)',
                margin: 0,
                minBorderMargin: 0,
                labelMargin: 20,
                hoverable: true,
                clickable: true,
                mouseActiveRadius: 6
            },

            legend: {show: false}
        });

    $(window).resize(function () {
        // redraw the graph in the correctly sized div
        plot.resize();
        plot.setupGrid();
        plot.draw();
    });

    $('#mmenu').on(
        "opened.mm",
        function () {
            // redraw the graph in the correctly sized div
            plot.resize();
            plot.setupGrid();
            plot.draw();
        }
    );

    $('#mmenu').on(
        "closed.mm",
        function () {
            // redraw the graph in the correctly sized div
            plot.resize();
            plot.setupGrid();
            plot.draw();
        }
    );


    // tooltips showing
    $("#statistics-chart").bind("plothover", function (event, pos, item) {
        if (item) {
            var x = item.datapoint[0],
                y = item.datapoint[1];

            $("#tooltip").html('<h1 style="color: #418bca">' + months[x - 1] + '</h1>' + '<strong>' + y + '</strong>' + ' ' + item.series.label)
                .css({top: item.pageY - 30, left: item.pageX + 5})
                .fadeIn(200);
        } else {
            $("#tooltip").hide();
        }
    });


    //tooltips options
    $("<div id='tooltip'></div>").css({
        position: "absolute",
        //display: "none",
        padding: "10px 20px",
        "background-color": "#ffffff",
        "z-index": "99999"
    }).appendTo("body");


    //generate actual pie charts
    $('.pie-chart').easyPieChart();


    //server load rickshaw chart
    var graph;

    var seriesData = [[], []];
    var random = new Rickshaw.Fixtures.RandomData(50);

    for (var i = 0; i < 50; i++) {
        random.addData(seriesData);
    }

    graph = new Rickshaw.Graph({
        element: document.querySelector("#serverload-chart"),
        height: 150,
        renderer: 'area',
        series: [
            {
                data: seriesData[0],
                color: '#6e6e6e',
                name: 'File Server'
            }, {
                data: seriesData[1],
                color: '#fff',
                name: 'Mail Server'
            }
        ]
    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph,
    });

    setInterval(function () {
        random.removeData(seriesData);
        random.addData(seriesData);
        graph.update();

    }, 1000);

    // Morris donut chart
    Morris.Donut({
        element: 'browser-usage',
        data: [
            {label: "PCUI自动化", value: Math.round((pcCount / totleCount) * 100)},
            {label: "AppUI自动化", value: Math.round((appCount / totleCount) * 100)},
            {label: "接口自动化", value: Math.round((httpCount / totleCount) * 100)},
            {
                label: "Rpc自动化",
                value: 100 - Math.round((pcCount / totleCount) * 100) - Math.round((appCount / totleCount) * 100) - Math.round((httpCount / totleCount) * 100)
            },

        ],
        colors: ['#d9544f', '#3f4e62', '#16a085', '#ffc100']
    });

    $('#browser-usage').find("path[stroke='#ffffff']").attr('stroke', 'rgba(0,0,0,0)');
    $("#pcpie").html(Math.round((pcCount / totleCount) * 100) + "%");
    $("#apppie").html(Math.round((appCount / totleCount) * 100) + "%");
    $("#httppie").html(Math.round((httpCount / totleCount) * 100) + "%");
    $("#rpcpie").html(100 - Math.round((pcCount / totleCount) * 100) - Math.round((appCount / totleCount) * 100) - Math.round((httpCount / totleCount) * 100) + "%");
    $("#totalTestCaseCount").html(totleCount);

    $("#pcuiSumCount").html("共" + pcCount + "条");
    $("#appuiSumCount").html("共" + appCount + "条");
    $("#httpSumCount").html("共" + httpCount + "条");
    $("#rpcSumCount").html("共" + rpcCount + "条");


    $("#pcuiPassCount").html("通过" + passPcCount + "条");
    $("#appuiPassCount").html("通过" + passAppCount + "条");
    $("#httpPassCount").html("通过" + passHttpCount + "条");
    $("#rpcPassCount").html("通过" + passRpcCount + "条");


    $("#pcuiPassRate").html(Math.round((passPcCount / pcCount).toFixed(2) * 100*100)/100);
    $("#appuiPassRate").html(Math.round((passAppCount / appCount).toFixed(2) * 100*100)/100);
    $("#httpPassRate").html(Math.round((passHttpCount / httpCount).toFixed(2) * 100*100)/100);
    $("#rpcPassRate").html(Math.round((passRpcCount / rpcCount).toFixed(2) * 100*100)/100);


    setTimeout(function(){
        $("#pcuiPassRateProcess").css("width",Math.round((passPcCount / pcCount).toFixed(2) * 100*100)/100 + "%");
        $("#appuiPassRateProcess").css("width",Math.round((passAppCount / appCount).toFixed(2) * 100*100)/100 + "%");
        $("#httpPassRateProcess").css("width",Math.round((passHttpCount / httpCount).toFixed(2) * 100*100)/100 + "%");
        $("#rpcPassRateProcess").css("width",Math.round((passRpcCount / rpcCount).toFixed(2) * 100*100)/100 + "%");

    },100);



});
