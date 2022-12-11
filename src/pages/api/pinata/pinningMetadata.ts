import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, external_url, image, rarity } = req.query;

    const metadata: any = {};
    if (description) metadata.description = description;
    if (external_url) metadata.external_url = external_url;
    if (image) metadata.image = image;
    if (name) metadata.name = name;
    if (rarity)
      metadata.attributes = [
        {
          trait_type: 'Rarity',
          value: rarity,
        },
      ];

    const { data } = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      JSON.stringify({
        pinataContent: metadata,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
        },
      }
    );

    console.log('return:', data.IpfsHash);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
