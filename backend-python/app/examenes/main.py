from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.router import router
from model.ExamRequest import ExamRequest
from service.exam import generate_exam

app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los origenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los headers
)

@app.get('/')
def root():
    return {'message': 'La aplicación esta corriendo :)'}

@app.post('/examenes')
def exam(request: ExamRequest):
    return generate_exam(request.user_notes)



