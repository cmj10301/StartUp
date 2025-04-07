'use client';

import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import MindMap from '@/component/MindMap';

// 검색 기록 항목의 타입 정의
interface SearchHistoryEntry {
  url: string;
  title: string;
  lastVisitTime: number;
  visitCount?: number;
}

export default function History() {
  const [historyData, setHistoryData] = useState<SearchHistoryEntry[]>([]);

  // 서버에서 검색 기록 가져오기
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/getSearchHistory');
        if (!response.ok) throw new Error('서버 오류');

        const data = await response.json();
        if (Array.isArray(data)) {
          setHistoryData(data);
        }
      } catch (err) {
        console.error('검색 기록 불러오기 실패:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="main">
      <Image src="/zoom.gif" alt="zoom" width={200} height={200} />
      <br />
      <h3>검색 기록으로 유추하기</h3>
      <div className="main_button_group">
        <Button size="lg" onClick={() => alert('기능 준비 중')}>
          시작하기
        </Button>
        <MindMap/>
      </div>
      <hr />
      <h5>최근 검색 기록:</h5>
      <ul>
        {historyData.map((entry, index) => (
          <li key={index}>
            <strong>{entry.title}</strong><br />
            <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.url}</a><br />
            <small>{new Date(entry.lastVisitTime).toLocaleString()}</small>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
