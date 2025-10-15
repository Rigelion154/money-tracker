import { Field } from 'react-final-form';
import { Button } from 'react-bootstrap';

import { modalStore } from '../../store/ModalStore.ts';
import { ADD_EXPENSE_FIELDS } from '../form/AddExpenseForm/addExpenseform.constants.ts';

import ChangeSubcategoryModal from './ChangeSubcategoryModal.tsx';

const AddSubcategoryButton = () => {
  const handleOpenAddSubcategoryModal = (value: string) =>
    modalStore.openModal({
      children: <ChangeSubcategoryModal categoryId={value} />,
    });

  return (
    <Field name={ADD_EXPENSE_FIELDS.CATEGORY_ID}>
      {({ input }) =>
        input.value && (
          <Button
            variant="warning"
            size="sm"
            className="rounded-circle py-1 px-2"
            onClick={() => handleOpenAddSubcategoryModal(input.value)}
          >
            <i className="bi bi-plus text-dark fs-6"></i>
          </Button>
        )
      }
    </Field>
  );
};

export default AddSubcategoryButton;
