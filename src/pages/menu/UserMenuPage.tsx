import UserMenu from '../../components/layuot/menu/UserMenu.tsx';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';

const UserMenuPage = () => (
  <div className="d-flex flex-column w-100">
    <div>
      <Link to={ROUTES.MAIN} style={{ color: 'inherit', textDecoration: 'none' }}>
        <Button variant="warning" className="rounded-4 px-4">
          <i className="bi bi-arrow-left me-2"></i>
          Назад
        </Button>
      </Link>
    </div>
    <UserMenu />
  </div>
);

export default UserMenuPage;
