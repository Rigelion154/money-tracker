import { Field } from 'react-final-form';
import CategoryItem from './CategoryItem.tsx';
import { observer } from 'mobx-react-lite';
import { categoriesStore } from '../store/CategoriesStore.ts';

const CategoryList = observer(() => {
  const { categories } = categoriesStore;

  return (
    <div className="d-flex flex-wrap justify-content-center gap-3">
      {categories &&
        categories.order.map((categoryUid) => {
          const category = categories.data[categoryUid];

          return (
            <Field name="category" key={categoryUid}>
              {({ input }) => {
                return <CategoryItem {...{ category, ...input }} />;
              }}
            </Field>
          );
        })}
    </div>
  );
});
export default CategoryList;
