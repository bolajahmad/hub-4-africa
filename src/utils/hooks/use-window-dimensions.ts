import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export function getWindowDimensions() {
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<ReturnType<typeof getWindowDimensions>>(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', debounce(handleResize, 500));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
