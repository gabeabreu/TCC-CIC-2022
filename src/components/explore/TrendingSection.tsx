import nfts from '../../../public/mock/nfts.json';
import Carousel from '../Carousel';

const TrendindSection = () => {
  return (
    <div className="flex w-full flex-col mb-24 mt-16 relative">
      <div className="z-20 flex w-full flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <span className="explore-page-title">Trending products</span>
          <a href="https://www.youtube.com/" className="text-mds-cyan text-xl font-semibold">
            View more
            <i className="fa-solid fa-arrow-up-right-from-square ml-2" />
          </a>
        </div>
        <Carousel isSmall data={nfts} />
      </div>
    </div>
  );
};

export default TrendindSection;
