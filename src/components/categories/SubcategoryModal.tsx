import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';
import { Button, FormControl, FormLabel } from 'react-bootstrap';

import { authStore } from '../../store/AuthStore.ts';
import { modalStore } from '../../store/ModalStore.ts';
import { appToaster } from '../../store/AppToaster.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { subcategoriesStore } from '../../store/SubcategoriesStore.ts';

import CloseModalButton from '../ui/CloseModalButton.tsx';

import styles from './Categories.module.css';

interface AddSubcategoryProps {
  categoryId: string;
  subcategoryId?: string;
}

const SubcategoryModal = observer(({ categoryId, subcategoryId }: AddSubcategoryProps) => {
  const { userId } = authStore;
  const { categories } = categoriesStore;
  const { currentSubcategoryList } = subcategoriesStore;
  const subcategoryTitle = subcategoryId
    ? currentSubcategoryList.find((subcategory) => subcategory.id === subcategoryId)?.title
    : '';

  const handleFormSubmit = async (values: Record<string, string>) => {
    if (!values.subcategoryTitle)
      return appToaster.addToast('Необходимо ввести название', 'warning');

    const isExist = await subcategoriesStore.isSubcategoryExist(
      userId,
      categoryId,
      values.subcategoryTitle,
      subcategoryId,
    );

    if (isExist) return appToaster.addToast('Категория с таким именем уже существует', 'warning');

    if (!isExist) {
      const { data, error } = await subcategoriesStore.upsertSubcategory(
        userId,
        categoryId,
        values.subcategoryTitle,
        subcategoryId,
      );

      if (data) {
        appToaster.addToast(
          `Подкатегория успешно ${subcategoryId ? 'изменена' : 'создана'}`,
          'success',
        );
        modalStore.closeModal();
      }
      if (error) appToaster.addToast('Ошибка создания подкатегории', 'error');
    }
  };

  const handleDeleteSubcategory = async () => {
    const { data, error } = await subcategoriesStore.deleteSubcategory(subcategoryId);

    if (error) appToaster.addToast('Ошибка удаления подкатегории', 'error');

    if (data) {
      appToaster.addToast('Подкатегория удалена', 'success');
      modalStore.closeModal();
    }
  };

  return (
    <div className={`${styles.add__subcategory_modal__wrapper} modal__content`}>
      <div className="d-flex gap-2 justify-content-between mb-3">
        <h4 className="mb-0" style={{ lineHeight: '26px' }}>
          {subcategoryId ? 'Изменить' : 'Добавить'} подкатегорию
        </h4>
        <CloseModalButton />
      </div>

      <Form onSubmit={handleFormSubmit} initialValues={{ subcategoryTitle }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div>
              <FormLabel className="fw-bold me-2 mb-0">Категория:</FormLabel>
              <span
                className="px-2 py-1 rounded-1"
                style={{
                  color: 'white',
                  backgroundColor: categories?.data[categoryId].color,
                }}
              >
                {categories?.data[categoryId].title}
              </span>
            </div>

            <Field name="subcategoryTitle">
              {({ input }) => (
                <FormControl
                  placeholder="Веедите название"
                  className="rounded-1 shadow-none"
                  {...input}
                />
              )}
            </Field>

            <div className="d-flex gap-2 justify-content-between">
              <Button variant="success" className="rounded-1" type="submit">
                Принять
              </Button>
              <div className="d-flex gap-2">
                <Button variant="danger" className="rounded-1" onClick={handleDeleteSubcategory}>
                  Удалить
                </Button>
                <Button variant="secondary" className="rounded-1" onClick={modalStore.closeModal}>
                  Отменить
                </Button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
});

export default SubcategoryModal;
