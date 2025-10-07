import React from 'react';
import { FormLabel } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';

import type { ICategoryOld } from '../../store/categories.types.ts';

import styles from './Categories.module.css';

interface ICategoryItemProps {
  category: ICategoryOld;
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const CategoryItem = ({ category, value, onChange, name }: ICategoryItemProps) => {
  const isChecked = value === category.id;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <FormLabel
      className={styles.category__container}
      style={{ backgroundColor: isChecked ? category.color : '' }}
      role="button"
    >
      <div className={styles.category__icon_wrapper} style={{ backgroundColor: category.color }}>
        <i className={`${category.icon} ${styles.category__icon}`} />
      </div>

      <span className={`${styles.category__title} ${isChecked ? 'text-white' : ''}`}>
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

export default CategoryItem;
