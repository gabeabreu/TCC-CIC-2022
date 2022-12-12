import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await axios.get('http://localhost:8001/collections', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain',
    },
  });

  return res.json(data);
}
