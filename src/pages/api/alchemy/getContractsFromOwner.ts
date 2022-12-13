import { Network, Alchemy } from 'alchemy-sdk';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address, contractFilter } = req.query;

    let { data } = await axios.get(
      `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getContractsForOwner`,
      {
        params: {
          owner: address,
          includeFilters: JSON.stringify(String(contractFilter).split(',')),
        },
      }
    );

    if (data?.contracts) {
      data = data.contracts.filter((contract: any) =>
        String(contractFilter).split(',').includes(contract.address.toLowerCase())
      );
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
