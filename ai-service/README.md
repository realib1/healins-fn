# Healins AI Service

FastAPI scaffold for Healins summarization, outbreak detection, and risk scoring.

## Endpoints

- `GET /health`
- `POST /v1/summaries`
- `POST /v1/risk-score`
- `POST /v1/outbreak-signals`

## Setup

1. Create a virtual environment.
2. Install dependencies with `pip install -r requirements.txt`.
3. Run `uvicorn app.main:app --reload --port 8000`.
