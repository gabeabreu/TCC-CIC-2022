import Image from 'next/image';
import verifiedUsers from '../../../public/mock/nfts.json';
import Button from '../Button';
import NftCard from '../Carousel/NftCard';

const CollectionCard = () => {
  return (
    <div className="flex w-full">
      {/* left side */}
      <div className="flex flex-col items-start justify-between bg-mds-white rounded-l-3xl max-w-sm py-12 pl-12 pr-9">
        <div className="flex flex-col">
          <div className="w-full flex justify-center mb-7">
            <div className="w-[19rem] h-[12rem] relative rounded-lg overflow-hidden">
              <Image
                src="/mockImages/nike.svg"
                layout="fill"
                alt="collection logo"
                objectFit="cover"
              />
            </div>
          </div>
          <span className="font-semibold text-2xl text-mds-gray-500 mb-1">Nome coleção</span>
          <span className="text-mds-gray-500 line-clamp-4 max-w-[19rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eos in quo culpa.
            Facilis, laborum aut. Natus ab perspiciatis minima, dolores aut explicabo sint
            aspernatur sed? Placeat quibusdam velit quidem!
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-mds-gray-200 text-xs font-semibold">{`Available: ${20}`}</span>
          <span className="text-mds-gray-200 text-xs font-semibold">{`Redeemed: ${20}`}</span>
        </div>
      </div>
      {/* right side */}
      <div className="items-end flex flex-col w-full gap-y-10 py-12 pr-12 pl-20 rounded-r-3xl from-[#ffffff55] to-[#ffffff22] bg-gradient-to-br">
        <div className="flex justify-between w-full">
          {verifiedUsers.slice(0, 3).map((item, idx) => (
            <NftCard
              key={idx}
              description={item.description}
              idNumber={item.idNumber}
              pictureUrl={item.pictureUrl}
              title={item.title}
            />
          ))}
        </div>
        <Button className="bg-mds-purple rounded-lg">View more</Button>
      </div>
    </div>
  );
};

export default CollectionCard;
