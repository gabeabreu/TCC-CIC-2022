import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const collections = await fetch('http://localhost:8001/collections', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return res.json(collections);
}
