import { makeAutoObservable } from 'mobx';

export const MIDDLE_SCREEN = 1200;

export const VIEW_DESKTOP = 'desktop';
export const VIEW_MOBILE = 'mobile_closed';

type TScreenType = 'desktop' | 'mobile_closed';

class ScreenStore {
  screenType: TScreenType;
  isMobile: boolean = false;
  isDesktop: boolean = false;
  constructor() {
    makeAutoObservable(this);
    this.screenType = this.getTypeOfScreen(window.innerWidth);
    this.isMobile = this.screenType === VIEW_MOBILE;
    this.isDesktop = this.screenType === VIEW_DESKTOP;
  }

  getTypeOfScreen = (width: number) => {
    if (width >= MIDDLE_SCREEN) {
      return VIEW_DESKTOP;
    }

    return VIEW_MOBILE;
  };

  setScreenType(value: TScreenType) {
    this.screenType = value;
    this.isMobile = this.screenType === VIEW_MOBILE;
    this.isDesktop = this.screenType === VIEW_DESKTOP;
  }
}

export const screenStore = new ScreenStore();