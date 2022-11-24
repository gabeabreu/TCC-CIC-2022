/* eslint-disable react/jsx-key */
import Slider from 'react-slick';
import SmallCard from './SmallCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BigCard from './BigCard';
import useWindowSize from '../../hooks/useWindowSize';

interface Props {
  data: any;
  isSmall: boolean;
}

const Carousel = ({ data, isSmall }: any) => {
  const windowSize = useWindowSize();

  return isSmall ? (
    <div className="w-full">
      <Slider
        infinite={true}
        speed={400}
        slidesToShow={windowSize?.width && windowSize.width < 1536 ? 3 : 4}
        slidesToScroll={windowSize?.width && windowSize.width < 1536 ? 3 : 4}
        className="gap-x-10"
      >
        {data.map((nft: any) => (
          <SmallCard
            likesNumber={nft.likesNumber}
            description={nft.description}
            idNumber={nft.idNumber}
            pictureUrl={nft.pictureUrl}
            price={nft.price}
            title={nft.title}
          />
        ))}
      </Slider>
    </div>
  ) : (
    <div className="w-full">
      <Slider
        infinite={true}
        speed={400}
        slidesToShow={windowSize?.width && windowSize.width < 1536 ? 2 : 3}
        slidesToScroll={windowSize?.width && windowSize.width < 1536 ? 2 : 3}
      >
        {data.map((user: any) => (
          <BigCard
            availableNfts={user.availableNfts}
            likesNumber={user.likesNumber}
            description={user.description}
            pictureUrl={user.pictureUrl}
            title={user.title}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
