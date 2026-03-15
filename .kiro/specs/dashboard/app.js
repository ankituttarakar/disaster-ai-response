const API_URL = "https://e8rnpwtcmh.execute-api.eu-north-1.amazonaws.com/report";

let riskData = [];
let labels = [];

const riskChart = new Chart(
document.getElementById("riskChart"),
{
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Risk Score",
            data: riskData,
            borderColor: "red",
            borderWidth: 3,
            tension: 0.4,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 1
            }
        }
    }
});

const sensorChart = new Chart(
document.getElementById("sensorChart"),
{
    type: "bar",
    data: {
        labels: ["Vibration","Temperature","Load"],
        datasets: [{
            label: "Sensor Values",
            data: [0,0,0],
            backgroundColor: ["orange","cyan","lime"]
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

async function loadData(){

    try{

        const response = await fetch(API_URL,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });

        const raw = await response.json();

        // handle lambda response formats
        const data = raw.body ? JSON.parse(raw.body) : raw;

        document.getElementById("bridge").innerText = data.infrastructure_id || "Bridge-01";
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

    }
    catch(error){
        console.error("API ERROR:", error);
    }

}

loadData();
setInterval(loadData, 5000);