from fastapi import FastAPI

from .schemas import (
    OutbreakSignalRequest,
    OutbreakSignalResponse,
    RiskScoreRequest,
    RiskScoreResponse,
    SummaryRequest,
    SummaryResponse,
)
from .services import calculate_risk_score, build_summary, detect_outbreak_signals

app = FastAPI(title="Healins AI Service", version="0.1.0")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"service": "healins-ai-service", "status": "ok"}


@app.post("/v1/summaries", response_model=SummaryResponse)
def summarize_visit(request: SummaryRequest) -> dict[str, object]:
    return build_summary(request)


@app.post("/v1/risk-score", response_model=RiskScoreResponse)
def score_visit(request: RiskScoreRequest) -> dict[str, object]:
    return calculate_risk_score(request)


@app.post("/v1/outbreak-signals", response_model=OutbreakSignalResponse)
def outbreak_signals(request: OutbreakSignalRequest) -> dict[str, object]:
    return detect_outbreak_signals(request)
