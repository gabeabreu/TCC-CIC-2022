import nfts from '../../../public/mock/nfts.json';
import Carousel from '../Carousel';

const MaybeLikeSection = () => {
  return (
    <div className="flex flex-col w-full mb-24 relative">
      <div className="z-20 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          {/*  eslint-disable-next-line react/no-unescaped-entities */}
          <span className="explore-page-title">Maybe you'll like it</span>
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

export default MaybeLikeSection;
