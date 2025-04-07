import { searchHistoryCache } from './saveSearchHistory';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(searchHistoryCache || []);
  }

  return res.status(405).json({ message: '허용되지 않은 메서드' });
}
