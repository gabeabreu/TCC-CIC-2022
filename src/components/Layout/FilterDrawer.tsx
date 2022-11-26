import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import useScrollListener from '../../hooks/useScrollListener';

const FilterDrawer = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const scroll = useScrollListener();

  useEffect(() => {
    setHiddenHeader(false);

    if (scroll.y > 50 && scroll.y - scroll.lastY > 0) setHiddenHeader(true);
  }, [scroll.y, scroll.lastY]);

  return (
    <div
      className={`${
        isDrawerOpen ? '-translate-x-[3.5rem]' : '-translate-x-[30rem]'
      } pt-[4.55rem] z-40 fixed flex flex-col min-h-screen h-full bg-mds-gray-400 w-[20rem] duration-500`}
    >
      <div className="flex relative h-full w-full">
        <button
          className={`${isDrawerOpen ? 'rotate-180' : ''} absolute top-10 right-5 duration-500`}
          onClick={() => setIsDrawerOpen(false)}
        >
          <i className="fa-regular fa-xmark text-mds-white text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default FilterDrawer;
