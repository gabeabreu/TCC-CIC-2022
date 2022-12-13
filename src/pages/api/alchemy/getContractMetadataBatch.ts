import axios from 'axios';
import { getContractAddress } from 'ethers/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { contractAddresses } = req.query;

    let { data } = await axios.post(
      `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getContractMetadataBatch`,
      {
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
          contractAddresses: JSON.stringify(String(contractAddresses).split(',')),
        }),
      }
    );

    // if (data?.contracts) {
    //   data = data.contracts.filter((contract: any) =>
    //     String(contractFilter).split(',').includes(contract.address.toUpperCase())
    //   );
    // }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
