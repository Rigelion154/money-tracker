import React, { useCallback, useEffect, useRef } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { Field, Form, useForm, useFormState } from 'react-final-form';
import { Button, Dropdown, InputGroup } from 'react-bootstrap';
import { CurrencyInput } from 'react-currency-input-field';
import { IoCalendarNumberOutline } from 'react-icons/io5';

import type { IExpenseFormValues } from '../../../../types/expenses.types.ts';

import { appToaster } from '../../../../store/AppToaster.ts';
import { expensesStore } from '../../../../store/ExpensesStore.ts';

import ChangeCategoryButton from './category/ChangeCategoryButton.tsx';
import ExpenseFormSubcategoryList from './subcategory/ExpenseFormSubcategoryList.tsx';
import AppCalendar from '../../../helpers/AppCalendar/AppCalendar.tsx';
import ExpenseFormCategoryList from './category/ExpenseFormCategoryList.tsx';
import ChangeSubcategoryButton from './subcategory/ChangeSubcategoryButton.tsx';
import AddSubcategoryButton from './subcategory/AddSubcategoryButton.tsx';
import AddCategoryButton from './category/AddCategoryButton.tsx';

interface IWrapperProps {
  children: React.ReactNode;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormWrapper = observer(({ children, setIsLoading }: IWrapperProps) => {
  const { formDate } = expensesStore;

  const handleFormSubmit = async (values: IExpenseFormValues) => {
    const { categoryId, amount, subcategoryId } = values;

    if (!categoryId) {
      return appToaster.addToast('Необходимо выбрать категорию', 'warning');
    }

    if (!amount) {
      return appToaster.addToast('Необходимо внести сумму', 'warning');
    }

    setIsLoading(true);

    await expensesStore.addExpense(categoryId, amount, subcategoryId, formDate);

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
    <h3 className="fw-bold text-primary mb-0">Категории</h3>
    <AddCategoryButton />
  </div>
);

const CategoryList = () => <ExpenseFormCategoryList />;

const SubcategoryButtons = () => {
  const { values } = useFormState<IExpenseFormValues>();
  const { change } = useForm<IExpenseFormValues>();
  const categoryId = values?.categoryId;

  const setSubcategory = useCallback((value?: string) => change('subcategoryId', value), []);

  return (
    categoryId && (
      <div
        className="d-grid gap-3 align-items-center"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        <ChangeSubcategoryButton {...{ setSubcategory }} />
        <h3 className="fw-bold text-primary mb-0">Подкатегории</h3>
        <AddSubcategoryButton {...{ setSubcategory }} />
      </div>
    )
  );
};

const SubcategoryList = () => <ExpenseFormSubcategoryList />;

const CurrencyField = observer(() => {
  const { formDate } = expensesStore;

  return (
    <>
      <h3 className="fw-bold text-primary mb-0">Сумма</h3>
      <div className="d-flex align-items-center gap-2">
        <CurrencyInputField />
        <CurrencyCalendar {...{ formDate }} />
      </div>

      {formDate && (
        <span className="text-center fw-bold text-danger text-capitalize">
          {moment(formDate).format('DD MMMM YYYY HH:mm')}
        </span>
      )}
    </>
  );
});

const CurrencyInputField = () => {
  const { values } = useFormState<IExpenseFormValues>();
  const currencyRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (values && currencyRef.current && values.categoryId && values.subcategoryId) {
      currencyRef.current.focus();
      currencyRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [values]);

  return (
    <Field name="amount">
      {({ input }) => (
        <InputGroup className="border-primary flex-nowrap">
          <CurrencyInput
            ref={currencyRef}
            name={input.name}
            value={input.value}
            onValueChange={(value) => input.onChange(value)}
            className="rounded-start-2 rounded-end-0 px-2 py-1 border border-success w-100"
            decimalsLimit={2}
            suffix=" ₽"
            style={{ fontSize: '1.2rem', outlineColor: '#0d6efd', scrollMarginBottom: '4rem' }}
            autoComplete="off"
          />
          <InputGroup.Text className="border-success py-0 px-2">
            <i className="bi bi-coin text-success fs-4"></i>
          </InputGroup.Text>
        </InputGroup>
      )}
    </Field>
  );
};

const CurrencyCalendar = ({ formDate }: { formDate: Date | null }) => {
  const handleDateChange = (value: Date | null) => expensesStore.setFormDate(value);

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-success"
        className="d-flex align-items-center justify-content-center p-1 border-0 rounded-2"
        active={!!formDate}
      >
        <IoCalendarNumberOutline size={35} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100 p-0 border-0" style={{ minWidth: '300px' }}>
        <AppCalendar value={formDate} onChange={handleDateChange} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

const SubmitButton = () => (
  <Button
    type="submit"
    variant="outline-success"
    className="position-fixed start-50 bottom-0 translate-middle-x mb-2 rounded-4 px-5 text-success fw-bold"
    style={{
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
