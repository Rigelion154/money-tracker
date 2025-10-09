import { BsPersonCircle } from 'react-icons/bs';

import BurgerMenu from './BurgerMenu.tsx';
import { observer } from 'mobx-react-lite';
import { screenStore } from '../../store/ScreenStore.ts';
// import UserMenu from './menu/UserMenu.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';
import { useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';

// const AppMenu = lazy(() => import('./menu/AppMenu.tsx'));
// import AppBurger from "./AppBurger.tsx";

const Header = observer(() => {
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  // const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const navigate = useNavigate();

  const { isMobile } = screenStore;

  const handleClickUserMenu = () => {
    if (isMobile) {
      navigate(ROUTES.USER);
    } else {
      // setIsUserMenuVisible(true);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between bg-light px-3 w-100"
      style={{ height: '40px' }}
    >
      <RiMenu2Fill onClick={() => setIsBurgerVisible(true)} role="button" size={25} />
      <BsPersonCircle onClick={handleClickUserMenu} role="button" size={25} />
      <BurgerMenu visible={isBurgerVisible} setVisible={setIsBurgerVisible} />
      with menu && acc
      {/*{!isMobile && (*/}
      {/*  <Suspense>*/}
      {/*    <AppMenu*/}
      {/*      isVisible={isUserMenuVisible}*/}
      {/*      onHide={() => setIsUserMenuVisible(false)}*/}
      {/*      placement="end"*/}
      {/*    >*/}
      {/*      <UserMenu />*/}
      {/*    </AppMenu>*/}
      {/*  </Suspense>*/}
      {/*)}*/}
      {/*<AppBurger visible={isBurgerVisible} setVisible={setIsBurgerVisible} />*/}
    </div>
  );
});

export default Header;
