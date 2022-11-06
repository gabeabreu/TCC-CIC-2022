import nfts from '../../../public/mock/nfts.json';
import Carousel from '../Carousel';

const TrendindSection = () => {
  return (
    <div className="flex flex-col w-[64rem] mb-40 mt-32 relative">
      <div className="z-20 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <span className="font-extrabold text-[3rem] text-mds-white">Trending products</span>
          <a
            href="https://www.youtube.com/"
            className="text-mds-cyan text-xl font-semibold mr-[-1.4rem]"
          >
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
