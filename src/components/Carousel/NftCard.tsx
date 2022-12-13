import Image from 'next/image';

interface Props {
  size?: 'normal' | 'xs';
  pictureUrl: string;
  idNumber: number;
  title: string;
  description: string;
  key?: number;
}

const NftCard = ({ size = 'normal', pictureUrl, idNumber, title, description, key }: Props) => {
  return (
    <div key={key} className={`${size === 'normal' ? 'w-[19rem]' : 'w-[17rem]'} flex flex-col`}>
      <div className="px-5 pt-5 pb-6 flex bg-mds-white bg-opacity-20 bg-clip-padding rounded-t-2xl border-t-4 border-x-4 border-[#fdfdfd44]">
        <div className="w-full h-[10.5rem] rounded-xl relative overflow-hidden">
          <Image layout="fill" objectFit="cover" src={pictureUrl} alt="nft image" />
        </div>
      </div>
      <div className="bg-mds-white px-5 py-6 w-full rounded-b-2xl flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-2xl">{`#${idNumber} ${title}`}</span>
          <span className="truncate max-w-[13.5rem] h-16">{description}</span>
        </div>
        <button className="px-6 py-1 bg-black rounded-xl w-full">
          <span className="font-semibold text-mds-white">See details</span>
        </button>
      </div>
    </div>
  );
};

export default NftCard;
