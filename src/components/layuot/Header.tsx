// import { BsPersonCircle } from 'react-icons/bs';
// import BurgerMenu from './BurgerMenu';
// import UserMenu from './UserMenu.tsx';
import {useRef} from 'react';
import {Menu} from 'primereact/menu';
import {Button} from 'primereact/button';
import {RiMenu2Fill} from 'react-icons/ri';

const Header = () => {
  // const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const menuLeft = useRef(null);
  const items = [
    {
      label: 'Options',
      items: [
        { label: 'New', icon: 'pi pi-plus' },
        { label: 'Search', icon: 'pi pi-search' },
      ],
    },
  ];
  // const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  return (
    <div
      className="d-flex align-items-center justify-content-between bg-light px-3 w-100"
      style={{ height: '40px' }}
    >
      {/*<RiMenu2Fill onClick={() => setIsBurgerVisible(true)} role="button" size={25} />*/}
      {/*<BsPersonCircle onClick={() => setIsUserMenuVisible(true)} role="button" size={25} />*/}
      {/*<BurgerMenu visible={isBurgerVisible} setVisible={setIsBurgerVisible} />*/}
      {/*<UserMenu visible={isUserMenuVisible} setVisible={setIsUserMenuVisible} />*/}
      {/*<AppBurger visible={isBurgerVisible} setVisible={setIsBurgerVisible} />*/}
      <Menu
        model={items}
        popup
        ref={menuLeft}
        id="popup_menu_left"
        className="h-100 top-0 start-0"
        style={{width:'300px'}}
      />
      <Button
        icon="pi pi-align-left"
        className="bg-transparent border-0 shadow-0 text-dark"
  // @ts-ignore
        onClick={(event) => menuLeft.current && menuLeft.current.toggle(event)}
        aria-controls="popup_menu_left"
        aria-haspopup
      >
        <RiMenu2Fill role="button" size={25} />
      </Button>
    </div>
  );
};

export default Header;
