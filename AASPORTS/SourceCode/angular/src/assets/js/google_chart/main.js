google.charts.load('current', {
    packages: ['corechart', 'bar']
});
google.charts.setOnLoadCallback(drawMultSeries);

function drawMultSeries() {
    try {
        var data = google.visualization.arrayToDataTable([
            ['Dự án', 'Tỉ lệ hoàn thành (%)', 'Trễ tiến độ (%)'],
            ['Dự án 1', 20, 10],
            ['Dự án 2', 80, 20],
            ['Dự án 3', 80, 20],
            ['Dự án 4', 20, 4],
            ['Dự án 5', 50, 15]
        ]);

        var options = {
            title: 'Tiến độ của các dự án chưa hoàn thành',
            chartArea: {
                width: '70%'
            },
            hAxis: {
                title: 'Tổng tiến độ hoàn thành',
                minValue: 0
            },
            vAxis: {
                title: ''
            },
            height: 400,
            bar: {
                groupWidth: "80%"
            }
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    } catch {}
}
google.charts.load('current', {
    packages: ['corechart', 'bar']
});


google.charts.load('current', {
    packages: ['corechart', 'bar']
});
google.charts.setOnLoadCallback(drawStacked2);

function drawStacked2() {
    try {
        var data = google.visualization.arrayToDataTable([
            ['', 'Đã hoàn thành', 'Đang hoàn thành', 'Mới', {
                role: 'style'
            }],
            ['Dự án 1', 10, 24, 20, ''],
            ['Dự án 2', 16, 22, 23, ''],
            ['Dự án 3', 28, 19, 29, '']
        ]);

        var options = {
            height: 400,
            legend: {
                position: 'top',
                maxLines: 3
            },
            bar: {
                groupWidth: '75%'
            },
            isStacked: true,
            colors: ['#00D631', '#FF721C', '#0065D6'],
        };


        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
    } catch {}
}