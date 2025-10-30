import { type Dispatch, type SetStateAction } from 'react';
import { FormControl, Offcanvas } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../../store/AuthStore.ts';

interface IBurgerMenuProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu = observer(({ visible, setVisible }: IBurgerMenuProps) => {
  const { subcategoryLimit } = authStore;

  return (
    <Offcanvas
      show={visible}
      onHide={() => setVisible(false)}
      style={{ width: '250px' }}
      className="p-2"
    >
      <h2>Sidebar</h2>

      <small className="text-muted fw-bold">Сумма для объединения в подкатегории</small>
      <FormControl
        type="number"
        className="shadow-none"
        value={subcategoryLimit?.toString()}
        onChange={(e) => authStore.setSubcategoryLimit(Number(e.target.value))}
      />
    </Offcanvas>
  );
});

export default BurgerMenu;