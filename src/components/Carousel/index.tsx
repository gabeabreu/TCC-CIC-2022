/* eslint-disable react/jsx-key */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useWindowSize from '../../hooks/useWindowSize';
import VerifiedCard from './VerifiedCard';
import CollectionCard from './CollectionCard';
import NftCard from './NftCard';

interface Props {
  data: any;
  isSmall?: boolean;
  isVerified?: boolean;
}

const Carousel = ({ data, isSmall = false, isVerified = false }: Props) => {
  const windowSize = useWindowSize();

  return isSmall ? (
    <div className="w-full">
      <Slider
        infinite={true}
        speed={400}
        slidesToShow={windowSize?.width && windowSize.width < 1536 ? 3 : 4}
        slidesToScroll={windowSize?.width && windowSize.width < 1536 ? 3 : 4}
        className="gap-x-10 flex"
      >
        {data.map((nft: any) => (
          <div className="mx-4">
            <NftCard
              description={nft.description}
              idNumber={nft.idNumber}
              pictureUrl={nft.pictureUrl}
              title={nft.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  ) : (
    <div className="w-full">
      {isVerified ? (
        <Slider
          infinite={true}
          speed={400}
          slidesToShow={windowSize?.width && windowSize.width < 1536 ? 2 : 3}
          slidesToScroll={windowSize?.width && windowSize.width < 1536 ? 2 : 3}
        >
          {data.map((user: any) => (
            <VerifiedCard
              title={user.name}
              availableNfts={user.availableNfts}
              description={user.bio}
              pictureUrl={user.profilePictureUrl}
            />
          ))}
        </Slider>
      ) : (
        <Slider
          infinite={true}
          speed={400}
          slidesToShow={windowSize?.width && windowSize.width < 1536 ? 2 : 3}
          slidesToScroll={windowSize?.width && windowSize.width < 1536 ? 2 : 3}
        >
          {data.map((collection: any) => (
            <CollectionCard
              company={collection.userOwnerName}
              pictureUrl={collection.imageUrl}
              // title={} -- alchemy nome da collection
              // availableNfts={} -- alchemy
              // description={} -- alchemy
              //
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
