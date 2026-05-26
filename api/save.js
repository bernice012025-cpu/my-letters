import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { sender_name, persona, subject, body } = req.body;
  
  const id = nanoid(10);
  await kv.set(`letter:${id}`, { sender_name, persona, subject, body }, { ex: 60 * 60 * 24 * 30 });
  
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/letter/${id}`;
  res.status(200).json({ id, url });
}
