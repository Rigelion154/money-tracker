import { Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';

import { categoriesStore } from '../../store/CategoriesStore.ts';

import CategoryItem from './CategoryItem.tsx';

import styles from './Categories.module.css';

const CategoryList = observer(() => {
  const { categories } = categoriesStore;

  return (
    <div className={styles.categories__container}>
      {categories &&
        categories.order.map((categoryUid) => {
          const category = categories.data[categoryUid];

          return (
            <Field name="category" key={categoryUid}>
              {({ input }) => <CategoryItem {...{ category, ...input }} />}
            </Field>
          );
        })}
    </div>
  );
});
export default CategoryList;
