import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import type { Dispatch, SetStateAction } from 'react';

interface IBurgerMenuProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu = ({ visible, setVisible }: IBurgerMenuProps) => {
  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)}>
      <h2>Sidebar</h2>
      <Button>Test mobile touch</Button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </Sidebar>
  );
};

export default BurgerMenu;