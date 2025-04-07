'use client';

import { useState } from 'react';

interface QA {
  question: string;
  answer: string;
}

export default function Ai() {
  const [question, setQuestion] = useState<string>('동물인가요?');
  const [history, setHistory] = useState<QA[]>([]);
  const [guess, setGuess] = useState<string | null>(null);
  const [final, setFinal] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [saveResult, setSaveResult] = useState<string | null>(null);

  const handleAnswer = async (answer: string) => {
    const newHistory = [...history, { question, answer }];
    setHistory(newHistory);

    const res = await fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history: newHistory }),
    });

    const data = await res.json();

    if (data.guess) {
      setGuess(data.guess);
      setFinal(data.final);
    } else {
      setQuestion(data.nextQuestion);
    }
  };

  const handleConfirm = (isCorrect: boolean) => {
    setConfirmed(isCorrect);
    if (!isCorrect) {
      setCorrectAnswer("");
    }
  };

  const handleSaveNewAnswer = async () => {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: correctAnswer,
        features: Object.fromEntries(history.map(h => [h.question, h.answer]))
      }),
    });

    if (res.ok) {
      setSaveResult("✅ 새로운 지식을 저장했어요!");
    } else {
      setSaveResult("❌ 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container text-center mt-5">
      {guess && confirmed === null ? (
        <>
          <h2 className="mb-4">🤖 혹시 정답은 <strong>{guess}</strong> 인가요? {final && "(확신합니다!)"}</h2>
          <div className="btn-group">
            <button onClick={() => handleConfirm(true)} className="btn btn-success mx-2">맞아요</button>
            <button onClick={() => handleConfirm(false)} className="btn btn-danger mx-2">아니에요</button>
          </div>
        </>
      ) : guess && confirmed === true ? (
        <h2 className="text-success mt-4">🎉 정답을 맞혔습니다! ({guess})</h2>
      ) : (
        <>
          <h1 className="mb-4">❓ {question}</h1>
          <div className="btn-group" role="group">
            <button onClick={() => handleAnswer("예")} className="btn btn-success mx-2">예</button>
            <button onClick={() => handleAnswer("아니오")} className="btn btn-danger mx-2">아니오</button>
            <button onClick={() => handleAnswer("모르겠습니다")} className="btn btn-secondary mx-2">모르겠습니다</button>
          </div>
        </>
      )}

      {guess && confirmed === false && (
        <>
          <h3 className="mt-4">😅 그럼 정답은 무엇이었나요?</h3>
          <input
            type="text"
            placeholder="정답 입력"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="form-control w-50 mx-auto mt-2"
          />
          <button onClick={handleSaveNewAnswer} className="btn btn-primary mt-3">저장하기</button>
          {saveResult && <p className="mt-2">{saveResult}</p>}
        </>
      )}
    </div>
  );
}
