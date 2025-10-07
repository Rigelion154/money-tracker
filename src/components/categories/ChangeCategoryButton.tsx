import { Field } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { ADD_EXPENSE_FIELDS } from '../form/AddExpenseForm/addExpenseform.constants.ts';
import { modalStore } from '../../store/ModalStore.ts';
import CategoryModal from './CategoryModal.tsx';

const ChangeCategoryButton = () => {
  const handleOpenCategoryModal = (categoryId: string) =>
    modalStore.openModal({
      children: <CategoryModal {...{ categoryId }} />,
    });

  return (
    <Field name={ADD_EXPENSE_FIELDS.CATEGORY_ID}>
      {({ input }) =>
        input.value && (
          <Button
            variant="warning"
            size="sm"
            className="rounded-circle py-1 px-2"
            onClick={() => handleOpenCategoryModal(input.value)}
          >
            <i className="bi bi-pencil-fill fs-6"></i>
          </Button>
        )
      }
    </Field>
  );
};

export default ChangeCategoryButton;