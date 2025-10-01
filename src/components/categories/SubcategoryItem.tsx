import React, { useEffect, useState } from 'react';
import { authStore } from '../../store/AuthStore.ts';
import { FormLabel } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { observer } from 'mobx-react-lite';
import BaseLoader from '../helpers/BaseLoader.tsx';

interface ISubcategoryProps {
  categoryValue: string;
  name: string;
  value: string;
  onChange: (value: string | null) => void;
}

const SubcategoryItem = observer(
  ({ categoryValue, value, onChange, name }: ISubcategoryProps) => {
    const { userId } = authStore;
    const { categories, currentSubcategoryList } = categoriesStore;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (categoryValue) {
        setIsLoading(true);
        onChange(null);
        categoriesStore
          .getSubcategories(userId ?? '', categoryValue)
          .finally(() => setIsLoading(false));
      }

      return () => {
        categoriesStore.setCurrentSubcategoryList([]);
      };
    }, [categoryValue]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value);

    return (
      <div style={{ minHeight: '65px' }}>
        {isLoading && <BaseLoader />}

        <div className="d-flex gap-2">
          {!isLoading &&
            categories &&
            currentSubcategoryList.map((subcategory) => {
              const color = categories.data[subcategory.category_id].color;
              const isChecked = value === subcategory.id;

              return (
                <FormLabel role="button" key={subcategory.id} className="mb-0">
                  <FormCheckInput
                    name={name}
                    type="radio"
                    value={subcategory.id}
                    checked={isChecked}
                    onChange={handleChange}
                    className="d-none"
                  />
                  <span
                    key={subcategory.id}
                    className="rounded-3 px-2 py-1"
                    style={{
                      border: `1px solid ${color}`,
                      backgroundColor: isChecked ? color : 'transparent',
                      color: isChecked ? 'white' : color,
                    }}
                  >
                    {subcategory.title}
                  </span>
                </FormLabel>
              );
            })}
        </div>
      </div>
    );
  },
);

export default SubcategoryItem;
