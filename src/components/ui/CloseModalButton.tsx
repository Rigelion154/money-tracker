import { Button } from 'react-bootstrap';
import { modalStore } from '../../store/ModalStore.ts';
import { GrClose } from 'react-icons/gr';

const CloseModalButton = () => {
  const closeHandler = () => modalStore.closeModal();
  return (
    <Button
      variant="outline-dark"
      className="border-0 rounded-1 p-2 d-inline-flex align-items-center justify-content-center"
      onClick={closeHandler}
    >
      <GrClose size={12} />
    </Button>
  );
};

export default CloseModalButton;