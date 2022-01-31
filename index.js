// 0->one 1->two 2->three 3->four

wireTerminalCheck = [{'two': false, 'three': false}, {'one': false, 'four': false},
                        {'two': false,'resistor': false},{'three': false, 'capacitor': false},
                        {'resistor': false, 'three': false},{'four': false, 'capacitor': false}]

terminalMap = {0:'one', 1:'two', 2:'three', 3:'four','resistor': 'resistor', 'capacitor':'capacitor'}
   

sequenceNum = 0

setTimeout(() => {
    enablingSequence(sequenceNum)
}, 2000);

// function increment(){
//     elem = document.getElementsByTagName('h2')[0]
//     voltage = parseFloat(elem.textContent)
//     // setInterval(() => {
//     //     voltage += 1.00
//     //     elem.textContent = voltage+'.00'
//     // }, 1000);
// }

// increment()

function enablingSequence(sequenceNum){
    // terminals = document.getElementsByClassName('terminals')       
    if(sequenceNum <= wireTerminalCheck.length){
        for(var key in wireTerminalCheck[sequenceNum]){
            elem = document.getElementsByClassName(key)[0]
            elem.style.stroke = "#FFFF00"
            elem.style.animationName = "pulse"
        }
    }        
}

function trial(componentSom){
    componentSomMap = terminalMap[componentSom]
    for(var key in wireTerminalCheck[sequenceNum])
        if(key == componentSomMap)
            wireTerminalCheck[sequenceNum][key] = true
    
    elem = document.getElementsByClassName(componentSomMap)[0]
    elem.style.animationName = "none"
    elem.style.stroke = "none"
    

    // console.log(checkPair())
    dum = checkPair(sequenceNum)
    // console.log(dum)
    if(dum){
        wireName = 'wire'+(sequenceNum+1)
        document.getElementById(wireName).style.transition = "display 10s"
        document.getElementById(wireName).style.display = "block"
        ++sequenceNum
        if(sequenceNum < wireTerminalCheck.length)
            enablingSequence(sequenceNum)
        else
            replacement()
    }

}

function checkPair(sequenceNum){
    count = 0
    for(var key in wireTerminalCheck[sequenceNum])
        if(wireTerminalCheck[sequenceNum][key] == true)
            count++
        console.log(count, 'count')
        if(count == 2)
            return true   
        return false
}    
    
function replacement(){
    document.getElementById('black-board').classList.add('hidden')
    document.getElementById('table-board').classList.add('replacement');
}

setTimeout(() => {
    chartRenderData()
}, 2000);

function chartRenderData(){
    xValuesdum = []
    yValuesdum = []
    var count = 0
    setInterval(() => {
        if (count < xValues.length) {
            xValuesdum[count] = xValues[count]
            yValuesdum[count] = yValues[count]
            count++;
            drawChart(xValuesdum, yValuesdum)
        }
    }, 1000);

}

function drawChart(xValues, yValues){
    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                pointBackgroundColor: "purple",
                borderColor: "#44c17b",
                data: yValues
            }]
        },
        options: {
            title:{
                display: true,
                text: 'Charging and Discharging Characteristics of Supercapacitors',
                fontSize: 18,
                padding: 15
            },
            legend: {display: false},
            scales: {
                yAxes: [ {
                    ticks: {min:6, max:16},
                    scaleLabel: {
                        display: true,
                        labelString:'Voltage (V)',
                        fontSize: 14,
                        fontColor: "#000"
                    }
                }],
                xAxes: [ {
                    scaleLabel: {
                        display: true,
                        labelString:'Time (s)',
                        fontSize: 14,
                        fontColor: "#000"
                    }
                }],
            },
            animation:{
                duration:1
            }
        }
    });
}

var xValues = [50,60,70,80,90,100,110,120,130,140,150];
var yValues = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart", {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "purple",
            borderColor: "#44c17b",
            data: []
        }]
    },
    options: {
        title:{
            display: true,
            text: 'Charging and Discharging Characteristics of Supercapacitors',
            fontSize: 18,
            padding: 15
        },
        legend: {display: false},
        scales: {
            yAxes: [ {
                ticks: {min:6, max:16},
                scaleLabel: {
                    display: true,
                    labelString:'Voltage (V)',
                    fontSize: 14,
                    fontColor: "#000"
                }
            }],
            xAxes: [ {
                scaleLabel: {
                    display: true,
                    labelString:'Time (s)',
                    fontSize: 14,
                    fontColor: "#000"
                }
            }],
        },
        animation:{
            duration:1
        }
    }
});

// setTimeout(() => {
//     var xValues = [50,60,70,80,90,100];
//     var yValues = [7,8,8,9,9,9];

//     new Chart("myChart", {
//         type: "line",
//         data: {
//             labels: xValues,
//             datasets: [{
//                 fill: false,
//                 lineTension: 0,
//                 pointBackgroundColor: "purple",
//                 borderColor: "#44c17b",
//                 data: yValues
//             }]
//         },
//         options: {
//             title:{
//                 display: true,
//                 text: 'Charging and Discharging Characteristics of Supercapacitors',
//                 fontSize: 18, 
//                 padding: 15
//             },
//             legend: {display: false},
//             scales: {
//                 yAxes: [{
//                     ticks: {min:6, max:16},
//                     scaleLabel: {
//                         display: true,
//                         labelString:'Voltage (V)',
//                         fontColor: '#000',
//                         fontSize: 14
//                     }
//                 }],
//                 xAxes: [{
//                     scaleLabel: {
//                         display: true,
//                         labelString:'Time (s)',
//                         fontSize: 14,
//                         fontColor: '#000'
//                     }
//                 }],
//             },
//             animation:{
//                 duration:1
//             }
//         }
//     });    
// }, 3000);



// wireTerminalCheck = [{1: false, 2: false}, {0: false, 3: false},
//                      {1: false,'resistor': false},{2: false, 'capacitor': false},
//                      {'resistor': false, 2: false},{3: false, 'capacitor': false}]

// function enablingSequence(sequenceNum){
//     // terminals = document.getElementsByClassName('terminals')       
//     if(sequenceNum <= wireTerminalCheck.length){
//         for(var key in wireTerminalCheck[sequenceNum]){
//             if(key.length == 1){
//                 terminals[key].style.stroke = "#FFFF00"
//                 if(key != 2){
//                     terminals[key].style.strokeWidth = "2%"
//                     terminals[key].style.animation = "glow-side 4s linear infinite"
//                 }else{
//                     terminals[key].style.strokeWidth = "0.25%"
//                     terminals[key].style.animation = "glow-front 4s linear infinite"
//                 }
//             }else{
//                 elem = document.getElementById(key)
//                 elem.style.stroke = "#FFFF00"
//                 elem.style.strokeWidth = "2%"
//                 elem.style.animation = "glow-comp 4s linear infinite"      
//                 // console.log(elem)
//             }
//         }
//     }        
// }

