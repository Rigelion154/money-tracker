import { type Dispatch, type SetStateAction, useState } from 'react';
import { authStore } from '../../store/AuthStore.ts';
import BaseLoader from '../helpers/BaseLoader.tsx';
import { observer } from 'mobx-react-lite';
import { Button, Offcanvas } from 'react-bootstrap';

interface IUserMenuProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
const UserMenu = observer(({ visible, setVisible }: IUserMenuProps) => {
  const { userId } = authStore;
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await authStore.logoutUser();
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-white" style={{ zIndex: 150 }}>
        <BaseLoader />
      </div>
    );
  }

  return (
    <Offcanvas
      show={visible}
      onHide={() => setVisible(false)}
      placement="end"
      style={{ width: '250px' }}
      className="p-2"
    >
      <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-3">
        <h5 className="text-center">{userId}</h5>
        <Button variant="primary" onClick={handleLogout}>
          Выход
        </Button>
      </div>
    </Offcanvas>
  );
});

export default UserMenu;