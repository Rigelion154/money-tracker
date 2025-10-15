import { Button } from 'react-bootstrap';
import { modalStore } from '../../store/ModalStore.ts';
import { GrClose } from 'react-icons/gr';

const CloseModalButton = () => {
  const closeHandler = () => modalStore.closeModal();
  return (
    <Button
      variant="dark"
      className="rounded-circle p-2 d-inline-flex align-items-center justify-content-center position-absolute"
      style={{ top: '-13px', right: '-13px' }}
      onClick={closeHandler}
    >
      <GrClose size={12} />
    </Button>
  );
};

export default CloseModalButton;