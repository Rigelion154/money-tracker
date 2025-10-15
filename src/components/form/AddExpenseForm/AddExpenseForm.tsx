import { useEffect, useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';
import { CurrencyInput } from 'react-currency-input-field';
import moment from 'moment';

import { authStore } from '../../../store/AuthStore.ts';
import { appToaster } from '../../../store/AppToaster.ts';
import { expensesStore } from '../../../store/ExpensesStore.ts';
import { categoriesStore } from '../../../store/CategoriesStore.ts';
import { ADD_EXPENSE_FIELDS } from './addExpenseform.constants.ts';

import BaseLoader from '../../helpers/BaseLoader.tsx';
import CategoryList from '../../categories/CategoryList.tsx';
import SubcategoryList from '../../subcategories/SubcategoryList.tsx';
import ChangeSubcategoryButton from '../../subcategories/ChangeSubcategoryButton.tsx';
import AddSubcategoryButton from '../../subcategories/AddSubcategoryButton.tsx';
import AddCategoryButton from '../../categories/AddCategoryButton.tsx';
import ChangeCategoryButton from '../../categories/ChangeCategoryButton.tsx';
import AppDatepicker from '../../ui/AppDatepicker.tsx';
import PrevPageButton from '../../ui/PrevPageButton.tsx';

const AddExpenseForm = observer(() => {
  const { userId } = authStore;
  const { categories } = categoriesStore;
  const { addExpense } = expensesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoriesStore.getCategories(userId ?? '').finally(() => setIsLoading(false));
  }, [userId]);

  const handleFormSubmit = async (values: Record<string, string>, form: Record<string, any>) => {
    if (!values[ADD_EXPENSE_FIELDS.CATEGORY_ID]) {
      return appToaster.addToast('Необходимо выбрать категорию', 'warning');
    }

    if (!values[ADD_EXPENSE_FIELDS.AMOUNT]) {
      return appToaster.addToast('Необходимо внести сумму', 'warning');
    }

    setIsLoading(true);

    const { error, data } = await addExpense(
      userId,
      values[ADD_EXPENSE_FIELDS.CATEGORY_ID],
      values[ADD_EXPENSE_FIELDS.AMOUNT],
      values[ADD_EXPENSE_FIELDS.SUBCATEGORY_ID],
      values[ADD_EXPENSE_FIELDS.DATE],
    );

    if (error) appToaster.addToast('Ошибка добавления суммы', 'error');

    if (data) {
      appToaster.addToast('Сумма успешно добавлена', 'success');
      form.reset();
    }

    setIsLoading(false);
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      {isLoading && <BaseLoader />}
      {!isLoading && categories && (
        <>
          <div>
            <PrevPageButton />
          </div>

          <Form onSubmit={handleFormSubmit}>
            {({ handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center mt-3 gap-3 flex-grow-1 pb-5"
              >
                <h3 className="fw-bold text-primary mb-0">Сумма</h3>
                <div className="d-flex align-items-center gap-2">
                  <Field name={ADD_EXPENSE_FIELDS.AMOUNT}>
                    {({ input }) => (
                      <InputGroup className="border-primary">
                        <CurrencyInput
                          name={input.name}
                          value={input.value}
                          onValueChange={(value) => input.onChange(value)}
                          className="rounded-start-2 rounded-end-0 px-2 py-1 border border-success"
                          decimalsLimit={2}
                          suffix=" ₽"
                          style={{ fontSize: '1.2rem', outlineColor: '#0d6efd' }}
                          autoComplete="off"
                        />
                        <InputGroup.Text className="border-success py-0 px-2">
                          <i className="bi bi-coin text-success fs-4"></i>
                        </InputGroup.Text>
                      </InputGroup>
                    )}
                  </Field>

                  <Field name={ADD_EXPENSE_FIELDS.DATE}>
                    {({ input }) => <AppDatepicker {...input} />}
                  </Field>
                </div>

                <Field name={ADD_EXPENSE_FIELDS.DATE}>
                  {({ input }) =>
                    input.value && (
                      <span className="text-center fw-bold fs__small text-success">
                        Дата: {moment(input.value).format('DD MMMM YYYY HH:mm')}
                      </span>
                    )
                  }
                </Field>

                <div className="d-grid gap-3" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                  <div>
                    <ChangeCategoryButton />
                  </div>
                  <h3 className="fw-bold text-primary">Категории</h3>
                  <div>
                    <AddCategoryButton />
                  </div>
                </div>

                <CategoryList />

                <div className="d-grid gap-3" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                  <div>
                    <ChangeSubcategoryButton />
                  </div>

                  <h3 className="fw-bold text-primary">Подкатегории</h3>

                  <div>
                    <AddSubcategoryButton />
                  </div>
                </div>

                <SubcategoryList />

                <Button
                  type="submit"
                  variant="outline-success"
                  className="position-fixed start-50 bottom-0 translate-middle-x mb-2 rounded-4 px-5 text-success"
                  style={{
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  Добавить
                </Button>
              </form>
            )}
          </Form>
        </>
      )}
    </div>
  );
});

export default AddExpenseForm;
