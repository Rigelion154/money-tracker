import { BsPersonCircle } from 'react-icons/bs';

// import BurgerMenu from './BurgerMenu.tsx';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { screenStore } from '../../store/ScreenStore.ts';
import { Offcanvas } from 'react-bootstrap';
import UserMenu from './menu/UserMenu.tsx';
// import AppBurger from "./AppBurger.tsx";

const Header = observer(() => {
  // const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const { isMobile } = screenStore;
  console.log(isMobile);
  return (
    <div
      className="d-flex align-items-center justify-content-between bg-light px-3 w-100"
      style={{ height: '40px' }}
    >
      {/*<RiMenu2Fill onClick={() => setIsBurgerVisible(true)} role="button" size={25} />*/}
      <BsPersonCircle onClick={() => setIsUserMenuVisible(true)} role="button" size={25} />
      {/*<BurgerMenu visible={isBurgerVisible} setVisible={setIsBurgerVisible} />*/}
      {!isMobile && (
        <Offcanvas
          show={isUserMenuVisible}
          onHide={() => setIsUserMenuVisible(false)}
          placement="end"
          style={{ width: '250px' }}
          className="p-2"
        >
          <UserMenu />
        </Offcanvas>
      )}

      {/*<AppBurger visible={isBurgerVisible} setVisible={setIsBurgerVisible} />*/}
    </div>
  );
});

export default Header;
