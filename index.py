from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from core.models import TransactionQuote
from core.service import CurrencyConversionService
from infrastructure.providers import FrankfurterProvider


class QuoteRequest(BaseModel):
    baseCurrency: str = Field(..., min_length=3, max_length=3)
    targetCurrency: str = Field(..., min_length=3, max_length=3)
    amount: float = Field(..., gt=0)
    flatFee: float = Field(0, ge=0)
    margin: float | None = Field(default=None, ge=0)


class QuoteResponse(BaseModel):
    baseCurrency: str
    targetCurrency: str
    originalAmount: float
    interbankRate: float
    consumerRate: float
    finalPayout: float
    feesApplied: float
    providerName: str


class ApiError(BaseModel):
    code: str
    message: str
    details: dict | None = None


app = FastAPI(title="FranklyFX API", version="1.0.0")

# CORS configuration – adjust allowed_origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _build_service(margin: float | None) -> CurrencyConversionService:
    provider = FrankfurterProvider()
    default_margin = margin if margin is not None else 0.02
    return CurrencyConversionService(provider=provider, default_margin=default_margin)


def _to_response_model(quote: TransactionQuote) -> QuoteResponse:
    return QuoteResponse(
        baseCurrency=quote.base_currency,
        targetCurrency=quote.target_currency,
        originalAmount=quote.original_amount,
        interbankRate=quote.interbank_rate,
        consumerRate=quote.consumer_rate,
        finalPayout=quote.final_payout,
        feesApplied=quote.fees_applied,
        providerName="FranklyFX (via Frankfurter)",
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: RequestValidationError) -> JSONResponse:
    error = ApiError(
        code="INVALID_INPUT",
        message="Request payload is invalid. Please check the provided fields.",
    )
    return JSONResponse(status_code=400, content=error.dict())


@app.post(
    "/api/quote",
    response_model=QuoteResponse,
    responses={
        400: {"model": ApiError},
        502: {"model": ApiError},
        503: {"model": ApiError},
    },
)
def create_quote(request: QuoteRequest):
    service = _build_service(request.margin)

    quote = service.generate_quote(
        base=request.baseCurrency,
        target=request.targetCurrency,
        amount=request.amount,
        flat_fee=request.flatFee,
    )

    if quote is None:
        # At this point, either the provider failed or internal validation failed.
        # Map this to a provider/availability style error for the web client.
        raise HTTPException(
            status_code=502,
            detail=ApiError(
                code="PROVIDER_UNAVAILABLE",
                message="Unable to fetch FX rate at this time.",
            ).dict(),
        )

    return _to_response_model(quote)

