import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prompt } = req.query;

    const { data } = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        n: 4,
        size: '256x256',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'OpenAI-Organization': 'org-4lZnvA6eULOBKFuFSj6SzFlP',
        },
      }
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
