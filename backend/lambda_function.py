import json
import random

def lambda_handler(event, context):

    try:
        print("Received event:", event)

        body = {}

        if "body" in event and event["body"]:
            body = json.loads(event["body"])

        vibration = float(body.get("vibration", random.uniform(1,10)))
        temperature = float(body.get("temperature", random.uniform(30,70)))
        load = float(body.get("load", random.uniform(40,95)))

        risk_score = round((vibration + temperature/10 + load/20)/10, 2)

        result = {
            "infrastructure_id": "BR-102",
            "vibration": vibration,
            "temperature": temperature,
            "load": load,
            "risk_score": risk_score
        }

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": json.dumps(result)
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": "Internal Server Error",
                "error": str(e)
            })
        }