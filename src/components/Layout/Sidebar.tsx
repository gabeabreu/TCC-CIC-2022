import { useEffect, useState } from 'react';
import useScrollListener from '../../hooks/useScrollListener';

const Sidebar = ({ setIsDrawerOpen }: any) => {
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const scroll = useScrollListener();

  useEffect(() => {
    setHiddenHeader(false);

    if (scroll.y > 50 && scroll.y - scroll.lastY > 0) setHiddenHeader(true);
  }, [scroll.y, scroll.lastY]);

  return (
    <div className={`pt-[4.55rem] bg-mds-gray-400 flex fixed px-4 h-screen z-40 duration-500`}>
      <i
        onClick={() => setIsDrawerOpen(true)}
        className="mt-10 fa-solid fa-filter text-mds-white text-2xl cursor-pointer"
      />
    </div>
  );
};

export default Sidebar;
