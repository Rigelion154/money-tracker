import { Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';

import { categoriesStore } from '../../store/CategoriesStore.ts';
import { validateRequired } from '../../utils/validateRequired.ts';

import CategoryItem from './CategoryItem.tsx';

import styles from './Categories.module.css';

const CategoryList = observer(() => {
  const { categories } = categoriesStore;

  return (
    <div className={styles.categories__container}>
      <Field name="category" validate={validateRequired}>
        {({ input }) => (
          <>
            {categories &&
              categories.order.map((categoryUid) => {
                const category = categories.data[categoryUid];

                return (
                  <CategoryItem {...{ category, ...input }} key={categoryUid} />
                );
              })}
          </>
        )}
      </Field>
    </div>
  );
});
export default CategoryList;
