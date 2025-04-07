// 서버 메모리 캐시 (전역 변수)
let searchHistoryCache = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      if (!Array.isArray(data)) {
        return res.status(400).json({ message: '잘못된 형식입니다. 배열을 보내주세요.' });
      }

      searchHistoryCache = data;
      console.log('검색 기록이 저장되었습니다:', searchHistoryCache.length, '개 항목');
      return res.status(200).json({ message: '검색 기록 저장 성공' });
    } catch (err) {
      console.error('검색 기록 저장 중 오류:', err);
      return res.status(500).json({ message: '서버 오류' });
    }
  }

  return res.status(405).json({ message: '허용되지 않은 메서드' });
}

// 캐시를 다른 파일에서도 사용할 수 있도록 export (선택)
export { searchHistoryCache };
