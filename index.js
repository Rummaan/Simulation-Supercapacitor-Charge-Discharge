// 0->one 1->two 2->three 3->four

wireTerminalCheck = [{'two': false, 'three': false}, {'one': false, 'four': false},
                        {'two': false,'resistor': false},{'three': false, 'capacitor': false},
                        {'resistor': false, 'three': false},{'four': false, 'capacitor': false}]

terminalMap = {0:'one', 1:'two', 2:'three', 3:'four','resistor': 'resistor', 'capacitor':'capacitor'}

var xValues = [0,30,60,90,120,150,180,210,240,270,300,330,360];

sequenceNum = 0

var rowData =  {'sno':0, 'time': 0, 'volts': 0}
localStorage.setItem("rowData", JSON.stringify(rowData))

setTimeout(() => {
    enablingSequence(sequenceNum)
}, 2000);


function enablingSequence(sequenceNum){    
    if(sequenceNum <= wireTerminalCheck.length){
        for(var key in wireTerminalCheck[sequenceNum]){
            elem = document.getElementsByClassName(key)[0]
            elem.style.stroke = "#FFFF00"
            elem.style.animationName = "pulse"
            elem.style.opacity = "1"
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
    document.getElementById('stopwatch-button').onclick = function(){
        startWorking()
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

startGraph = false

function startWorking(){
    rowData =  {'sno':0, 'time': 0, 'volts': 0.36}
    localStorage.setItem("rowData", JSON.stringify(rowData))
    stopwatch = document.getElementById('stopwatch')
    voltmeter = document.getElementById('volt')
    voltmeter.textContent = "00.36"
    volt = 36
    time = 0
    min = 4
    max = 6
    srno = 1
    yValuesdum = []
    stopwatchTime = setInterval(() => {
        if(time< 10)
            stopwatch.textContent = '00'+time+'.0'
        else if(time<100)
            stopwatch.textContent = '0'+time+'.0'
        else
            stopwatch.textContent = time+'.0'
        time++
        if(time == 211){
            clearInterval(stopwatchTime)
            clearInterval(voltReading)
            clearInterval(dataPass)
        }
    }, 330);
    voltReading = setInterval(() => {
        volt += getRndInteger(min, max)
        if(volt<100)
            voltmeter.textContent = "00."+volt
        else if(volt < 200){
            if(volt < 110)
                voltmeter.textContent = "01.0"+(volt-100)
            else 
                voltmeter.textContent = "01."+(volt-100)
        }
    }, 1000);
    dataPass = setInterval(() => {
        if(min>0) min--
        if(max>1) max--
        console.log(min, max)
        yValue = parseFloat(voltmeter.textContent)
        yValuesdum.push(yValue)
        console.log(yValuesdum)
        rowData.sno = srno
        rowData.time = xValues[srno]
        rowData.volts = yValue
        srno++
        localStorage.setItem('rowData', JSON.stringify(rowData))
    }, 9901);
}




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

