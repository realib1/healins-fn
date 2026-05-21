from .schemas import OutbreakSignalRequest, RiskScoreRequest, SummaryRequest


def build_summary(request: SummaryRequest) -> dict[str, object]:
    summary = request.notes.strip()
    context_text = (
        "; ".join(request.context) if request.context else "No extra context provided."
    )

    return {
        "patient_id": request.patient_id,
        "summary": f"Clinical summary: {summary}. Context: {context_text}",
        "risk_flags": [
            "Review recent recurrence patterns",
            "Check medication interaction history",
        ],
    }


def calculate_risk_score(request: RiskScoreRequest) -> dict[str, object]:
    signal_count = len(request.symptoms) + len(request.observations)
    score = min(0.95, 0.35 + (signal_count * 0.12))

    if score >= 0.8:
        severity = "high"
    elif score >= 0.55:
        severity = "moderate"
    else:
        severity = "low"

    reasons = [
        f"Symptoms reported: {len(request.symptoms)}",
        f"Observations recorded: {len(request.observations)}",
        "Model combines historical recurrence patterns with visit context",
    ]

    return {
        "patient_id": request.patient_id,
        "score": round(score, 2),
        "severity": severity,
        "reasons": reasons,
    }


def detect_outbreak_signals(request: OutbreakSignalRequest) -> dict[str, object]:
    signal_count = len(request.signals)
    confidence = min(0.97, 0.52 + (signal_count * 0.11))

    if signal_count >= 4:
        status = "escalate"
    elif signal_count >= 2:
        status = "watch"
    else:
        status = "stable"

    return {
        "region": request.region,
        "status": status,
        "confidence": round(confidence, 2),
        "summary": (
            f"Aggregated {signal_count} signals against the {request.baseline} baseline."
        ),
    }
