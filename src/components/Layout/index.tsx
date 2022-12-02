import Header from './Header';
import Footer from './Footer';
import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import FilterDrawer from './FilterDrawer';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="z-20 mx-auto w-full relative">
      <Header />
      <div className="flex">
        {router.pathname === '/explore' && <Sidebar setIsDrawerOpen={setIsDrawerOpen} />}
        {router.pathname !== '/' && router.pathname !== '/account' && (
          <FilterDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        )}
        {router.pathname !== '/' && (
          <div className="z-30 pt-[4.5rem] mx-auto flex flex-col px-5 duration-500 min-w-[18.75rem] sm:min-w-[25.75rem] md:min-w-[37.375rem] md:px-0 lg:min-w-[53.375rem] xl:min-w-[70rem] 2xl:min-w-[85.5rem]">
            {children}
          </div>
        )}
        {router.pathname === '/' && (
          <div className="z-30 mx-auto flex flex-col px-5 duration-500 min-w-[18.75rem] sm:min-w-[25.75rem] md:min-w-[37.375rem] md:px-0 lg:min-w-[53.375rem] xl:min-w-[70rem] 2xl:min-w-[85.5rem]">
            {children}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
