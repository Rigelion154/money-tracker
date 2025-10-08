import type { Dispatch, SetStateAction } from 'react';
import { Offcanvas } from 'react-bootstrap';

interface IBurgerMenuProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu = ({ visible, setVisible }: IBurgerMenuProps) => {
  return (
    <Offcanvas show={visible} onHide={() => setVisible(false)}>
      <h2>Sidebar</h2>
    </Offcanvas>
  );
};

export default BurgerMenu;