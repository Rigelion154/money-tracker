import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';

const MainPage = () => {
  return (
    <>
      <Link
        to={ROUTES.ADD_TRANSACTION}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <Button variant="warning">Добавить расход</Button>
      </Link>
    </>
  );
};

export default MainPage;
