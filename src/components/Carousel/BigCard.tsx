import Image from 'next/image';

interface Props {
  pictureUrl: string;
  likesNumber: number;
  title: string;
  company: string;
  description: string;
  availableNfts: number;
  key?: number;
}

const BigCard = ({ pictureUrl, company, title, description, availableNfts, key }: Props) => {
  return (
    <div key={key} className="flex flex-col mx-4 group">
      <div className="px-5 pt-5 pb-6 flex bg-mds-white bg-opacity-20 bg-clip-padding rounded-t-2xl border-t-4 border-x-4 border-[#fdfdfd44]">
        <div className="w-full h-[10.5rem] rounded-xl relative overflow-hidden">
          <Image
            layout="fill"
            objectFit="cover"
            src={pictureUrl}
            alt="nft image"
            className="group-hover:scale-105 duration-500"
          />
        </div>
      </div>
      <div className="bg-mds-white px-6 py-6 rounded-b-2xl flex flex-col justify-center items-start">
        <div className="flex flex-col justify-center">
          <div className="flex gap-x-1 items-end">
            <span className="font-semibold text-2xl">{title}</span>
            {!company && <i className="fa-solid fa-badge-check mb-2 text-[#1DA1F2]" />}
          </div>
          {company && (
            <div className="flex items-center gap-x-1">
              <span className="font-semibold text-mds-gray-200">{company}</span>
              <i className="fa-solid fa-badge-check text-[#1DA1F2]" />
            </div>
          )}
          <span className="line-clamp-2 w-full mt-4">{description}</span>
        </div>
        <div className="flex justify-between w-full mt-[3.25rem]">
          <button className="px-6 py-1 bg-black hover:bg-mds-purple text-mds-white duration-300 rounded-xl">
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