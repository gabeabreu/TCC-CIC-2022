import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const FilterDrawer = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  return (
    <div
      className={`z-[999999] relative bg-mds-gray-400 w-1/5 duration-500 ${
        isDrawerOpen ? '-translate-x-[3.5rem]' : '-translate-x-[30rem]'
      }`}
    >
      <button
        className={`right-5 top-3 absolute duration-500 ${isDrawerOpen ? 'rotate-180' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <i className="fa-regular fa-xmark text-mds-white text-4xl" />
      </button>
    </div>
  );
};

export default FilterDrawer;
