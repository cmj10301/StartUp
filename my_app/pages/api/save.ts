import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

interface FeatureMap {
  [key: string]: string;
}

interface NewItem {
  name: string;
  features: FeatureMap;
}

const datasetPath = path.join(process.cwd(), 'public', 'data', 'twenty_questions_dataset_100_high_quality.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용되지 않은 요청입니다.' });
  }

  try {
    const { name, features }: NewItem = req.body;

    if (!name || !features) {
      return res.status(400).json({ message: '정답 이름 또는 특징이 부족합니다.' });
    }

    const raw = fs.readFileSync(datasetPath, 'utf-8');
    const data = JSON.parse(raw);
    data.push({ name, features });

    fs.writeFileSync(datasetPath, JSON.stringify(data, null, 2), 'utf-8');
    return res.status(200).json({ message: '저장 완료' });
  } catch (error) {
    return res.status(500).json({ message: '파일 저장 중 오류', error });
  }
}
