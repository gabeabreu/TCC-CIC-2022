import { formatAddres } from '@/helpers/utils';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { useRouter } from 'next/router';
import verifiedUsers from '../../../public/mock/nfts.json';
import Button from '../Button';
import SmallCard from '../Carousel/SmallCard';

interface Props {
  key: string;
  address: string;
  name: string;
  description?: string;
  totalSupply: number;
  totalRedeemed: number;
  nfts?: {
    pictureUrl: string;
    idNumber: number;
    title: string;
    description: string;
    key?: number;
  }[];
}

const CollectionCard = ({
  key,
  address,
  name,
  description,
  totalSupply,
  totalRedeemed,
  nfts,
}: Props) => {
  const router = useRouter();

  const { width } = useWindowSize();

  return (
    <div key={key} className="flex w-full">
      {/* left side */}
      <div className="flex flex-col items-start justify-between bg-mds-white rounded-l-3xl max-w-sm py-12 pl-12 pr-9">
        <div className="flex flex-col">
          <div className="w-full flex justify-center mb-7">
            <div className="w-[19rem] h-[12rem] relative rounded-2xl overflow-hidden">
              <Image
                src="/assets/accountPage/profilePicture.svg"
                layout="fill"
                alt="collection logo"
                objectFit="cover"
              />
            </div>
          </div>
          <span className="font-semibold text-2xl text-mds-gray-500 mb-1">{name}</span>
          <span className="text-mds-gray-500 line-clamp-4 max-w-[19rem]">
            {description ||
              `Discover the best items in this collection. This is a ERC721 token based collection. The contract address is: ${formatAddres(
                address || ''
              )}.`}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-mds-gray-200 text-lg font-semibold">{`Available: ${totalSupply}`}</span>
          <span className="text-mds-gray-200 text-lg font-semibold">{`Redeemed: ${totalRedeemed}`}</span>
        </div>
      </div>
      {/* right side */}
      <div className="flex items-center flex-col w-full gap-y-8 py-10 rounded-r-3xl from-[#ffffff55] to-[#ffffff22] bg-gradient-to-br">
        <div className="flex gap-x-6">
          {verifiedUsers
            .slice(0, width && width < 1280 ? 1 : width && width < 1536 ? 2 : 3)
            .map((item, idx) => (
              <SmallCard
                size="xs"
                key={idx}
                description={item.description}
                idNumber={item.idNumber}
                pictureUrl={item.pictureUrl}
                title={item.title}
              />
            ))}
        </div>
        <div className="ml-auto mr-24 xl:mr-20 2xl:mr-14 duration-500">
          <Button
            onClick={() => router.push(`collection/${address}`)}
            className="bg-mds-purple hover:bg-mds-dark-purple rounded-lg"
          >
            View more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
