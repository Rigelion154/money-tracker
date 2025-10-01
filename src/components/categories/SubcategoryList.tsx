import { observer } from 'mobx-react-lite';
import { Field } from 'react-final-form';
import SubcategoryItem from './SubcategoryItem.tsx';

interface ISubcategoryProps {
  name: string;
  value: string;
}

const SubcategoryList = observer(({ value }: ISubcategoryProps) => {
  return (
    <>
      <Field name="subcategory">
        {({ input }) => (
          <SubcategoryItem {...{ ...input, categoryValue: value }} />
        )}
      </Field>
    </>
  );
});

export default SubcategoryList;
