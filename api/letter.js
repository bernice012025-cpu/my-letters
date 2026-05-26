import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });
  
  try {
    const letter = await kv.get(`letter:${id}`);
    if (!letter) return res.status(404).json({ error: 'Letter not found' });
    res.status(200).json(letter);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
