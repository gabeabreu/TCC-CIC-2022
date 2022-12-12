import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, userOwnerAddress, userOwnerName, imageUrl } = req.query;
  const collections = await fetch('http://localhost:8001/collections', {
    method: 'POST',
    body: JSON.stringify({
      address: address,
      userOwnerAddress: userOwnerAddress,
      userOwnerName: userOwnerName,
      imageUrl: imageUrl,
    }),
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return res.json(collections);
}
