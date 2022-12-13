import { Network, Alchemy } from 'alchemy-sdk';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address, tokenId } = req.query;

    let { data } = await axios.get(
      `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata`,
      {
        params: {
          contractAddress: address,
          tokenId: tokenId,
        },
      }
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
