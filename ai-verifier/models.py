from pydantic import BaseModel

class SolutionRequest(BaseModel):
    quest_id: str
    user_address: str
    solution: str
