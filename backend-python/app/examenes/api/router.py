from fastapi import APIRouter
from model.ExamRequest import ExamRequest
from service.exam import generate_exam
# from service.multiple_choice import generate_multiple_choice

router = APIRouter()

@router.post('/examen')
def exam(request: ExamRequest):
    return generate_exam(request.user_notes)

# @router.post('/multiple-choice')
# def multiple_choice(content):
#     generate_multiple_choice(content)
    