import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.ts';
import { Button } from 'react-bootstrap';

import styles from './PeriodBar.module.css';

const buttonsList = [
  {
    id: 1,
    title: 'День',
    variant: 'primary',
    styles: 'rounded-0 border-end flex-fill w-25 py-2 fw-bold rounded-start-5',
  },
  {
    id: 2,
    title: 'Месяц',
    variant: 'primary',
    styles: 'rounded-0 border-end  flex-fill w-25 py-2 fw-bold',
  },
  {
    id: 3,
    title: 'Год',
    variant: 'primary',
    styles: 'rounded-0 border-end  flex-fill w-25 py-2 fw-bold',
  },
  {
    id: 4,
    title: 'Период',
    variant: 'primary',
    styles: 'rounded-0  flex-fill w-25 py-2 fw-bold rounded-end-5',
  },
];
const PeriodBar = () => {
  return (
    <div className={`${styles.bar__container} border-bottom`}>
      <div className={styles.add__button_container}>
        <Link to={ROUTES.ADD_TRANSACTION} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button variant="warning" className={styles.add__button}>
            <i className="bi bi-plus fs-4 text-dark"></i>
          </Button>
        </Link>
      </div>

      <div
        className="d-flex align-items-center justify-content-center w-100 position-relative"
        style={{ height: '40px' }}
      >
        {buttonsList.map((button) => (
          <Button key={button.id} variant={button.variant} className={button.styles}>
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PeriodBar;
