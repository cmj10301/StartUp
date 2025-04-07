from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sklearn.tree import DecisionTreeClassifier
import joblib

app = FastAPI()

# CORS 허용 (Next.js 연동 시 필수)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    answers: list[int]  # 예: [1, 0, 1, 0, 0]

# 학습된 모델 로드
model = joblib.load("AI/decision_tree_model.pkl")

@app.post("/predict")
def predict(data: InputData):
    prediction = model.predict([data.answers])
    return {"result": prediction[0]}
