import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';
import { FormControl, FormLabel, InputGroup } from 'react-bootstrap';

import { modalStore } from '../../../../../store/ModalStore.ts';
import { appToaster } from '../../../../../store/AppToaster.ts';
import { categoriesStore } from '../../../../../store/CategoriesStore.ts';
import { subcategoriesStore } from '../../../../../store/SubcategoriesStore.ts';

import CloseModalButton from '../../../../ui/CloseModalButton.tsx';
import SubmitModalButtons from '../../../../ui/SubmitModalButtons.tsx';
import BaseLoader from '../../../../helpers/BaseLoader.tsx';

interface AddSubcategoryProps {
  categoryId: string;
  subcategoryId?: string;
  setSubcategory: (value?: string) => void;
}

const ChangeSubcategoryModal = observer(
  ({ categoryId, subcategoryId, setSubcategory }: AddSubcategoryProps) => {
    const { categories } = categoriesStore;
    const { subcategoriesById } = subcategoriesStore;
    const [isLoading, setIsLoading] = useState(false);
    const subcategoryTitle = subcategoriesById?.[subcategoryId ?? '']?.title;

    const handleFormSubmit = async (values: Record<string, string>) => {
      if (!values.subcategoryTitle) {
        return appToaster.addToast('Необходимо ввести название', 'warning');
      }

      const title = values.subcategoryTitle;
      const isExist = await subcategoriesStore.isSubcategoryExist(categoryId, title, subcategoryId);

      if (isExist) return appToaster.addToast('Категория с таким именем уже существует', 'warning');

      if (!isExist) {
        setIsLoading(true);
        const { data } = await subcategoriesStore.upsertSubcategory(
          categoryId,
          title,
          subcategoryId,
        );

        if (data) {
          await subcategoriesStore.getSubcategories();
          setSubcategory(data[0].id);
        }

        setIsLoading(false);
        modalStore.closeModal();
      }
    };

    const handleDeleteSubcategory = async () => {
      setIsLoading(true);

      const { data } = await subcategoriesStore.deleteSubcategory(subcategoryId);

      if (data) await subcategoriesStore.getSubcategories();

      setSubcategory();
      setIsLoading(false);
      modalStore.closeModal();
    };

    return (
      <>
        {isLoading && <BaseLoader variant="light" />}
        {!isLoading && (
          <div className="subcategory__modal modal__content">
            <div className="d-flex gap-2 justify-content-between mb-3">
              <h4 className="mb-0" style={{ lineHeight: '26px' }}>
                {subcategoryId ? 'Изменить' : 'Добавить'} подкатегорию
              </h4>
              <CloseModalButton />
            </div>

            <Form onSubmit={handleFormSubmit} initialValues={{ subcategoryTitle }}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
                  <div>
                    <FormLabel className="me-2 mb-0">Категория:</FormLabel>
                    <span
                      className="px-3 py-1 rounded-4 text-white"
                      style={{ backgroundColor: categories?.[categoryId].color }}
                    >
                      {categories?.[categoryId].title}
                    </span>
                  </div>

                  <Field name="subcategoryTitle">
                    {({ input }) => (
                      <InputGroup>
                        <FormControl
                          placeholder="Веедите название"
                          className="shadow-none border-primary"
                          {...input}
                        />
                        <InputGroup.Text className="border-primary">
                          <i className="bi bi-pencil-fill"></i>
                        </InputGroup.Text>
                      </InputGroup>
                    )}
                  </Field>

                  <SubmitModalButtons
                    id={subcategoryId}
                    handler={handleDeleteSubcategory}
                    title={`подкатегории "${subcategoryTitle}"`}
                  />
                </form>
              )}
            </Form>
          </div>
        )}
      </>
    );
  },
);

export default ChangeSubcategoryModal;
