import { formatAddres } from '@/helpers/utils';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { useRouter } from 'next/router';
import verifiedUsers from '../../../public/mock/nfts.json';
import Button from '../Button';
import NftCard from '../Carousel/NftCard';

interface Props {
  key: string;
  address: string;
  image: string;
  ownerName: string;
  ownerAddress: string;
  name: string;
  description?: string;
  totalSupply: number;
  totalRedeemed: number;
  nfts?: {
    image: string;
    idNumber: number;
    title: string;
    description: string;
    tokenId: string;
    key?: number;
  }[];
}

const CollectionCard = ({
  key,
  address,
  image,
  name,
  description,
  totalSupply,
  totalRedeemed,
  nfts,
}: Props) => {
  const router = useRouter();

  const { width } = useWindowSize();
  console.log(nfts);
  return (
    <div key={key} className="flex w-full">
      {/* left side */}
      <div className="flex flex-col items-start justify-between bg-mds-white rounded-l-3xl max-w-sm py-12 pl-12 pr-9">
        <div className="flex flex-col">
          <div className="w-full flex justify-center mb-7">
            <div className="w-[19rem] h-[12rem] relative rounded-2xl overflow-hidden">
              <Image
                src={image || '/assets/accountPage/profilePicture.svg'}
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
          <span className="text-mds-gray-200 text-lg font-semibold">{`Available: ${
            totalSupply || 0
          }`}</span>
          <span className="text-mds-gray-200 text-lg font-semibold">{`Redeemed: ${
            totalRedeemed || 0
          }`}</span>
        </div>
      </div>
      {/* right side */}
      <div className="flex items-center flex-col w-full gap-y-8 py-10 rounded-r-3xl from-[#ffffff55] to-[#ffffff22] bg-gradient-to-br">
        <div className="flex gap-x-6">
          {nfts &&
            nfts
              .slice(0, width && width < 1280 ? 1 : width && width < 1536 ? 2 : 3)
              .map((item, idx) => (
                <NftCard
                  size="xs"
                  key={idx}
                  idNumber={Number(item.tokenId)}
                  description={item.description}
                  pictureUrl={item.media?.[0]?.gateway}
                  title={item.title || ''}
                />
              ))}
        </div>
        <div className="ml-auto mr-24 xl:mr-20 2xl:mr-14 duration-500">
          <Button
            onClick={() =>
              router.push({
                hostname: `collection/${address}`,
              })
            }
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
