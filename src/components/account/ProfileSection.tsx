import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReactS3Client from 'react-aws-s3-typescript';
import s3config from '../../config/awsConfig';

const ProfileSection = () => {
  const [formattedAddress, setFormattedAddress] = useState<string>();
  const address = '0x0DdBfcBF44c94f8D6391CB0E1A537672dCe29ADd';
  const s3 = new ReactS3Client(s3config);

  async function uploadProfilePicture(file: any) {
    try {
      const res = await s3.uploadFile(file);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setFormattedAddress(
      `${address?.substring(0, 5)}...${address?.substring(address.length - 4, address.length)}`
    );
  }, [address]);

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="overflow-hidden relative w-screen h-80">
        <Image
          src="/assets/account/banner.svg"
          layout="fill"
          objectFit="cover"
          alt="Background image"
        />
      </div>
      <div className="h-1 w-screen overflow-hidden bg-gradient-to-r from-[#8D32E6] to-[#5A0068] via-[#7319A7] " />
      <div className="absolute top-[13rem] flex flex-col items-center">
        <div className="overflow-hidden relative w-52 h-52 rounded-full">
          <Image
            src="/assets/account/profilePicture.svg"
            layout="fill"
            objectFit="cover"
            alt="Background image"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-32">
        <span className="font-semibold text-5xl text-mds-white">VitoAlmeida</span>
        <span className="font-semibold text-mds-white text-2xl mt-1">{formattedAddress}</span>
      </div>
    </div>
  );
};

export default ProfileSection;
