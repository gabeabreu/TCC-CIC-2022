import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

interface Styles {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}

type Pattern = 'style-based' | 'tons-based';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prompt } = req.query;

    const styles: Styles = {
      // a painting
      //a pixel art
      // an expressive oil painting
      //a surrealist dream-like oil painting
      // digital art
      0: 'black and white digital art',
      1: '3d render',
      2: '3d render',
      3: '3d render',
      4: 'digital ',
    };

    const tons: Styles = {
      0: 'black and white',
      1: 'light green',
      2: 'purple',
      3: 'red',
      4: 'yellow',
    };

    const pattern: Pattern = 'tons-based';

    const axiosRequests = [];
    const imagesLinks: any[] = [];

    for (let i = 0; i < 5; i++) {
      axiosRequests.push(
        axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            prompt:
              //@ts-ignore
              pattern === 'style-based'
                ? `a ${styles[i as keyof Styles]} of ${prompt}`
                : `a digital art ${prompt} with ${tons[i as keyof Styles]} tint`,
            n: 1,
            size: '512x512',
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
              'OpenAI-Organization': 'org-4lZnvA6eULOBKFuFSj6SzFlP',
            },
          }
        )
      );
    }

    await axios
      .all(axiosRequests)
      .then(
        axios.spread((...responses) => {
          imagesLinks.push(responses[0].data?.data[0].url);
          imagesLinks.push(responses[1].data?.data[0].url);
          imagesLinks.push(responses[2].data?.data[0].url);
          imagesLinks.push(responses[3].data?.data[0].url);
          imagesLinks.push(responses[4].data?.data[0].url);
        })
      )
      .then(() => {
        res.status(200).json(imagesLinks);
      });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
