import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../helpers/BaseLoader.tsx';
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
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-white"
        style={{ zIndex: 150 }}
      >
        <BaseLoader />
      </div>
    );
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="white" className="p-0 border-0">
        <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0">
        <div
          className="text-nowrap px-2 text-primary"
          style={{ fontSize: '.8rem' }}
        >
          {userId}
        </div>
        <Dropdown.Item onClick={handleLogout}>Выход</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default UserMenu;
