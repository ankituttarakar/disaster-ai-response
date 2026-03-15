const API_URL = "https://e8rnpwtcmh.execute-api.eu-north-1.amazonaws.com/report";

let riskData = [];
let labels = [];

const riskChart = new Chart(
document.getElementById("riskChart"),
{
    type:"line",
    data:{
        labels:labels,
        datasets:[{
            label:"Risk Score",
            data:riskData,
            borderColor:"red",
            fill:false
        }]
    }
});

const sensorChart = new Chart(
document.getElementById("sensorChart"),
{
    type:"bar",
    data:{
        labels:["Vibration","Temperature","Load"],
        datasets:[{
            label:"Sensor Values",
            data:[0,0,0],
            backgroundColor:["orange","cyan","lime"]
        }]
    }
});

async function loadData(){

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                vibration:7.2,
                temperature:63,
                load:82
            })
        });

        const data = await response.json();

        document.getElementById("bridge").innerText = data.infrastructure_id;
        document.getElementById("vibration").innerText = data.vibration + " mm/s";
        document.getElementById("temperature").innerText = data.temperature + " °C";
        document.getElementById("load").innerText = data.load + " %";

        document.getElementById("risk").innerText = data.risk_score;

        const health = 100 - (data.risk_score * 100);
        document.getElementById("health").innerText = Math.round(health) + "/100";

        if(data.risk_score > 0.8)
            document.getElementById("status").innerText = "CRITICAL";
        else if(data.risk_score > 0.5)
            document.getElementById("status").innerText = "WARNING";
        else
            document.getElementById("status").innerText = "SAFE";


        labels.push(new Date().toLocaleTimeString());
        riskData.push(data.risk_score);

        if(labels.length > 10){
            labels.shift();
            riskData.shift();
        }

        riskChart.update();

        sensorChart.data.datasets[0].data = [
            data.vibration,
            data.temperature,
            data.load
        ];

        sensorChart.update();

    }catch(error){
        console.error(error);
    }

}

loadData();
setInterval(loadData,5000);