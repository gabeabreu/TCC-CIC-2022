import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  const collection = await fetch('http://localhost:8001/collections/find', {
    method: 'POST',
    body: JSON.stringify({
      address: address,
    }),
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return res.json(collection);
}
