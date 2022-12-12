import { Network, Alchemy } from 'alchemy-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address } = req.query;

    const data = await alchemy.nft.getNftsForContract(String(address), {
      omitMetadata: false,
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
