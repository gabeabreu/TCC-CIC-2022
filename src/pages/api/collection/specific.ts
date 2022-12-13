import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  try {
    const { data } = await axios.get('http://localhost:8001/collections/find', {
      params: {
        address: String(address).toLowerCase(),
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, /',
      },
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }

  // const collection = await fetch('http://localhost:8001/collections/find', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     address: address,
  //   }),
  //   headers: {
  //     Accept: 'application/json, text/plain, /',
  //     'Content-Type': 'application/json',
  //   },
  // }).then((res) => res.json());

  // return res.json(collection);
}
