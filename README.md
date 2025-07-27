# Reddit Sentiment Analyzer on AI in the Workplace

This serverless project uses AWS services to extract and analyze Reddit sentiment around the topic of "AI in the workplace" and displays the insights in a live dashboard.


## 🔍 Live Demo
[View the Dashboard](https://ai-sentiment-dashboard-nlewis.s3.us-east-1.amazonaws.com/dashboard.html)

## 🚀 Features
- Pulls fresh Reddit posts with the keyword “AI” from tech-related subreddits
- Analyzes sentiment using AWS Comprehend (Positive, Negative, Neutral, Mixed)
- Stores results in DynamoDB
- Exposes a REST API using API Gateway and Lambda
- Displays results in a clean, mobile-friendly chart hosted via Amazon S3

## 🧰 Tech Stack
- AWS Lambda (Python)
- AWS DynamoDB
- AWS Comprehend
- AWS API Gateway
- Amazon S3 (Static Hosting)
- Chart.js (Visualization)
- Reddit API via `praw`

## 📁 Folder Structure

reddit-sentiment-analyzer/
├── dashboard.html # Live data dashboard
├── assets/
│ └── chart-setup.js # Chart rendering logic
├── lambda/
│ ├── reddit_ingest/
│ │ └── lambda_function.py # Ingests Reddit posts + Comprehend
│ └── reddit_summary/
│ └── lambda_function.py # Summarizes daily sentiment counts
├── dynamodb/
│ └── AISentimentReddit (table) # Stores raw sentiment data
├── api/
│ └── summary-endpoint # API Gateway for frontend access


---

## 🧠 How It Works

1. **Ingestion Lambda** uses PRAW to fetch recent Reddit posts from key AI-related subreddits.
2. It classifies each post’s sentiment using **AWS Comprehend**.
3. The results are stored in **Amazon DynamoDB**.
4. A second Lambda function exposes a **summarized API** via API Gateway.
5. The **frontend dashboard** fetches the summary and renders it using **Chart.js**.

---

## 📂 Key Files

- [`dashboard.html`](dashboard.html) – Live interactive dashboard
- [`lambda_function.py`](lambda/reddit_ingest/lambda_function.py) – Reddit ingestion and sentiment classification
- [`lambda_function.py`](lambda/reddit_summary/lambda_function.py) – Sentiment summary endpoint
- [`chart-setup.js`](assets/chart-setup.js) – Chart config for frontend

---

## 🌐 API Endpoint Example

```http
GET https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/

{
  "Items": [
    { "sentiment": "POSITIVE", "count": 5 },
    { "sentiment": "NEUTRAL", "count": 12 },
    { "sentiment": "NEGATIVE", "count": 3 }
  ]
}
