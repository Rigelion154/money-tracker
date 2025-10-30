import { observer } from 'mobx-react-lite';
import { BsPersonCircle } from 'react-icons/bs';
import { RiMenu2Fill } from 'react-icons/ri';
import { useState } from 'react';

import UserMenu from './menu/UserMenu.tsx';
import BurgerMenu from './menu/BurgerMenu.tsx';

const Header = observer(() => {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isBurgerMenuVisible, setIsBurgerMenuVisible] = useState(false);

  return (
    <div
      className="d-flex align-items-center justify-content-between bg-light px-3 w-100"
      style={{ height: '40px' }}
    >
      <RiMenu2Fill size={25} onClick={() => setIsBurgerMenuVisible(true)} role="button" />
      <BsPersonCircle size={25} onClick={() => setIsUserMenuVisible(true)} role="button" />
      <UserMenu visible={isUserMenuVisible} setVisible={setIsUserMenuVisible} />
      <BurgerMenu visible={isBurgerMenuVisible} setVisible={setIsBurgerMenuVisible} />
    </div>
  );
});

export default Header;
