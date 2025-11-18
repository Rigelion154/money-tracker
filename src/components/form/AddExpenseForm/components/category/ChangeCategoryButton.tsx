import { observer } from 'mobx-react-lite';
import { useFormState } from 'react-final-form';
import { Button } from 'react-bootstrap';

import type { IExpenseFormValues } from '../../../../../types/expenses.types.ts';

import { modalStore } from '../../../../../store/ModalStore.ts';
import { categoriesStore } from '../../../../../store/CategoriesStore.ts';

import ChangeCategoryModal from './ChangeCategoryModal.tsx';

const ChangeCategoryButton = observer(() => {
  const { categories } = categoriesStore;
  const { values } = useFormState<IExpenseFormValues>();
  const categoryId = values?.categoryId;
  const isDefaultCategory = categoryId && categories?.[categoryId]?.is_default;

  const handleOpenCategoryModal = () =>
    modalStore.openModal({
      children: <ChangeCategoryModal {...{ categoryId }} />,
    });

  return categoryId && !isDefaultCategory ? (
    <Button
      variant="warning"
      size="sm"
      className="rounded-circle py-1 px-2"
      onClick={handleOpenCategoryModal}
    >
      <i className="bi bi-pencil-fill fs-6"></i>
    </Button>
  ) : (
    <div />
  );
});

export default ChangeCategoryButton;