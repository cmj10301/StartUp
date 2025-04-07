import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

interface FeatureMap {
  [question: string]: string;
}

interface DataItem {
  name: string;
  features: FeatureMap;
}

interface QA {
  question: string;
  answer: string;
}

const datasetPath = path.join(process.cwd(), 'public', 'data', 'twenty_questions_dataset_100_high_quality.json');

function getBestQuestion(candidates: DataItem[], answeredQuestions: FeatureMap): string {
  if (candidates.length === 0) return "정답을 찾을 수 없습니다.";

  const questions = Object.keys(candidates[0].features);
  let bestQuestion: string | null = null;
  let bestSplit = Infinity;

  for (const q of questions) {
    if (answeredQuestions[q]) continue;

    const count: Record<string, number> = { "예": 0, "아니오": 0, "모르겠습니다": 0 };
    for (const item of candidates) {
      const a = item.features[q];
      count[a] = (count[a] || 0) + 1;
    }

    const values = Object.values(count);
    const spread = Math.max(...values) - Math.min(...values);

    if (spread < bestSplit) {
      bestSplit = spread;
      bestQuestion = q;
    }
  }

  return bestQuestion ?? "더 이상 물어볼 질문이 없습니다.";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "허용되지 않은 요청 방식입니다." });
  }

  const { history }: { history: QA[] } = req.body;

  const rawData = fs.readFileSync(datasetPath, 'utf-8');
  const dataset: DataItem[] = JSON.parse(rawData);

  let candidates = dataset;
  const answeredMap: FeatureMap = {};
  for (const { question, answer } of history) {
    answeredMap[question] = answer;
    candidates = candidates.filter(item => item.features[question] === answer);
  }

  if (candidates.length === 1) {
    return res.status(200).json({ guess: candidates[0].name, final: true });
  } else if (candidates.length === 2) {
    const guess = candidates[Math.floor(Math.random() * 2)].name;
    return res.status(200).json({ guess, final: false });
  }

  const nextQuestion = getBestQuestion(candidates, answeredMap);
  res.status(200).json({ nextQuestion });
}
