/* eslint-disable react/jsx-key */
import Slider from 'react-slick';
import SmallCard from './SmallCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BigCard from './BigCard';

interface Props {
  data: any;
  isSmall: boolean;
}

const Carousel = ({ data, isSmall }: any) => {
  return isSmall ? (
    <div className="w-[64rem] ml-20">
      <Slider infinite={true} speed={400} slidesToShow={3} slidesToScroll={3}>
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
    <div className="w-[64rem]">
      <Slider infinite={true} speed={400} slidesToShow={2} slidesToScroll={2}>
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
