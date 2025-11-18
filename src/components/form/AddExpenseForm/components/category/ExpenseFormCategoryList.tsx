import { Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import { categoriesStore } from '../../../../../store/CategoriesStore.ts';

import ExpenseFormCategoryItem from './ExpenseFormCategoryItem.tsx';

import styles from '../../TransactionPage.module.scss';

const ExpenseFormCategoryList = observer(() => {
  const { categories } = categoriesStore;

  return (
    <Field name="categoryId">
      {({ input }) => (
        <div className={styles.categories__container}>
          {Object.values(categories ?? {}).map((category) => (
            <ExpenseFormCategoryItem {...{ ...input, category }} key={category.id} />
          ))}
        </div>
      )}
    </Field>
  );
});

export default ExpenseFormCategoryList;
