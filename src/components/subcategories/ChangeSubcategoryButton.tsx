import { FormSpy } from 'react-final-form';
import { Button } from 'react-bootstrap';

import { modalStore } from '../../store/ModalStore.ts';
import { ADD_EXPENSE_FIELDS } from '../form/AddExpenseForm/addExpenseform.constants.ts';

import ChangeSubcategoryModal from './ChangeSubcategoryModal.tsx';

const ChangeSubcategoryButton = () => {
  const handleOpenAddSubcategoryModal = (categoryId: string, subcategoryId: string) =>
    modalStore.openModal({
      children: <ChangeSubcategoryModal {...{ categoryId, subcategoryId }} />,
    });

  return (
    <FormSpy>
      {({ values }) =>
        values &&
        values.subcategoryId && (
          <Button
            variant="warning"
            size="sm"
            className="rounded-circle py-1 px-2"
            onClick={() =>
              handleOpenAddSubcategoryModal(
                values[ADD_EXPENSE_FIELDS.CATEGORY_ID],
                values[ADD_EXPENSE_FIELDS.SUBCATEGORY_ID],
              )
            }
          >
            <i className="bi bi-pencil-fill fs-6"></i>
          </Button>
        )
      }
    </FormSpy>
  );
};

export default ChangeSubcategoryButton;
