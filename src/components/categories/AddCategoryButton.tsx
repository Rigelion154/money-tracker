import { Button } from 'react-bootstrap';

import { modalStore } from '../../store/ModalStore.ts';

import ChangeCategoryModal from './ChangeCategoryModal.tsx';

const AddCategoryButton = () => {
  const handleOpenAddSubcategoryModal = () =>
    modalStore.openModal({
      children: <ChangeCategoryModal />,
    });

  return (
    <Button
      variant="warning"
      size="sm"
      className="rounded-circle py-1 px-2"
      onClick={handleOpenAddSubcategoryModal}
    >
      <i className="bi bi-plus text-dark fs-6"></i>
    </Button>
  );
};

export default AddCategoryButton;