# lambda/reddit_summary/lambda_function.py
import json
import boto3
from collections import Counter

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('AISentimentReddit')

def lambda_handler(event, context):
    response = table.scan()
    items = response.get('Items', [])

    sentiments = [item['sentiment'] for item in items if 'sentiment' in item]
    count = dict(Counter(sentiments))

    formatted = [{"sentiment": k, "count": v} for k, v in count.items()]

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({ "Items": formatted })
    }
