import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import UserMenu from './UserMenu.tsx';

const Layout = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <UserMenu />
      <div className="container-fluid p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
