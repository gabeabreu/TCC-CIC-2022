import nfts from '../../../public/mock/nfts.json';
import Carousel from '../Carousel';

const NotableSection = () => {
  return (
    <div className="flex flex-col w-full mb-40 relative">
      <div className="z-20 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <span className="font-extrabold text-[3rem] text-mds-white">New and notable</span>
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

export default NotableSection;
