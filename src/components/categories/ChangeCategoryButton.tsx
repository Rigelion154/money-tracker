import { observer } from 'mobx-react-lite';
import { Field } from 'react-final-form';
import { Button } from 'react-bootstrap';

import { modalStore } from '../../store/ModalStore.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { ADD_EXPENSE_FIELDS } from '../form/AddExpenseForm/addExpenseform.constants.ts';

import ChangeCategoryModal from './ChangeCategoryModal.tsx';

const ChangeCategoryButton = observer(() => {
  const { v2_categories } = categoriesStore;
  const handleOpenCategoryModal = (categoryId: string) =>
    modalStore.openModal({
      children: <ChangeCategoryModal {...{ categoryId }} />,
    });

  return (
    <Field name={ADD_EXPENSE_FIELDS.CATEGORY_ID}>
      {({ input }) => {
        const isDefaultCategory = v2_categories?.[input.value]?.is_default;

        return input.value && !isDefaultCategory ? (
          <Button
            variant="warning"
            size="sm"
            className="rounded-circle py-1 px-2"
            onClick={() => handleOpenCategoryModal(input.value)}
          >
            <i className="bi bi-pencil-fill fs-6"></i>
          </Button>
        ) : (
          <div />
        );
      }}
    </Field>
  );
});

export default ChangeCategoryButton;