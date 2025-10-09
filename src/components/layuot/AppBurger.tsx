import styles from './AppBurger.module.scss';
import type { Dispatch, SetStateAction } from 'react';

interface IUserMenuProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const AppBurger = ({ visible, setVisible }: IUserMenuProps) => {
  // if (!visible) {
  //   return null;
  // }

  return (
    <>
      <div
        onClick={() => setVisible(false)}
        className={`${styles.burger__layout} ${visible ? styles.burger__layout_open : ''}`}
      />
      <div
        className={`${styles.burger__container} ${visible ? styles.burger__container_open : ''}`}
      >
        BURGER
      </div>
    </>
  );
};

export default AppBurger;
