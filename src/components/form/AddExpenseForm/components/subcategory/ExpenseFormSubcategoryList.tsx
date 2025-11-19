import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const [height, setHeight] = useState(0);
  const [isSearchShow, setIsSearchShow] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (values?.categoryId && subcategoriesByCategoryId) {
      setSubcategoryList(subcategoriesByCategoryId[values?.categoryId]);
      setSearchQuery('');
      setIsSearchShow(false);
    }
  }, [values?.categoryId, subcategoriesByCategoryId]);

  useLayoutEffect(() => {
    if (contRef?.current) {
      const currentHeight = contRef.current.clientHeight;
      const newHeight = currentHeight > 0 ? currentHeight + 10 : currentHeight;

      setHeight(newHeight);
    }
  }, [subcategoryList, filteredList]);

  return (
    values?.categoryId && (
      <Field name="subcategoryId">
        {({ input }) => (
          <div className={styles.subcategory__wrapper} style={{ height, willChange: 'height' }}>
            <div ref={contRef} className={styles.subcategory__container}>
              {subcategoryList && subcategoryList.length > 5 && (
                <SubcategoryItemSearch
                  {...{
                    searchQuery,
                    setSearchQuery,
                    filteredList,
                    contRef,
                    setHeight,
                    isSearchShow,
                    setIsSearchShow,
                  }}
                />
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
          </div>
        )}
      </Field>
    )
  );
});

export default ExpenseFormSubcategoryList;
