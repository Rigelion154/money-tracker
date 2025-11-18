import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Field, useFormState } from 'react-final-form';

import type { IExpenseFormValues, ISubcategory } from '../../../../../types/expenses.types.ts';

import { categoriesStore } from '../../../../../store/CategoriesStore.ts';
import { subcategoriesStore } from '../../../../../store/SubcategoriesStore.ts';
import { useFromSubcategoryList } from '../../hooks/useFromSubcategoryList.ts';

import SubcategoryItemSearch from './SubcategoryItemSearch.tsx';
import ExpenseFormSubcategoryItem from './ExpenseFormSubcategoryItem.tsx';

import styles from '../../TransactionPage.module.scss';

const ExpenseFormSubcategoryList = observer(() => {
  const { categories } = categoriesStore;
  const { subcategoriesByCategoryId } = subcategoriesStore;
  const { values } = useFormState<IExpenseFormValues>();
  const [subcategoryList, setSubcategoryList] = useState<ISubcategory[]>([]);
  const { filteredList, setSearchQuery, searchQuery } = useFromSubcategoryList(subcategoryList);

  useEffect(() => {
    if (values?.categoryId && subcategoriesByCategoryId) {
      setSubcategoryList(subcategoriesByCategoryId[values?.categoryId]);
    }
  }, [values?.categoryId, subcategoriesByCategoryId]);

  return (
    <Field name="subcategoryId">
      {({ input }) => (
        <div className={styles.subcategory__container}>
          {subcategoryList && subcategoryList.length > 5 && (
            <SubcategoryItemSearch {...{ searchQuery, setSearchQuery, filteredList }} />
          )}

          {categories &&
            filteredList &&
            filteredList.map((subcategory) => (
              <ExpenseFormSubcategoryItem
                {...{ ...input, subcategory, categories }}
                key={subcategory.id}
              />
            ))}
        </div>
      )}
    </Field>
  );
});

export default ExpenseFormSubcategoryList;
