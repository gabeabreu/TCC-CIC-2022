import nfts from '../../../public/mock/nfts.json';
import Carousel from '../Carousel';

const TrendindSection = () => {
  return (
    <div className="flex w-full flex-col mb-20 mt-32 relative">
      <div className="z-20 flex w-full flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <span className="font-extrabold text-[3rem] text-mds-white">Trending products</span>
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
