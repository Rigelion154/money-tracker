import type { Dispatch, SetStateAction } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

interface IBurgerMenuProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu = observer(({ visible, setVisible }: IBurgerMenuProps) => {
  return (
    <Offcanvas
      show={visible}
      onHide={() => setVisible(false)}
      style={{ width: '250px' }}
      className="p-2"
    >
      <h2>Sidebar</h2>
    </Offcanvas>
  );
});

export default BurgerMenu;