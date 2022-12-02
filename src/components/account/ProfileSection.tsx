import Image from 'next/image';
import { useEffect, useState } from 'react';
import { storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAccount } from 'wagmi';

const ProfileSection = () => {
  const { address } = useAccount();
  const [formattedAddress, setFormattedAddress] = useState<string>();
  const [pic, setPic] = useState<any>();
  const [isCopied, setIsCopied] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setFormattedAddress(
      `${address?.substring(0, 5)}...${address?.substring(address.length - 4, address.length)}`
    );
  }, [address]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(address || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  function handleSubmmit() {
    const storageRef = ref(storage, `files/${pic[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, pic[0]);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          console.log(typeof downloadURL);
        });
      }
    );
    console.log(pic[0]);
  }

  return (
    <div className="relative flex flex-col w-full">
      <div className="overflow-hidden relative w-screen h-[35rem]">
        <Image
          src="/assets/accountPage/banner.svg"
          layout="fill"
          objectFit="cover"
          alt="Background image"
        />
      </div>
      <div className="h-1 w-screen overflow-hidden bg-gradient-to-r from-[#8D32E6] to-[#5A0068] via-[#7319A7] " />
      <div className="absolute top-[28.5rem] left-56 shadow-xl">
        {/* <input type="file" onChange={(e) => setPic(e.target.files)} />
        <button
          type="button"
          onClick={handleSubmmit}
          className="text-red-600 text-xl font-bold bg-white"
        >
          upload
        </button> */}
        <div className="overflow-hidden relative w-52 h-52 rounded-3xl border-[0.5rem] border-mds-gray-300">
          <Image
            // src="/assets/accountPage/profilePicture.svg"
            src={
              address
                ? 'https://firebasestorage.googleapis.com/v0/b/midas-dd47f.appspot.com/o/files%2FScreen%20Shot%202022-11-25%20at%2012.22.02%20(2).png?alt=media&token=1230cd70-9c7e-4312-b5b7-29d589fc0f39'
                : '/assets/user-avatar.svg'
            }
            layout="fill"
            objectFit="cover"
            alt="Background image"
          />
        </div>
      </div>
      <div className="flex mt-32 ml-56 justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <span className="font-semibold text-[2.625rem] text-mds-white">Nome placeholder</span>
            <div className="relative -mb-1">
              <i className="fa-solid fa-certificate text-mds-purple text-3xl" />
              <i className="fa-solid fa-check text-mds-black text-xl absolute left-[0.33rem] top-[0.28rem]" />
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="font-semibold text-mds-gray-100 text-2xl mt-1">
              {address ? formattedAddress : ''}
            </span>
            <i
              onClick={() => handleCopyText()}
              className={`fa-solid fa-copy text-xl cursor-pointer duration-300 ${
                isCopied ? 'text-mds-purple' : 'text-mds-gray-100'
              }`}
            />
          </div>
        </div>
        <div className="flex gap-x-5 mr-48">
          <a>
            <i className="fa-brands fa-discord text-mds-white text-4xl cursor-pointer" />
          </a>
          <a>
            <i className="fa-sharp fa-solid fa-globe text-mds-white text-4xl cursor-pointer" />
          </a>
          <a>
            <i className="fa-brands fa-twitter text-mds-white text-4xl cursor-pointer" />
          </a>
          <a>
            <i className="fa-brands fa-instagram text-mds-white text-4xl cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
