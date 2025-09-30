import { Field, Form } from 'react-final-form';
import { Button } from 'react-bootstrap';

import CategoryList from './CategoryList.tsx';
import { dbClient } from '../db/dbClient.ts';
import { observer } from 'mobx-react-lite';
import { authStore } from '../store/AuthStore.ts';
import { CurrencyInput } from 'react-currency-input-field';
import ErrorBar from './helpers/ErrorBar.tsx';
import { toasterStore } from '../store/ToasterStore.ts';

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
            className="d-flex flex-column align-items-center mt-3 gap-3"
          >
            <h3 className="fw-bold text-primary">Выбор категории</h3>
            <CategoryList />
            {/*<CustomCategoriesList />*/}

            <h3 className="fw-bold text-primary">Сумма</h3>
            <Field name="amount">
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

            <Button type="submit" variant="outline-success" size="lg">
              Добавить
            </Button>
            <ErrorBar name="submitError" />
          </form>
        )}
      </Form>
    </>
  );
});

export default AddExpenseForm;
