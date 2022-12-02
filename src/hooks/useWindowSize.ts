import { useEffect, useState } from 'react';
import { utils } from '../helpers';

interface Dimensions {
  width?: number;
  height?: number;
}

function useWindowSize(config?: { debounceTime?: number }) {
  const [windowSize, setWindowSize] = useState<Dimensions>({
    width: undefined,
    height: undefined,
  });

  const interval = config?.debounceTime ? config?.debounceTime : 100;

  const handleResize = utils.debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, interval);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
