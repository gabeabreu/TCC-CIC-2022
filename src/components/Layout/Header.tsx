import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import useScrollListener from '../../hooks/useScrollListener';

import { Popover, Transition } from '@headlessui/react';

import Input from '../Input';
import LoginModal from '../LoginModal';
import { useAccount, useDisconnect } from 'wagmi';

const solutions = [
  {
    name: 'Profile',
    href: '/account',
    icon: 'fa-user',
  },
  {
    name: 'Create',
    href: '/create',
    icon: 'fa-square-plus',
  },
  {
    name: 'Verfied',
    href: '/verified',
    icon: 'fa-badge-check',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: 'fa-gear',
  },
];

const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
  },
];

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const [hiddenHeader, setHiddenHeader] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const scroll = useScrollListener();

  async function fetchUser() {
    const userCheck = await fetch('http://localhost:8000/users/find', {
      method: 'POST',
      body: JSON.stringify({ address: address }),
    }).then((res) => res.json);
    console.log(userCheck);
  }

  useEffect(() => {
    setHiddenHeader(false);

    if (scroll.y > 50 && scroll.y - scroll.lastY > 0) setHiddenHeader(true);
  }, [scroll.y, scroll.lastY]);

  return (
    <>
      <LoginModal showModal={isLoginModalOpen} onCloseModal={() => setLoginModalOpen(false)} />
      {router?.pathname !== '/' ? (
        <Popover className="z-50 relative bg-white">
          <div className={` z-50 flex flex-col w-full lg:fixed bg-black duration-300`}>
            <header className="mx-auto flex py-2 min-w-[18.75rem] sm:min-w-[25.75rem] md:min-w-[37.375rem] md:px-0 lg:min-w-[53.375rem] xl:min-w-[70rem] 2xl:min-w-[85.5rem] justify-between duration-500">
              <Link passHref href="/">
                <span className="font-extrabold text-[2.2rem] text-mds-white cursor-pointer">
                  MIDAS
                </span>
              </Link>
              <div className="items-center hidden md:flex">
                <Link passHref href="/explore">
                  <a className="text-lg text-mds-gray-100 hover:text-mds-white duration-300 mr-5">
                    Explore
                  </a>
                </Link>
                <Link passHref href="/create">
                  <a className="text-lg text-mds-gray-100 hover:text-mds-white duration-300 mr-4">
                    Create
                  </a>
                </Link>
                <div className="hidden lg:flex">
                  <Input
                    placeholder="Search items, collections or accounts"
                    className="placeholder:text-sm rounded-full bg-mds-white w-[22.5rem] py-[0.35rem]"
                    icon={<i className="fa-solid fa-magnifying-glass text-[#c5c5c5]" />}
                  />
                </div>

                <div className="relative ml-4 h-[2.3rem] w-[2.5rem] rounded-full cursor-pointer">
                  <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                    <Popover className="relative">
                      {({ open, close }) => (
                        <>
                          <Popover.Button
                            className={
                              'group flex rounded-full ring-0 outline-none hover:ring-2 hover:ring-mds-purple duration-300'
                            }
                          >
                            <div className="h-[2.2rem] w-[2.2rem]">
                              <Image
                                src="/assets/user-avatar-white.svg"
                                alt="user-avatar"
                                layout="fill"
                              />
                            </div>
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="duration-200 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Popover.Panel
                              focus
                              className="absolute cursor-auto right-0 top-12 origin-top-right transform transition w-[20rem]"
                            >
                              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative px-6 pt-5 pb-6">
                                  <Popover.Button className="absolute top-5 right-6 outline-none">
                                    <i className="fa-solid fa-xmark text-mds-gray-200 text-2xl cursor-pointer" />
                                  </Popover.Button>
                                  {/* <div className="flex relative h-full w-full"></div> */}
                                  <div className="mt-2 mr-12">
                                    <nav className="grid gap-y-5">
                                      {solutions.map((item) => (
                                        <a
                                          key={item.name}
                                          href={item.href}
                                          className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                                        >
                                          <i
                                            className={`${item.icon} fa-solid text-mds-black text-2xl cursor-pointer`}
                                          />

                                          <span className="ml-3 text-base font-semibold text-mds-black">
                                            {item.name}
                                          </span>
                                        </a>
                                      ))}
                                    </nav>
                                  </div>
                                </div>
                                <div className="py-6 px-5">
                                  <div className="md:hidden mb-6 grid grid-cols-2 gap-y-4 gap-x-8">
                                    <a
                                      href="#"
                                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                                    >
                                      Pricing
                                    </a>

                                    <a
                                      href="#"
                                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                                    >
                                      Docs
                                    </a>
                                    {resources.map((item) => (
                                      <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                      >
                                        {item.name}
                                      </a>
                                    ))}
                                  </div>
                                  <div>
                                    <a
                                      href="#"
                                      className={`${
                                        address
                                          ? 'bg-mds-red hover:bg-mds-dark-red'
                                          : 'bg-mds-purple hover:bg-mds-dark-purple '
                                      } flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm duration-300`}
                                      onClick={() => {
                                        if (address) {
                                          disconnect();
                                        } else {
                                          close();
                                          setLoginModalOpen(true);
                                          // fetchUser();
                                        }
                                      }}
                                    >
                                      {t(address ? 'DISCONNECT' : 'CONNECT')}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </Popover.Group>
                </div>
              </div>
              <div className="md:hidden">
                <Popover.Button className="flex h-full items-center outline-none">
                  <i className="fa-solid fa-bars text-mds-white text-2xl cursor-pointer" />
                </Popover.Button>
              </div>
            </header>
            <div className="h-1 w-full bg-gradient-to-r from-[#8D32E6] to-[#5A0068] via-[#7319A7] " />
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center outline-none">
                        <i className="fa-solid fa-xmark text-mds-gray-300 text-2xl cursor-pointer" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                        >
                          {/* <item.icon
                            className="h-6 w-6 flex-shrink-0 text-indigo-600"
                            aria-hidden="true"
                          /> */}
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="space-y-6 py-6 px-5">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Pricing
                    </a>

                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Docs
                    </a>
                    {resources.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div>
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Sign up
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?{' '}
                      <a href="#" className="text-indigo-600 hover:text-indigo-500">
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      ) : (
        <header className="flex px-24 mt-11 items-center justify-between">
          <Link passHref href="/">
            <span className="font-extrabold text-4xl text-mds-white cursor-pointer">MIDAS</span>
          </Link>
          <div className="flex items-center">
            <Input
              placeholder="Search items, collections or accounts"
              className="rounded-full bg-mds-white w-[22.6rem]"
              icon={<i className="fa-solid fa-magnifying-glass text-[#c5c5c5]" />}
            />
            <Link passHref href="/account">
              <div className="relative ml-3 h-[3.5rem] w-[3.5rem] rounded-full cursor-pointer">
                <Image src="/assets/user-avatar.svg" alt="user-avatar" layout="fill" />
              </div>
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
