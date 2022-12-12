import verifiedUsers from '../../../public/mock/verifiedUsers.json';
import Carousel from '../Carousel';

const VerifiedSection = () => {
  return (
    <div className="flex flex-col w-full mb-24 relative">
      <div className="z-20 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <span className="explore-page-title">Verified users</span>
          <a href="https://www.youtube.com/" className="text-mds-cyan text-xl font-semibold">
            View more
            <i className="fa-solid fa-arrow-up-right-from-square ml-2" />
          </a>
        </div>
        <Carousel isSmall={false} data={verifiedUsers} />
      </div>
    </div>
  );
};

export default VerifiedSection;
