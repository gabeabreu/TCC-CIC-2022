import Image from 'next/image';

interface Props {
  pictureUrl: string;
  likesNumber: number;
  title: string;
  description: string;
  availableNfts: number;
  key?: number;
}

const BigCard = ({ pictureUrl, likesNumber, title, description, availableNfts, key }: Props) => {
  return (
    <div key={key} className="flex flex-col mt-10 mx-4">
      <div className="px-5 pt-5 pb-6 flex bg-mds-white bg-opacity-20 bg-clip-padding rounded-t-2xl border-t-4 border-x-4 border-[#fdfdfd44]">
        <div className="w-full h-[10.5rem] rounded-xl relative overflow-hidden">
          {/* <div className="absolute w-[3.5rem] h-[1.8rem] rounded-bl-lg top-0 right-0 z-40 flex gap-x-1 justify-center items-center bg-mds-white bg-opacity-20">
            <i className="fa-light fa-heart text-mds-white tex" />
            <span className="text-mds-white text-sm font-light">{likesNumber}</span>
          </div> */}
          <Image layout="fill" objectFit="cover" src={pictureUrl} alt="nft image" />
        </div>
      </div>
      <div className="bg-mds-white px-5 py-6 rounded-b-2xl flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-2xl">{title}</span>
          <span className="truncate max-w-[13.5rem]">{description}</span>
        </div>
        <div className="flex justify-between w-full mt-[3.25rem]">
          <button className="px-6 py-1 bg-black rounded-xl">
            <span className="font-semibold text-mds-white">View more</span>
          </button>
          <div className="flex items-center gap-x-1">
            <span className="font-semibold">{`Available NFT's: ${availableNfts}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCard;
