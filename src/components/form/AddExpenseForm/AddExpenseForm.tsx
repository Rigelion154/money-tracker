import { Button, InputGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';
import { CurrencyInput } from 'react-currency-input-field';

import { authStore } from '../../../store/AuthStore.ts';
import { appToaster } from '../../../store/AppToaster.ts';
import { categoriesStore } from '../../../store/CategoriesStore.ts';

import CategoryList from '../../categories/CategoryList.tsx';
import SubcategoryList from '../../categories/SubcategoryList.tsx';
import { ADD_EXPENSE_FIELDS } from './addExpenseform.constants.ts';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.ts';
import { useEffect, useState } from 'react';
import BaseLoader from '../../helpers/BaseLoader.tsx';
import ChangeSubcategoryButton from '../../categories/ChangeSubcategoryButton.tsx';
import AddSubcategoryButton from '../../categories/AddSubcategoryButton.tsx';

const AddExpenseForm = observer(() => {
  const { userId } = authStore;
  const { addExpense, categories } = categoriesStore;
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
            <Link to={ROUTES.MAIN} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button variant="warning" className="rounded-2 px-3">
                <i className="bi bi-arrow-left me-2"></i>
                Назад
              </Button>
            </Link>
          </div>

          <Form onSubmit={handleFormSubmit}>
            {({ handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center mt-3 gap-2 flex-grow-1 pb-5"
              >
                <div className="d-flex flex-column align-items-center gap-2">
                  <h3 className="fw-bold text-primary mb-0">Сумма</h3>

                  <Field name={ADD_EXPENSE_FIELDS.AMOUNT}>
                    {({ input }) => (
                      <InputGroup className="border-primary">
                        <CurrencyInput
                          name={input.name}
                          value={input.value}
                          onValueChange={(value) => input.onChange(value)}
                          className="rounded-start-2 rounded-end-0 px-2 py-1 border border-success"
                          // placeholder="Введите сумму"
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
                </div>

                <h3 className="fw-bold text-primary mb-0">Категории</h3>
                <CategoryList />

                <div
                  className="d-flex align-items-center justify-content-between gap-2"
                  style={{ minHeight: '35px' }}
                >
                  <div style={{ width: '35px' }}>
                    <ChangeSubcategoryButton />
                  </div>
                  <h3 className="fw-bold text-primary mb-0">Подкатегории</h3>
                  <div style={{ width: '35px' }}>
                    <AddSubcategoryButton />
                  </div>
                </div>

                <SubcategoryList />

                <Button
                  type="submit"
                  variant="outline-success"
                  className="position-fixed start-50 bottom-0 translate-middle-x mb-2 rounded-3 px-5 text-success"
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
