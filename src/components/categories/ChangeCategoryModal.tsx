import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';
import { FormControl, InputGroup } from 'react-bootstrap';

import { modalStore } from '../../store/ModalStore.ts';
import { appToaster } from '../../store/AppToaster.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import CloseModalButton from '../ui/CloseModalButton.tsx';
import SubmitModalButtons from '../ui/SubmitModalButtons.tsx';

interface ICategoryModalProps {
  categoryId?: string;
}

interface IFormValues {
  categoryTitle: string;
  categoryColor: string;
  categoryIcon: string;
}

const ChangeCategoryModal = observer(({ categoryId }: ICategoryModalProps) => {
  const { userId } = authStore;
  const { v2_categories } = categoriesStore;
  const categoryTitle = categoryId ? v2_categories?.[categoryId]?.title : '';
  const categoryColor = categoryId ? v2_categories?.[categoryId]?.color : '';
  const categoryIcon = categoryId ? v2_categories?.[categoryId]?.icon : '';
  const handleFormSubmit = async (values: IFormValues) => {
    if (!values.categoryTitle) {
      return appToaster.addToast('Необходимо ввести название', 'warning');
    }

    if (!values.categoryColor) {
      return appToaster.addToast('Необходимо добавить цвет', 'warning');
    }

    if (!values.categoryIcon) {
      return appToaster.addToast('Необходимо добавить иконку', 'warning');
    }

    const isExist = await categoriesStore.isCategoryExist(userId, values.categoryTitle, categoryId);

    if (isExist) return appToaster.addToast('Категория с таким именем уже существует', 'warning');

    if (!isExist) {
      const { data, error } = await categoriesStore.upsertCategory(
        userId,
        values.categoryTitle,
        values.categoryColor,
        values.categoryIcon,
        categoryId,
      );

      if (data) {
        appToaster.addToast(`Категория успешно ${categoryId ? 'изменена' : 'создана'}`, 'success');
        await categoriesStore.getCategories(userId);
        modalStore.closeModal();
      }
      if (error) appToaster.addToast('Ошибка создания категории', 'error');
    }
  };

  const handleDeleteCategory = async () => {
    const { data, error } = await categoriesStore.deleteCategory(categoryId);

    if (error) appToaster.addToast('Ошибка удаления категории', 'error');

    if (data) {
      appToaster.addToast('Категория удалена', 'success');
      await categoriesStore.getCategories(userId);
      modalStore.closeModal();
    }
  };

  return (
    <div className="modal__content category__modal">
      <div className="d-flex gap-2 justify-content-between mb-3">
        <h5 className="mb-0" style={{ lineHeight: '26px' }}>
          {categoryId ? 'Изменить' : 'Добавить'} категорию
        </h5>
        <CloseModalButton />
      </div>

      <Form
        onSubmit={handleFormSubmit}
        initialValues={{
          categoryColor: categoryColor ?? '#ffffff',
          categoryTitle: categoryTitle,
          categoryIcon: categoryIcon,
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Field name="categoryTitle">
              {({ input }) => (
                <InputGroup>
                  <InputGroup.Text className="border-primary text-primary">
                    Название
                  </InputGroup.Text>
                  <FormControl
                    placeholder="Веедите название"
                    className="shadow-none border-primary"
                    {...input}
                  />
                  <InputGroup.Text className="border-primary text-primary">
                    <i className="bi bi-pencil-fill"></i>
                  </InputGroup.Text>
                </InputGroup>
              )}
            </Field>

            <Field name="categoryColor">
              {({ input }) => (
                <InputGroup>
                  <InputGroup.Text className="border-primary text-primary">Цвет</InputGroup.Text>
                  <FormControl type="color" className="shadow-none border-primary" {...input} />
                  <InputGroup.Text className="border-primary">
                    <i className="bi bi-palette text-primary"></i>
                  </InputGroup.Text>
                </InputGroup>
              )}
            </Field>

            <Field name="categoryIcon">
              {({ input }) => (
                <InputGroup>
                  <InputGroup.Text className="border-primary text-primary">Иконка</InputGroup.Text>
                  <FormControl
                    placeholder="Веедите название"
                    className="shadow-none border-primary"
                    {...input}
                  />
                  <InputGroup.Text className="border-primary">
                    <a
                      href="https://icons.getbootstrap.com/"
                      target="_blank"
                      className="text-decoration-none"
                    >
                      <i className="bi bi-browser-chrome text-primary"></i>
                    </a>
                  </InputGroup.Text>
                </InputGroup>
              )}
            </Field>

            <SubmitModalButtons
              id={categoryId}
              handler={handleDeleteCategory}
              title={`категории "${categoryTitle}"`}
            />
          </form>
        )}
      </Form>
    </div>
  );
});

export default ChangeCategoryModal;
