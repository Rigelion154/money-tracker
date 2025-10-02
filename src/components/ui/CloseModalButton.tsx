import { Button } from 'react-bootstrap';
import { modalStore } from '../../store/ModalStore.ts';

const CloseModalButton = () => {
  const closeHandler = () => modalStore.closeModal();
  return (
    <Button
      variant="outline-dark"
      className="border-0 py-1 px-2 rounded-1"
      onClick={closeHandler}
    >
      <i className="bi bi-x"></i>
    </Button>
  );
};

export default CloseModalButton;