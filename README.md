# AI Infrastructure Monitoring System

An AI-powered infrastructure monitoring dashboard that analyzes structural sensor data such as vibration, temperature, and load to determine infrastructure health and risk levels.

This system demonstrates how smart monitoring systems can help detect potential failures in bridges, buildings, and other critical infrastructure.

---

## Project Overview

Infrastructure such as bridges and buildings can deteriorate due to vibration, temperature fluctuations, and structural load.  
This project simulates a monitoring system that evaluates these conditions and predicts risk levels using a calculated health score.

The dashboard visualizes sensor readings and dynamically updates the risk status to help engineers monitor structural safety.

---

## System Architecture

```
Sensors → Data Processing → Risk Calculation → Monitoring Dashboard
```

Components:

- **Frontend Dashboard**
  - Displays infrastructure health
  - Shows sensor readings
  - Indicates risk levels

- **Backend Processing**
  - AWS Lambda processes incoming sensor data
  - API Gateway handles request routing

- **Database**
  - DynamoDB stores infrastructure health logs

---

## Features

- Infrastructure health gauge visualization
- Risk classification (Low / Medium / High)
- Sensor data monitoring (vibration, temperature, load)
- Failure prediction graph
- Cloud-based backend using AWS services
- Interactive dashboard interface

---

## Technology Stack

**Frontend**
- HTML
- CSS
- JavaScript
- Chart.js

**Backend**
- Node.js
- Python (AWS Lambda)

**Cloud Services**
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB

---

## Dashboard Interface

### Infrastructure Monitoring Dashboard
![Dashboard](.kiro/spec/screenshots/dash1.jpeg)

### Sensor Data Visualization
![Dashboard](.kiro/spec/screenshots/dash2.jpeg)

---

## AWS Cloud Implementation

### DynamoDB Table (Infrastructure Health Logs)
![DynamoDB](.kiro/spec/screenshots/dynamo.jpeg)

### API Gateway Endpoint
![API Gateway](.kiro/spec/screenshots/gateway.jpeg)

### Lambda Function Backend
![Lambda](.kiro/spec/screenshots/lambda.jpeg)
---

## Risk Calculation Logic

Infrastructure health is calculated using the following formula:

```
Health Score = 100 − (Temperature × 0.3 + Vibration × 0.8 + Load × 0.2)
```

Risk classification:

| Health Score | Risk Level |
|--------------|------------|
| > 70 | Low Risk |
| 40 - 70 | Medium Risk |
| < 40 | High Risk |

---

## Demo Execution

1. Open the monitoring dashboard.
2. Input sensor values (vibration, temperature, load).
3. Click **Update Dashboard**.
4. The system calculates infrastructure health.
5. Risk level updates dynamically.

Example scenarios:

Safe Condition
```
Vibration: 10
Temperature: 40
Load: 30
```

Medium Risk
```
Vibration: 30
Temperature: 70
Load: 60
```

High Risk
```
Vibration: 60
Temperature: 90
Load: 95
```

---

## Real World Applications

- Bridge monitoring systems
- Smart city infrastructure management
- Railway track monitoring
- Building structural safety analysis
- Disaster prevention systems

---

## Future Improvements

- Real-time IoT sensor integration
- Machine learning-based anomaly detection
- Multi-location infrastructure monitoring
- Automated maintenance alerts

---

