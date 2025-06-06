from fastapi import FastAPI, HTTPException
from verifier import evaluate_solution
from models import SolutionRequest

app = FastAPI()

@app.post("/verify")
async def verify_solution(data: SolutionRequest):
    try:
        result = evaluate_solution(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
