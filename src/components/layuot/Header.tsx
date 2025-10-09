import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BsPersonCircle } from 'react-icons/bs';
import { RiMenu2Fill } from 'react-icons/ri';

import BurgerMenu from './menu/BurgerMenu.tsx';
import UserMenu from './menu/UserMenu.tsx';

const Header = observer(() => {
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  return (
    <div
      className="d-flex align-items-center justify-content-between bg-light px-3 w-100"
      style={{ height: '40px' }}
    >
      <RiMenu2Fill onClick={() => setIsBurgerVisible(true)} role="button" size={25} />
      <BsPersonCircle onClick={() => setIsUserMenuVisible(true)} role="button" size={25} />

      <BurgerMenu visible={isBurgerVisible} setVisible={setIsBurgerVisible} />
      <UserMenu visible={isUserMenuVisible} setVisible={setIsUserMenuVisible} />
    </div>
  );
});

export default Header;
