import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../helpers/BaseLoader.tsx';

const UserMenu = () => {
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
    <Dropdown
      // className="position-fixed top-0 end-0 me-4"
      className="ms-auto me-4"
      // style={{ zIndex: 50 }}
    >
      <Dropdown.Toggle variant="white" className="p-0 border-0">
        <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0">
        <Dropdown.Item onClick={handleLogout}>Выход</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;