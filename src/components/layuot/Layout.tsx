import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import { observer } from 'mobx-react-lite';
import ModalList from '../helpers/AppModal/ModalList.tsx';

const Layout = observer(() => {
  return (
    <div className="d-flex flex-column position-relative" style={{ minHeight: '100vh' }}>
      <Header />
      <div className="d-flex flex-grow-1 p-2">
        <Outlet />
      </div>
      <ModalList />
    </div>
  );
});

export default Layout;
