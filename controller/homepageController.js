$(function () {

    // Initialize card flip
    $('.card.hover').hover(function () {
        $(this).addClass('flip');
    }, function () {
        $(this).removeClass('flip');
    });

    // Initialize flot chart
    var d1 = [[1, 715],
        [2, 985],
        [3, 1525],
        [4, 1254],
        [5, 1861],
        [6, 2621],
        [7, 1987],
        [8, 2136],
        [9, 2364],
        [10, 2851],
        [11, 1546],
        [12, 2541]
    ];


    var d3 = [[1, 900],
        [2, 1385],
        [3, 1525],
        [4, 1861],
        [5, 2621],
        [6, 1987],
        [7, 2136],
        [8, 2364],
        [9, 2851],
        [10, 1546],
        [11, 2541],
        [12, 2121]
    ];
    var d2 = [[1, 463],
        [2, 578],
        [3, 327],
        [4, 984],
        [5, 1268],
        [6, 1684],
        [7, 1425],
        [8, 1233],
        [9, 1354],
        [10, 1200],
        [11, 1260],
        [12, 1320]
    ];

    var d4 = [
        [1, 100],
        [2, 200],
        [3, 300],
        [4, 400],
        [5, 500],
        [6, 600],
        [7, 700],
        [8, 800],
        [9, 900],
        [10, 1000],
        [11, 1100],
        [12, 1200]
    ];



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
            {label: "PCUI自动化", value: 35},
            {label: "AppUI自动化", value: 35},
            {label: "接口自动化", value: 10},
            {label: "Rpc自动化", value: 20},

        ],
        colors: ['#d9544f', '#3f4e62', '#16a085','#ffc100']
    });

    $('#browser-usage').find("path[stroke='#ffffff']").attr('stroke', 'rgba(0,0,0,0)');


});
