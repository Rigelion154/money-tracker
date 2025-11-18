import { observer } from 'mobx-react-lite';
import { useFormState } from 'react-final-form';
import { Button } from 'react-bootstrap';

import { modalStore } from '../../../../../store/ModalStore.ts';
import { categoriesStore } from '../../../../../store/CategoriesStore.ts';
import { EXPENSE_FORM_FIELDS } from '../../addExpenseform.constants.ts';

import ChangeCategoryModal from './ChangeCategoryModal.tsx';

const ChangeCategoryButton = observer(() => {
  const { categories } = categoriesStore;
  const state = useFormState();
  const categoryId = state.values?.[EXPENSE_FORM_FIELDS.CATEGORY_ID];
  const isDefaultCategory = categories?.[categoryId]?.is_default;

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