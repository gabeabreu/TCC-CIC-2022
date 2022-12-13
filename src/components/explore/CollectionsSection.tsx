import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import nfts from '../../../public/mock/nfts.json';
import Carousel from '../Carousel';

const CollectionsSection = () => {
  // const [newCollections, setNewCollections] = useState();

  // async function getCollectionsMetadataBatch() {
  //   const { data: collections }: AxiosResponse = await axios.get('/api/collection/newCollections');
  //   console.log(collections);
  //   const contractFilter = collections.map((collection: any) => collection.address);
  //   const { data: collectionMetadata }: AxiosResponse = await axios.get(
  //     '/api/alchemy/getContractMetadataBatch',
  //     {
  //       params: { contractAddresses: contractFilter.toString() },
  //     }
  //   );
  //   console.log(collectionMetadata);
  //   // setNewCollections(data);
  // }

  // useEffect(() => {
  //   getCollectionsMetadataBatch();
  // }, []);

  return (
    <div className="flex w-full flex-col mb-24 mt-16 relative">
      <div className="z-20 flex w-full flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <span className="explore-page-title">New collections</span>
          <a href="https://www.youtube.com/" className="text-mds-cyan text-xl font-semibold">
            View more
            <i className="fa-solid fa-arrow-up-right-from-square ml-2" />
          </a>
        </div>
        <Carousel data={nfts} />
      </div>
    </div>
  );
};

export default CollectionsSection;
