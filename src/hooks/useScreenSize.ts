import { screenStore } from '../store/ScreenStore.ts';
import { useCallback, useEffect } from 'react';

export const useScreenSize = () => {
  const { screenType } = screenStore;

  const changeTypeOfScreen = useCallback(
    (evt: Event) => {
      const width = (evt.target as Window).innerWidth;
      const typeOfScreen = screenStore.getTypeOfScreen(width);

      if (screenType !== typeOfScreen) {
        screenStore.setScreenType(typeOfScreen);
      }
    },
    [screenType],
  );

  useEffect(() => {
    window.addEventListener('resize', changeTypeOfScreen);
    return () => {
      window.removeEventListener('resize', changeTypeOfScreen);
    };
  }, [changeTypeOfScreen]);
};