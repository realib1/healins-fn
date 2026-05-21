from pydantic import BaseModel, Field


class SummaryRequest(BaseModel):
    patient_id: str = Field(min_length=1)
    notes: str = Field(min_length=1)
    context: list[str] = Field(default_factory=list)


class SummaryResponse(BaseModel):
    patient_id: str
    summary: str
    risk_flags: list[str]


class RiskScoreRequest(BaseModel):
    patient_id: str = Field(min_length=1)
    symptoms: list[str] = Field(default_factory=list)
    observations: list[str] = Field(default_factory=list)


class RiskScoreResponse(BaseModel):
    patient_id: str
    score: float
    severity: str
    reasons: list[str]


class OutbreakSignalRequest(BaseModel):
    region: str = Field(min_length=1)
    signals: list[str] = Field(default_factory=list)
    baseline: str = "4-week"


class OutbreakSignalResponse(BaseModel):
    region: str
    status: str
    confidence: float
    summary: str
