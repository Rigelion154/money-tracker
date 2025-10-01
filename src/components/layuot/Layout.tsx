import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import UserMenu from './UserMenu.tsx';
import { observer } from 'mobx-react-lite';
import { modalStore } from '../../store/ModalStore.ts';
import { toJS } from 'mobx';

const Layout = observer(() => {
  const { modalList } = modalStore;
  console.log(toJS(modalList));
  return (
    <div
      className="d-flex flex-column position-relative"
      style={{ minHeight: '100vh' }}
    >
      <Header />
      <UserMenu />
      <div className="container-fluid d-flex flex-grow-1 p-3">
        <Outlet />
      </div>
      {/*<ModalList />*/}
    </div>
  );
});

export default Layout;
