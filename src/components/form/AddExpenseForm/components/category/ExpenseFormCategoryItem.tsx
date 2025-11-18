import React from 'react';
import { FormLabel } from 'react-bootstrap';
import { useForm } from 'react-final-form';
import FormCheckInput from 'react-bootstrap/FormCheckInput';

import type { ICategory } from '../../../../../types/expenses.types.ts';
import type { IExpenseFormValues } from '../../add-expense-from.types.ts';

import styles from '../../TransactionPage.module.scss';

interface ICategoryItemProps {
  category: ICategory;
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const ExpenseFormCategoryItem = ({ name, value, onChange, category }: ICategoryItemProps) => {
  const form = useForm<IExpenseFormValues>();
  const isChecked = value === category.id;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    form.change('subcategoryId', undefined);
    onChange(e.target.value);
  };

  return (
    <FormLabel
      className={styles.category__item}
      style={{ backgroundColor: isChecked ? category.color : '' }}
      role="button"
    >
      <div
        className={styles.category__item_icon_wrapper}
        style={{ backgroundColor: category.color }}
      >
        <i className={`${category.icon} ${styles.category__item_icon}`} />
      </div>

      <span className={`${styles.category__item_title} ${isChecked ? 'text-white' : ''}`}>
        {category.title}
      </span>

      <FormCheckInput
        name={name}
        type="radio"
        value={category.id}
        checked={isChecked}
        onChange={handleChange}
        className="d-none"
      />
    </FormLabel>
  );
};

export default ExpenseFormCategoryItem;
