from sklearn.tree import DecisionTreeClassifier
import joblib

# 질문 순서: [사람인가요?, 가수인가요?, 한국인인가요?, 동물인가요?, 전자제품인가요?]

X = [
    [1, 1, 1, 0, 0],  # BTS
    [1, 0, 1, 0, 0],  # 김연아
    [1, 0, 0, 0, 0],  # 앨런 튜링
    [0, 0, 0, 1, 0],  # 앵무새
    [0, 0, 0, 0, 1],  # 아이폰
]

Y = ['BTS', '김연아', '앨런 튜링', '앵무새', '아이폰']

# 모델 학습
model = DecisionTreeClassifier()
model.fit(X, Y)

# 모델 저장
joblib.dump(model, 'AI/decision_tree_model.pkl')
print("✅ 모델 저장 완료: decision_tree_model.pkl")
