// import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BsPersonCircle } from 'react-icons/bs';
import { RiMenu2Fill } from 'react-icons/ri';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';

// import BurgerMenu from './menu/BurgerMenu.tsx';
import UserMenu from './menu/UserMenu.tsx';

const Header = observer(() => {
  // const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  // const { userId } = authStore;
  // const [isLoading, setIsLoading] = useState(false);
  // const handleLogout = async () => {
  //   setIsLoading(true);
  //   await authStore.logoutUser();
  //   setIsLoading(false);
  // };

  // if (isLoading) {
  //   return (
  //     <div className="position-fixed top-0 start-0 w-100 h-100 bg-white" style={{ zIndex: 150 }}>
  //       <BaseLoader />
  //     </div>
  //   );
  // }

  return (
    <div
      className="d-flex align-items-center justify-content-between bg-light px-3 w-100"
      style={{ height: '40px' }}
    >
      <Dropdown drop="end">
        <Dropdown.Toggle variant="outline-dark" className="border-0 rounded-1">
          <RiMenu2Fill size={25} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Графики</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/*<Dropdown drop="start">*/}
      {/*  <Dropdown.Toggle variant="outline-dark" className="border-0 rounded-1">*/}
      {/*    <BsPersonCircle size={25} />*/}
      {/*  </Dropdown.Toggle>*/}
      {/*  <Dropdown.Menu>*/}
      {/*    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 gap-3">*/}
      {/*      <h5 className="text-center">{userId}</h5>*/}
      {/*      <Button variant="primary" onClick={handleLogout}>*/}
      {/*        Выход*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </Dropdown.Menu>*/}
      {/*</Dropdown>*/}
      <BsPersonCircle size={25} onClick={() => setIsUserMenuVisible(true)} />
      {/*<BurgerMenu visible={isBurgerVisible} setVisible={setIsBurgerVisible} />*/}
      <UserMenu visible={isUserMenuVisible} setVisible={setIsUserMenuVisible} />
    </div>
  );
});

export default Header;
