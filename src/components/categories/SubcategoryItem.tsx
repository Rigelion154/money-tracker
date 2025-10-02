import React, { useEffect, useState } from 'react';
import { authStore } from '../../store/AuthStore.ts';
import { FormLabel } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { observer } from 'mobx-react-lite';
import { subcategoriesStore } from '../../store/SubcategoriesStore.ts';
import BaseLoader from '../helpers/BaseLoader.tsx';

interface ISubcategoryProps {
  categoryValue: string;
  name: string;
  value: string;
  onChange: (value: string | null) => void;
}

const SubcategoryItem = observer(({ categoryValue, value, onChange, name }: ISubcategoryProps) => {
  const { userId } = authStore;
  const { categories } = categoriesStore;
  const { currentSubcategoryList } = subcategoriesStore;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categoryValue) {
      setIsLoading(true);
      onChange(null);
      subcategoriesStore
        .getSubcategories(userId ?? '', categoryValue)
        .finally(() => setIsLoading(false));
    }

    return () => {
      subcategoriesStore.resetCurrentSubcategoryList();
    };
  }, [categoryValue]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <div style={{ minHeight: '70px' }}>
      {isLoading && <BaseLoader />}

      {!isLoading && categories && (
        <div className="d-flex flex-wrap gap-2">
          {currentSubcategoryList.map((subcategory) => {
            const color = categories.data[subcategory.category_id].color;
            const isChecked = value === subcategory.id;

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
                <span key={subcategory.id}>{subcategory.title}</span>
              </FormLabel>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default SubcategoryItem;
