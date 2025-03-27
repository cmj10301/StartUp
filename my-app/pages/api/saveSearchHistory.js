// 서버 메모리 캐시 (전역 변수)
let searchHistoryCache = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    searchHistoryCache = req.body;
    return res.status(200).json({ message: '검색 기록 저장 성공' });
  }
  return res.status(405).json({ message: '허용되지 않은 메서드' });
}

export { searchHistoryCache };
