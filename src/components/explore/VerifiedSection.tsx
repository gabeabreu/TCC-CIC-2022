import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import Carousel from '../Carousel';

const VerifiedSection = () => {
  const [verified, setVerified] = useState();

  async function getVerified() {
    const { data }: AxiosResponse = await axios.get('/api/users/verified');
    setVerified(data);
  }

  useEffect(() => {
    getVerified();
  }, []);

  console.log(verified);

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
        {verified && <Carousel isSmall={false} data={verified} />}
      </div>
    </div>
  );
};

export default VerifiedSection;
