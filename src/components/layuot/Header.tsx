import UserMenu from './UserMenu.tsx';

const Header = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-between bg-light px-3 w-100"
      style={{ height: '40px' }}
    >
      <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
      <UserMenu />
    </div>
  );
};

export default Header;
