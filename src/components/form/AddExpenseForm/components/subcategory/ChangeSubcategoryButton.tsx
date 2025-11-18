import { useFormState } from 'react-final-form';
import { Button } from 'react-bootstrap';

import type { IExpenseFormValues } from '../../../../../types/expenses.types.ts';

import { modalStore } from '../../../../../store/ModalStore.ts';

import ChangeSubcategoryModal from './ChangeSubcategoryModal.tsx';

const ChangeSubcategoryButton = () => {
  const { values } = useFormState<IExpenseFormValues>();
  const categoryId = values?.categoryId;
  const subcategoryId = values?.subcategoryId;
  const handleOpenAddSubcategoryModal = () => {
    if (categoryId) {
      modalStore.openModal({
        children: <ChangeSubcategoryModal {...{ categoryId, subcategoryId }} />,
      });
    }
  };

  return subcategoryId ? (
    <Button
      variant="warning"
      size="sm"
      className="rounded-circle py-1 px-2"
      onClick={handleOpenAddSubcategoryModal}
    >
      <i className="bi bi-pencil-fill fs-6"></i>
    </Button>
  ) : (
    <div />
  );
};

export default ChangeSubcategoryButton;
