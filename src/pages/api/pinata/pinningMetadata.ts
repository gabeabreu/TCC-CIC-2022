import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prompt } = req.query;
    const { data } = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        name,
        description,
        size: '512x512',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
        },
      }
    );
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
