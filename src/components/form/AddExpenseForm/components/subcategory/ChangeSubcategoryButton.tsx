import { useFormState } from 'react-final-form';
import { Button } from 'react-bootstrap';

import { modalStore } from '../../../../../store/ModalStore.ts';
import { EXPENSE_FORM_FIELDS } from '../../addExpenseform.constants.ts';

import ChangeSubcategoryModal from './ChangeSubcategoryModal.tsx';

const ChangeSubcategoryButton = () => {
  const state = useFormState();
  const categoryId = state.values?.[EXPENSE_FORM_FIELDS.CATEGORY_ID];
  const subcategoryId = state.values?.[EXPENSE_FORM_FIELDS.SUBCATEGORY_ID];
  const handleOpenAddSubcategoryModal = () =>
    modalStore.openModal({
      children: <ChangeSubcategoryModal {...{ categoryId, subcategoryId }} />,
    });

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
