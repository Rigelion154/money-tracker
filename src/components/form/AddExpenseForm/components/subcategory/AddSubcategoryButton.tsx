import { useFormState } from 'react-final-form';
import { Button } from 'react-bootstrap';

import type { IExpenseFormValues } from '../../../../../types/expenses.types.ts';

import { modalStore } from '../../../../../store/ModalStore.ts';

import ChangeSubcategoryModal from './ChangeSubcategoryModal.tsx';

const AddSubcategoryButton = () => {
  const { values } = useFormState<IExpenseFormValues>();
  const categoryId = values?.categoryId;
  const handleOpenAddSubcategoryModal = () => {
    if (categoryId) {
      modalStore.openModal({
        children: <ChangeSubcategoryModal {...{ categoryId }} />,
      });
    }
  };

  return (
    categoryId && (
      <Button
        variant="warning"
        size="sm"
        className="rounded-circle py-1 px-2"
        onClick={handleOpenAddSubcategoryModal}
      >
        <i className="bi bi-plus text-dark fs-6"></i>
      </Button>
    )
  );
};

export default AddSubcategoryButton;
