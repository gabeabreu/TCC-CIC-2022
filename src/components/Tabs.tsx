import React from 'react';

interface Region {
  src: string;
  icon: string;
  label: string;
}

interface Props {
  data: Region[];
  current: string;
  onChange?: (value: string) => void;
}

const Tabs = ({ data, current, onChange }: Props) => (
  <div className="text-xl font-medium text-center text-mds-gray-100 border-b-4 border-mds-gray-300">
    <ul className="flex flex-wrap -mb-px">
      {data.map((region) => (
        <li
          key={region.label}
          className="mr-2 cursor-pointer"
          onClick={() => onChange?.(region.label)}
        >
          <a
            className={`${
              current === region.label ? 'text-mds-purple border-mds-purple' : 'border-transparent'
            } inline-block px-4 pb-2 -mb-[0.1rem] rounded-t-lg border-b-4 hover:text-mds-gray-100 hover:border-mds-white duration-500`}
          >
            <i className={`mr-2 text-base fa-solid ${region.icon}`} />

            {region.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Tabs;
