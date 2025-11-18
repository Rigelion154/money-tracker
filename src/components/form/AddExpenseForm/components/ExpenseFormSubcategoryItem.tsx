import { FormLabel } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import React from 'react';
import type { ICategory, ISubcategory } from '../../../../types/expenses.types.ts';

interface ISubcategoryItemProps {
  name: string;
  value: string;
  onChange: (value: string | null) => void;
  subcategory: ISubcategory;
  categories: Record<ICategory['id'], ICategory>;
}

const ExpenseFormSubcategoryItem = ({
  name,
  value,
  onChange,
  subcategory,
  categories,
}: ISubcategoryItemProps) => {
  const isChecked = value === subcategory.id;
  const color = categories[subcategory.category_id].color;
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <FormLabel
      role="button"
      key={subcategory.id}
      className="mb-0 rounded-3 px-2"
      style={{
        border: `1px solid ${color}`,
        backgroundColor: isChecked ? color : 'transparent',
        color: isChecked ? 'white' : color,
      }}
    >
      <FormCheckInput
        name={name}
        type="radio"
        value={subcategory.id}
        checked={isChecked}
        onChange={handleChange}
        className="d-none"
      />
      <span key={subcategory.id} className="text-nowrap">
        {subcategory.title}
      </span>
    </FormLabel>
  );
};

export default ExpenseFormSubcategoryItem;
