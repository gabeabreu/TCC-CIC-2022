import React from 'react';

interface Props {
  title: string;
  link: string;
  showLink?: boolean;
  onClickLink?: () => void;
}

const EmptyState = ({ onClickLink, title, link, showLink }: Props) => (
  <div
    className={`flex p-4 flex-col items-center justify-center w-full rounded-md border-2 border-dashed border-mds-gray-300 py-20 bg-mds-gray-500 duration-500`}
  >
    <>
      <svg
        width="67"
        height="66"
        viewBox="0 0 67 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36.5868 23.1536L36.587 23.1538L40.3619 27.0446C40.7697 27.4651 41 28.0356 41 28.6387V41.25C41 42.5053 40.0136 43.5 38.8333 43.5H28.1667C26.9845 43.5 26 42.5055 26 41.25V24.75C26 23.4926 26.9843 22.5 28.1667 22.5H35.0625C35.6326 22.5 36.1789 22.7328 36.5868 23.1536ZM40 28.875V28.375H39.5H36.1667C35.7197 28.375 35.3333 27.999 35.3333 27.5V24.0625V23.5625H34.8333H28.1667C27.5078 23.5625 27 24.1086 27 24.75V41.25C27 41.8888 27.507 42.4375 28.1667 42.4375H38.8333C39.4905 42.4375 40 41.8897 40 41.25V28.875Z"
          fill="#2D2D2D"
          stroke="#626262"
        />
        <circle
          cx="33.5"
          cy="33"
          r="32"
          stroke="#626262"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 10"
        />
      </svg>

      <div className="flex mt-2 text-normal">
        <p className="pl-1 text-mds-gray-200">{title}</p>
      </div>
      {showLink && (
        <div
          className="flex text-mds-purple duration-500 hover:text-mds-white items-center cursor-pointer"
          onClick={onClickLink}
        >
          <i className="fa-solid fa-plus text-xl  mr-1" />
          <p className="mt-1 text-xl">{link}</p>
        </div>
      )}
    </>
  </div>
);

export default EmptyState;
