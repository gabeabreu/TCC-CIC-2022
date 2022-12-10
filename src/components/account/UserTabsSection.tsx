import Image from 'next/image';
import { useState } from 'react';

const UserTabsSection = () => {
  const [tabsState, setTabsState] = useState<string>('collections');

  function handleTabsChange(value: string) {
    setTabsState(value);
  }

  return (
    <div className="relative flex flex-col justify-center mt-32 ml-56 pr-48">
      <div className="flex flex-row gap-x-10">
        <div
          onClick={() => handleTabsChange('collections')}
          className={`flex items-center justify-center gap-x-2 relative cursor-pointer duration-300 ${
            tabsState === 'collections' ? 'text-mds-purple' : 'text-mds-gray-100'
          }`}
        >
          <i className="fa-cards-blank fa-solid" />
          <span className="text-xl">Collections</span>
          <div
            className={`absolute h-1 flex w-[10rem] -bottom-1 duration-300 ${
              tabsState === 'collections' ? 'bg-mds-purple' : 'bg-mds-gray-300'
            }`}
          />
        </div>
        <div
          onClick={() => handleTabsChange('activity')}
          className={`flex items-center justify-center gap-x-2 relative cursor-pointer duration-300 ${
            tabsState !== 'collections' ? 'text-mds-purple' : 'text-mds-gray-100'
          }`}
        >
          <i className="fa-arrows-rotate fa-solid" />
          <span className="text-xl">Activity</span>
          <div
            className={`absolute h-1 flex w-[10rem] -bottom-1 duration-300 ${
              tabsState !== 'collections' ? 'bg-mds-purple' : 'bg-mds-gray-300'
            }`}
          />
        </div>
      </div>
      <div className="h-1 bg-mds-gray-300 w-full" />
    </div>
  );
};

export default UserTabsSection;
