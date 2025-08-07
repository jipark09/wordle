from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = 'jeiny'.upper()

@app.get('/answer')
def getAnswer():
     return {'answer' : answer}

# 'static' 폴더를 '/static' 경로에 연결
app.mount("/", StaticFiles(directory="static", html=True), name="static")




