import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';

const MainPage = () => {
  return (
    <div className="text-start rounded-1">
      MainPage
      <Link
        to={ROUTES.ADD_TRANSACTION}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <Button variant="warning">Добавить расход</Button>
      </Link>
    </div>
  );
};

export default MainPage;
