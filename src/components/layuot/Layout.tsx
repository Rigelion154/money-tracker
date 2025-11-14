import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import Header from './Header.tsx';
import ModalList from '../helpers/AppModal/ModalList.tsx';

import styles from './Layout.module.scss';

const Layout = observer(() => {
  return (
    <div className={styles.layout}>
      <Header />
      <ModalList />
      <Outlet />
    </div>
  );
});

export default Layout;
