import Image from 'next/image';
import { useEffect, useState } from 'react';
import { storage } from '../../../config/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAccount } from 'wagmi';
import { useSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { setUserData } from '@/redux/user/actions';
import Modal from '../../Modal';
import { Form, Formik } from 'formik';
import InputFormik from '../../InputFormik';
import formSchema from './formSchema';
import Button from '@/components/Button';

const ProfileSection = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { address, status } = useAccount();
  const [formattedAddress, setFormattedAddress] = useState<string>();
  const [isCopied, setIsCopied] = useState(false);
  const [isTrulyConnected, setIsTrulyConnected] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const initialValues: any = {
    name: status === 'connected' ? user.data.name : '',
    bio: status === 'connected' ? user.data.bio : '',
    instagram: status === 'connected' ? user.data.instagram : '',
    twitter: status === 'connected' ? user.data.twitter : '',
    website: status === 'connected' ? user.data.website : '',
    discord: status === 'connected' ? user.data.discord : '',
  };

  useEffect(() => {
    if (address) {
      setIsTrulyConnected(true);
      setFormattedAddress(
        `${address?.substring(0, 5)}...${address?.substring(address.length - 6, address.length)}`
      );
    } else {
      setIsTrulyConnected(false);
    }
  }, [address]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(address || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  async function fetchUser() {
    const user = await fetch(
      `/api/users/login?` +
        new URLSearchParams({
          address: address || '',
        })
    ).then((res) => res.json());
    dispatch(setUserData(user));
    return user;
  }

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
          ).then((res) => {
            res.json();
            fetchUser();
          });
        });
      }
    );
  }

  function handleSubmmitBannerPic(value: any) {
    const storageRef = ref(storage, `bannerPics/${value.name}`);
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
                bannerPictureUrl: downloadURL,
              })
          ).then((res) => {
            res.json();
            fetchUser();
          });
        });
      }
    );
  }

  async function handleSubmitSettings(values: any) {
    await fetch(
      `/api/users/update?` +
        new URLSearchParams({
          address: address || '',
          name: values.name,
          bio: values.bio,
          instagram: values.instagram,
          twitter: values.twitter,
          website: values.website,
          discord: values.discord,
        })
    ).then(() => {
      fetchUser();
    });
    setIsSettingsOpen(false);
  }

  return (
    <>
      <Modal
        title="Profile Settings"
        showModal={isSettingsOpen}
        onCloseModal={() => setIsSettingsOpen(false)}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmitSettings({ ...values })}
          {...formSchema}
        >
          <Form>
            <InputFormik required name="name" label="Name" />
            <InputFormik name="bio" label="Bio" textArea rows={7} />
            <div className="grid grid-cols-2 gap-x-12">
              <InputFormik name="instagram" label="Instagram" />
              <InputFormik name="twitter" label="twitter" />
              <InputFormik name="website" label="website" />
              <InputFormik name="discord" label="discord" />
            </div>
            <div className="flex w-full">
              <Button
                type="submit"
                className="bg-mds-purple hover:bg-mds-dark-purple w-[15rem] ml-auto rounded-md mt-10"
              >
                <span>Save</span>
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal>

      <div className="relative flex flex-col w-full">
        <div className="overflow-hidden relative w-screen h-[25rem]">
          <div className="z-30 absolute cursor-pointer right-4 bottom-2">
            <label
              htmlFor="bannerPic"
              className="bg-[#000000aa] px-2 py-1 flex items-center justify-center rounded-xl"
            >
              <i className="fa-light fa-pen-to-square text-white text-2xl ml-[0.1rem] mb-[0.1rem]" />
            </label>
            <input
              accept="image/*"
              id="bannerPic"
              className="hidden"
              type="file"
              onChange={(e) => handleSubmmitBannerPic(e.target.files?.[0])}
            />
          </div>
          <Image
            src={
              address
                ? user.data.bannerPictureUrl || '/assets/accountPage/banner.svg'
                : '/assets/accountPage/banner.svg'
            }
            layout="fill"
            objectFit="cover"
            alt="Background image"
          />
        </div>
        <div className="h-1 w-screen overflow-hidden bg-gradient-to-r from-[#8D32E6] to-[#5A0068] via-[#7319A7] " />
        <div className="flex flex-col mx-auto w-[18.75rem] sm:w-[25.75rem] md:w-[37.375rem] md:px-0 lg:w-[53.375rem] xl:w-[70rem] 2xl:w-[85rem] z-10 duration-500">
          <div className="absolute top-[14.8rem] shadow-xl">
            <div className="overflow-hidden relative w-52 h-52 rounded-3xl border-[0.5rem] border-mds-gray-300">
              <div className="z-30 absolute cursor-pointer right-2 bottom-2">
                <label
                  htmlFor="profilePic"
                  className="bg-[#000000aa] px-2 py-1 flex items-center justify-center rounded-xl"
                >
                  <i className="fa-light fa-pen-to-square text-white text-xl ml-[0.1rem] mb-[0.1rem]" />
                </label>
                <input
                  accept="image/*"
                  id="profilePic"
                  className="hidden"
                  type="file"
                  onChange={(e) => handleSubmmitProfilePic(e.target.files?.[0])}
                />
              </div>
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
          <div className="flex mt-20 justify-between ">
            <div>
              <div className="flex items-center gap-x-3">
                <span className="font-semibold text-4xl text-mds-white">
                  {isTrulyConnected ? user.data.name || 'Unnamed' : 'Connect your wallet'}
                </span>
                {isTrulyConnected && user.data.isVerified && (
                  <div className="relative -mb-1">
                    <i className="fa-solid fa-certificate text-mds-purple text-3xl" />
                    <i className="fa-solid fa-check text-mds-black text-xl absolute left-[0.33rem] top-[0.28rem]" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-x-5 items-center">
              <a
                target="blank"
                href={
                  address ? user.data.discord || 'https://discord.com/' : 'https://discord.com/'
                }
              >
                <i className="fa-brands fa-discord text-mds-white text-2xl cursor-pointer" />
              </a>
              <a
                target="blank"
                href={
                  address
                    ? user.data.website || 'https://www.google.com.br/'
                    : 'https://www.google.com.br/'
                }
              >
                <i className="fa-sharp fa-solid fa-globe text-mds-white text-2xl cursor-pointer" />
              </a>
              <a
                target="blank"
                href={
                  address
                    ? user.data.twitter || 'https://twitter.com/home'
                    : 'https://twitter.com/home'
                }
              >
                <i className="fa-brands fa-twitter text-mds-white text-2xl cursor-pointer" />
              </a>
              <a
                target="blank"
                href={
                  address
                    ? user.data.instagram || 'https://www.instagram.com/'
                    : 'https://www.instagram.com/'
                }
              >
                <i className="fa-brands fa-instagram text-mds-white text-2xl cursor-pointer" />
              </a>
              <div className="w-px bg-mds-gray-200 h-2/4" />
              <i
                className="fa-solid fa-gear text-mds-white text-2xl cursor-pointer"
                onClick={() => setIsSettingsOpen(true)}
              />
            </div>
          </div>
          {isTrulyConnected && (
            <div className="flex items-center gap-x-2">
              <span
                className={`font-semibold text-xl mt-1 duration-300 ${
                  isCopied ? 'text-mds-purple' : 'text-mds-gray-100'
                }`}
              >
                {formattedAddress}
              </span>
              <i
                onClick={() => handleCopyText()}
                className={`fa-solid fa-copy text-lg cursor-pointer duration-300 ${
                  isCopied ? 'text-mds-purple' : 'text-mds-gray-100'
                }`}
              />
            </div>
          )}
          <p className="font-medium text-lg text-mds-gray-200 max-w-full mt-4">
            {status === 'connected' ? user.data.bio : ''}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
