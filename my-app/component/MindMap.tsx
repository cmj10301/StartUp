// app/history/MindMap.tsx
'use client';

import { useEffect, useState } from 'react';

interface SearchEntry {
  title: string;
  url: string;
}

interface CategorizedData {
  [category: string]: SearchEntry[];
}

function categorizeTitle(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('hospital') || lower.includes('clinic') || lower.includes('health')) return '헬스';
  if (lower.includes('covid') || lower.includes('vaccine') || lower.includes('doctor')) return '의료';
  if (lower.includes('ai') || lower.includes('next.js') || lower.includes('programming')) return 'IT';
  return '기타';
}

function categorize(entries: SearchEntry[]): CategorizedData {
  const map: CategorizedData = {};
  for (const entry of entries) {
    const category = categorizeTitle(entry.title || entry.url);
    if (!map[category]) map[category] = [];
    map[category].push(entry);
  }
  return map;
}

export default function MindMap() {
  const [data, setData] = useState<CategorizedData>({});

  useEffect(() => {
    fetch('/api/getSearchHistory')
      .then(res => res.json())
      .then((entries: SearchEntry[]) => {
        const categorized = categorize(entries);
        setData(categorized);
      });
  }, []);

  return (
    <div className="mindmap-container">
      <div className="center-node">검색 주제</div>
      {Object.entries(data).map(([category, entries], index) => {
        const angle = (360 / Object.keys(data).length) * index;
        const radius = 150;

        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <div
            key={category}
            className="node"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              backgroundColor: getCategoryColor(category),
            }}
            title={entries.map(e => e.title).join('\n')}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
}

function getCategoryColor(category: string) {
  const colors: { [key: string]: string } = {
    헬스: '#6abf69',
    의료: '#f78fb3',
    IT: '#74b9ff',
    기타: '#ccc',
  };
  return colors[category] || '#999';
}
