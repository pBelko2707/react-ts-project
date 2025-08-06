import { useEffect, useState } from 'react';
import { MOBILE, TABLET } from '../styles/breakpoints';

const useIsDevice = (): {
  isMobile: boolean;
  isTablet: boolean;
} => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < MOBILE || window.innerWidth === MOBILE);
      setIsTablet(window.innerWidth < TABLET || window.innerWidth === TABLET);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return { isMobile, isTablet };
};

export default useIsDevice;
