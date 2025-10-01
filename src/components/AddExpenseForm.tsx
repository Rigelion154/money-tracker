import { Field, Form, FormSpy } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { CurrencyInput } from 'react-currency-input-field';
import { observer } from 'mobx-react-lite';

import { dbClient } from '../db/dbClient.ts';
import { authStore } from '../store/AuthStore.ts';
import { toasterStore } from '../store/ToasterStore.ts';

import ErrorBar from './helpers/ErrorBar.tsx';
import CategoryList from './categories/CategoryList.tsx';
import SubcategoryList from './categories/SubcategoryList.tsx';
import { validateRequired } from '../utils/validateRequired.ts';
import { modalStore } from '../store/ModalStore.ts';
import AddSubcategoryModal from './categories/AddSubcategoryModal.tsx';

const AddExpenseForm = observer(() => {
  const { userId } = authStore;

  const handleFormSubmit = async (
    values: Record<string, string>,
    form: Record<string, any>,
  ) => {
    const { error, data } = await dbClient
      .from('expenses')
      .upsert({
        category_id: values.category,
        subcategory_id: values?.subcategory,
        amount: parseFloat(values.amount.replace(',', '.')),
        user_id: userId,
      })
      .select();

    if (data) {
      toasterStore.addToast('Сумма успешно добавлена', 'success');
      form.reset();
    }

    if (error) {
      toasterStore.addToast('Ошибка добавления суммы', 'error');
      return { submitError: error.message };
    }
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center mt-3 gap-3 flex-grow-1"
          >
            <h3 className="fw-bold text-primary">Выбор категории</h3>
            <CategoryList />
            <div className="d-flex">
              <h3 className="fw-bold text-primary me-2">Выбор подкатегории</h3>
              <Button
                variant="warning"
                size="sm"
                className="rounded-circle py-1 px-2"
                onClick={() =>
                  modalStore.openModal({ children: <AddSubcategoryModal /> })
                }
              >
                <i className="bi bi-plus text-dark fs-5"></i>
              </Button>
            </div>
            <Field name="category">
              {({ input }) => <SubcategoryList {...{ ...input }} />}
            </Field>

            <div className="d-flex flex-column align-items-center gap-3 mt-auto">
              <h3 className="fw-bold text-primary">Сумма</h3>
              <Field name="amount" validate={validateRequired}>
                {({ input }) => (
                  <CurrencyInput
                    name={input.name}
                    value={input.value}
                    onValueChange={(value) => input.onChange(value)}
                    className="rounded-1 px-2 py-1 border border-primary"
                    placeholder="Введите сумму"
                    decimalsLimit={2}
                    suffix=" ₽"
                    style={{ fontSize: '1.2rem', outlineColor: '#0d6efd' }}
                    autoComplete="off"
                  />
                )}
              </Field>

              <FormSpy>
                {({ errors }) => (
                  <Button
                    type="submit"
                    variant="outline-success"
                    size="lg"
                    disabled={!!Object.values(errors ?? {}).length}
                  >
                    Добавить
                  </Button>
                )}
              </FormSpy>
              <ErrorBar name="submitError" />
            </div>
            {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
          </form>
        )}
      </Form>
    </>
  );
});

export default AddExpenseForm;
