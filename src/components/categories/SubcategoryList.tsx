import { Field } from 'react-final-form';
import SubcategoryItem from './SubcategoryItem.tsx';
import { ADD_EXPENSE_FIELDS } from '../form/AddExpenseForm/addExpenseform.constants.ts';

const SubcategoryList = () => {
  return (
    <Field name={ADD_EXPENSE_FIELDS.CATEGORY_ID}>
      {({ input: categoryInput }) => (
        <Field name={ADD_EXPENSE_FIELDS.SUBCATEGORY_ID}>
          {({ input }) => <SubcategoryItem {...{ ...input, categoryValue: categoryInput.value }} />}
        </Field>
      )}
    </Field>
  );
};

export default SubcategoryList;
