import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Field } from 'react-final-form';

import type { ISubcategory } from '../../../../types/expenses.types.ts';

import { ADD_EXPENSE_FIELDS } from '../addExpenseform.constants.ts';
import { categoriesStore } from '../../../../store/CategoriesStore.ts';
import { subcategoriesStore } from '../../../../store/SubcategoriesStore.ts';
import { useFromSubcategoryList } from '../hooks/useFromSubcategoryList.ts';

import SubcategoryItemSearch from '../../../subcategories/SubcategoryItemSearch.tsx';
import ExpenseFormSubcategoryItem from './ExpenseFormSubcategoryItem.tsx';

import styles from '../TransactionPage.module.scss';

interface ISubcategoryListProps {
  categoryValue: string;
}

const ExpenseFormSubcategoryList = observer(({ categoryValue }: ISubcategoryListProps) => {
  const { v2_categories: categories } = categoriesStore;
  const { subcategoriesByCategoryId } = subcategoriesStore;
  const [subcategoryList, setSubcategoryList] = useState<ISubcategory[]>([]);
  const { filteredList, setSearchQuery, searchQuery } = useFromSubcategoryList(subcategoryList);

  useEffect(() => {
    if (categoryValue && subcategoriesByCategoryId) {
      setSubcategoryList(subcategoriesByCategoryId[categoryValue]);
    }
  }, [categoryValue, subcategoriesByCategoryId]);

  return (
    <Field name={ADD_EXPENSE_FIELDS.SUBCATEGORY_ID}>
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
