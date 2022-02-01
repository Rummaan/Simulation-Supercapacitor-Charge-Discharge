var tableDat = document.getElementById("table1")

yValuesdum = []
voltTriggger = 0
var xValues = [0,30,60,90,120,150,180,210,240,270,300,330,360];

setTimeout(() => {
   trialAgain(tableDat)    
}, 3000);

function trialAgain(tabledata){
    setInterval(() => {
    // console.log(JSON.parse(localStorage.getItem('rowData')))
        var rowData = JSON.parse(localStorage.getItem('rowData'))
        if(rowData.volts){
            if(voltTriggger < rowData.volts){
                voltTriggger = rowData.volts
                chartRenderData(voltTriggger)
            }
            x = tabledata.rows[rowData.sno + 1].cells
            x[0].textContent = rowData.sno + 1
            x[1].textContent = rowData.time
            x[2].textContent = rowData.volts
        }
    }, 500);
}

function chartRenderData(yValue){
    yValuesdum.push(yValue)
    chart.config.data.datasets[0].data = yValuesdum
    chart.update()
}

var chart = new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "#39FF14",
            borderColor: "#000",
            data: []
        }]
    },
    options: {
        title:{
            display: true,
            text: 'Charging and Discharging Characteristics of Supercapacitors',
            fontSize: 18,
            padding: 25,
            fontColor: 'black'
        },
        legend: {display: false},
        scales: {
            yAxes: [ {
                ticks: {min:0, max:2, maxTicksLimit:5, fontColor:"black"},
                scaleLabel: {
                    display: true,
                    labelString:'Voltage (V)',
                    fontSize: 14,
                    fontColor: "#000"
                }
            }],
            xAxes: [ {
                ticks: {maxTicksLimit:5, fontColor:"black"},
                scaleLabel: {
                    display: true,
                    labelString:'Time (s)',
                    fontSize: 14,
                    fontColor: "#000",
                }
            }],
        },
        animation:{
            duration:1
        }
    }
});
