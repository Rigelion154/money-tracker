import { Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';

import { categoriesStore } from '../../store/CategoriesStore.ts';
import { ADD_EXPENSE_FIELDS } from '../form/AddExpenseForm/addExpenseform.constants.ts';

import CategoryItem from './CategoryItem.tsx';

import styles from './Categories.module.css';

const CategoryList = observer(() => {
  const { categories } = categoriesStore;

  return (
    <div className={styles.categories__container}>
      <Field name={ADD_EXPENSE_FIELDS.CATEGORY_ID}>
        {({ input }) => (
          <>
            {categories &&
              categories.order.map((categoryId) => (
                <CategoryItem category={categories.data[categoryId]} {...input} key={categoryId} />
              ))}
          </>
        )}
      </Field>
    </div>
  );
});
export default CategoryList;
