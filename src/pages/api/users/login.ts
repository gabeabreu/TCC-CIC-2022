import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, name, bio, instagram, twitter, website, discord, collectionsMinted } = req.query;
  const user = await fetch('http://localhost:8001/users', {
    method: 'POST',
    body: JSON.stringify({
      address: address,
      name: '',
      bio: '',
      instagram: '',
      twitter: '',
      website: '',
      discord: '',
      isVerified: false,
      collectionsMinted: [],
    }),
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return res.json(user);
}
