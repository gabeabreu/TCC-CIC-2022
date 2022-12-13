import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const verified = await fetch('http://localhost:8001/users/verified', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return res.json(verified);
}
