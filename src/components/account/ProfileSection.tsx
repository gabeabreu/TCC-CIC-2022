import Image from 'next/image';
import { useEffect, useState } from 'react';
import { storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAccount } from 'wagmi';
import { useSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';

const ProfileSection = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { address, status } = useAccount();
  const [formattedAddress, setFormattedAddress] = useState<string>();
  const [isCopied, setIsCopied] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setFormattedAddress(
      `${address?.substring(0, 5)}...${address?.substring(address.length - 6, address.length)}`
    );
  }, [address]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(address || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  function handleSubmmitProfilePic(value: any) {
    const storageRef = ref(storage, `profilePics/${value.name}`);
    const uploadTask = uploadBytesResumable(storageRef, value);
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
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log(downloadURL);
          await fetch(
            `/api/users/update?` +
              new URLSearchParams({
                address: address || '',
                profilePictureUrl: downloadURL,
              })
          ).then((res) => res.json());
        });
      }
    );
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
        <label
          htmlFor="profilePic"
          className="bg-[#000000aa] px-2 py-1 flex items-center justify-center rounded-xl"
        >
          <i className="fa-light fa-pen-to-square text-white" />
        </label>
        <input
          id="profilePic"
          className="hidden"
          type="file"
          onChange={(e) => handleSubmmitProfilePic(e.target.files?.[0])}
        />
        <div className="overflow-hidden relative w-52 h-52 rounded-3xl border-[0.5rem] border-mds-gray-300">
          <Image
            src={
              address
                ? user.data.profilePictureUrl || '/assets/accountPage/profilePicture.svg'
                : '/assets/accountPage/profilePicture.svg'
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
          {status === 'connected' && (
            <div className="flex items-center gap-x-2">
              <span
                className={`font-semibold text-2xl mt-1 duration-300 ${
                  isCopied ? 'text-mds-purple' : 'text-mds-gray-100'
                }`}
              >
                {formattedAddress}
              </span>
              <i
                onClick={() => handleCopyText()}
                className={`fa-solid fa-copy text-xl cursor-pointer duration-300 ${
                  isCopied ? 'text-mds-purple' : 'text-mds-gray-100'
                }`}
              />
            </div>
          )}
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
