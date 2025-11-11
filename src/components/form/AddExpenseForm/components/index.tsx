import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';
import { Button, InputGroup } from 'react-bootstrap';
import { CurrencyInput } from 'react-currency-input-field';

import { appToaster } from '../../../../store/AppToaster.ts';
import { expensesStore } from '../../../../store/ExpensesStore.ts';
import { categoriesStore } from '../../../../store/CategoriesStore.ts';
import { ADD_EXPENSE_FIELDS } from '../addExpenseform.constants.ts';

import ChangeCategoryButton from '../../../categories/ChangeCategoryButton.tsx';
import AddCategoryButton from '../../../categories/AddCategoryButton.tsx';
import CategoryItem from '../../../categories/CategoryItem.tsx';
import ChangeSubcategoryButton from '../../../subcategories/ChangeSubcategoryButton.tsx';
import AddSubcategoryButton from '../../../subcategories/AddSubcategoryButton.tsx';
import SubcategoryItem from '../../../subcategories/SubcategoryItem.tsx';
// import AppDatepicker from '../../../ui/AppDatepicker.tsx';
import styles from '../../../categories/Categories.module.css';
import AppCalendar from '../../../helpers/AppCalendar/AppCalendar.tsx';

interface IWrapperProps {
  children: React.ReactNode;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormWrapper = observer(({ children, setIsLoading }: IWrapperProps) => {
  const { formDate } = expensesStore;

  const handleFormSubmit = async (values: Record<string, string>) => {
    if (!values[ADD_EXPENSE_FIELDS.CATEGORY_ID]) {
      return appToaster.addToast('Необходимо выбрать категорию', 'warning');
    }

    if (!values[ADD_EXPENSE_FIELDS.AMOUNT]) {
      return appToaster.addToast('Необходимо внести сумму', 'warning');
    }

    setIsLoading(true);

    await expensesStore.addExpense(
      values[ADD_EXPENSE_FIELDS.CATEGORY_ID],
      values[ADD_EXPENSE_FIELDS.AMOUNT],
      values[ADD_EXPENSE_FIELDS.SUBCATEGORY_ID],
      formDate ?? undefined,
    );

    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center mt-3 gap-3 flex-grow-1 pb-5"
        >
          {children}
        </form>
      )}
    </Form>
  );
});

const CategoryButtons = () => (
  <div className="d-grid gap-3 align-items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
    <ChangeCategoryButton />

    <h3 className="fw-bold text-primary">Категории</h3>

    <AddCategoryButton />
  </div>
);

const CategoryList = observer(() => {
  const { categories } = categoriesStore;

  return (
    <div className={styles.categories__container}>
      <Field name={ADD_EXPENSE_FIELDS.CATEGORY_ID}>
        {({ input }) => (
          <>
            {Object.values(categories ?? {}).map((category) => (
              <CategoryItem category={category} {...input} key={category.id} />
            ))}
          </>
        )}
      </Field>
    </div>
  );
});

const SubcategoryButtons = () => (
  <Field name={ADD_EXPENSE_FIELDS.CATEGORY_ID}>
    {({ input }) =>
      input.value && (
        <div
          className="d-grid gap-3 align-items-center"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
        >
          <ChangeSubcategoryButton />
          <h3 className="fw-bold text-primary">Подкатегории</h3>
          <AddSubcategoryButton />
        </div>
      )
    }
  </Field>
);

const SubcategoryList = () => (
  <Field name={ADD_EXPENSE_FIELDS.CATEGORY_ID}>
    {({ input: categoryInput }) => (
      <Field name={ADD_EXPENSE_FIELDS.SUBCATEGORY_ID}>
        {({ input }) => <SubcategoryItem {...{ ...input, categoryValue: categoryInput.value }} />}
      </Field>
    )}
  </Field>
);

const CurrencyField = observer(() => {
  const { formDate } = expensesStore;

  const handleDateChange = (value: Date | null) => expensesStore.setFormDate(value);

  return (
    <>
      <h3 className="fw-bold text-primary mb-0">Сумма</h3>
      <div className="d-flex align-items-center gap-2">
        <Field name={ADD_EXPENSE_FIELDS.AMOUNT}>
          {({ input }) => (
            <InputGroup className="border-primary flex-nowrap">
              <CurrencyInput
                name={input.name}
                value={input.value}
                onValueChange={(value) => input.onChange(value)}
                className="rounded-start-2 rounded-end-0 px-2 py-1 border border-success w-100"
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

        {/*<AppDatepicker value={formDate} onChange={handleDateChange} />*/}
        <AppCalendar value={formDate} onChange={handleDateChange} />
      </div>

      {formDate && (
        <span className="text-center fw-bold fs__small text-success">
          Выбранная дата: {moment(formDate).format('DD MMMM YYYY HH:mm')}
        </span>
      )}
    </>
  );
});

const SubmitButton = () => (
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
);

const ExpenseForm = {
  FormWrapper,
  CategoryButtons,
  CategoryList,
  SubcategoryButtons,
  SubcategoryList,
  CurrencyField,
  SubmitButton,
};

export default ExpenseForm;
