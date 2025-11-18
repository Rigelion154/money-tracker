import { Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';

import { EXPENSE_FORM_FIELDS } from '../../addExpenseform.constants.ts';
import { categoriesStore } from '../../../../../store/CategoriesStore.ts';

import ExpenseFormCategoryItem from './ExpenseFormCategoryItem.tsx';

import styles from '../../TransactionPage.module.scss';

const ExpenseFormCategoryList = observer(() => {
  const { categories } = categoriesStore;

  return (
    <Field name={EXPENSE_FORM_FIELDS.CATEGORY_ID}>
      {({ input }) => (
        <div className={styles.categories__container}>
          {Object.values(categories ?? {}).map((category) => (
            <ExpenseFormCategoryItem {...input} category={category} key={category.id} />
          ))}
        </div>
      )}
    </Field>
  );
});

export default ExpenseFormCategoryList;
