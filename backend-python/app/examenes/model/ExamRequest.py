from pydantic import BaseModel

class ExamRequest(BaseModel):
    user_notes: str