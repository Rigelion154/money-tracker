import { Sidebar } from 'primereact/sidebar';
import type { Dispatch, SetStateAction } from 'react';

interface IBurgerMenuProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu = ({ visible, setVisible }: IBurgerMenuProps) => {
  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)} showCloseIcon={false}>
      <h2>Sidebar</h2>
    </Sidebar>
  );
};

export default BurgerMenu;