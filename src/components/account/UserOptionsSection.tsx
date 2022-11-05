import Image from 'next/image';
import { useEffect, useState } from 'react';

const UserOptionsSection = () => {
  const [formattedAddress, setFormattedAddress] = useState<string>();
  const address = '0x0DdBfcBF44c94f8D6391CB0E1A537672dCe29ADd';

  useEffect(() => {
    setFormattedAddress(
      `${address?.substring(0, 5)}...${address?.substring(address.length - 4, address.length)}`
    );
  }, [address]);

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="grid grid-cols-4 gap-x-28">
        <div className="bg-mds-white p-14 rounded-3xl flex justify-center items-center">
          <i className="fa-solid fa-hexagon-vertical-nft text-mds-black text-8xl"></i>
        </div>
        <div className="bg-mds-white p-14 rounded-3xl flex justify-center items-center">
          <i className="fa-solid fa-cards-blank text-mds-black text-8xl"></i>
        </div>
        <div className="bg-mds-white p-14 rounded-3xl flex justify-center items-center">
          <i className="fa-solid fa-timeline-arrow text-mds-black text-8xl"></i>
        </div>
        <div className="bg-mds-white p-14 rounded-3xl flex justify-center items-center">
          <i className="fa-solid fa-gear text-mds-black text-8xl"></i>
        </div>
      </div>
    </div>
  );
};

export default UserOptionsSection;
