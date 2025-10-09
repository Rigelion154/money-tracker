import React from 'react';
import { Offcanvas } from 'react-bootstrap';

interface IAppMenuProps {
  isVisible: boolean;
  onHide: () => void;
  children: React.ReactNode;
  placement?: 'start' | 'end' | 'top' | 'bottom';
}

const AppMenu = ({ isVisible, onHide, placement, children }: IAppMenuProps) => (
  <Offcanvas
    show={isVisible}
    onHide={onHide}
    placement={placement}
    style={{ width: '250px' }}
    className="p-2"
  >
    {children}
  </Offcanvas>
);

export default AppMenu;