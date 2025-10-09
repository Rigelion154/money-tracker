import { Button } from 'react-bootstrap';
import { authStore } from '../../../store/AuthStore.ts';
import { useState } from 'react';
import BaseLoader from '../../helpers/BaseLoader.tsx';
import { observer } from 'mobx-react-lite';

const UserMenu = observer(() => {
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
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 gap-3">
      <h5 className="text-center">{userId}</h5>
      <Button variant="primary" onClick={handleLogout}>
        Выход
      </Button>
    </div>
  );
});

export default UserMenu;