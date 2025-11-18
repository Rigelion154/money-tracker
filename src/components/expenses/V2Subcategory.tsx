import { Accordion } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import type { IV2ExpenseSubcategory } from '../../types/expenses.types.ts';

import { authStore } from '../../store/AuthStore.ts';
import { subcategoriesStore } from '../../store/SubcategoriesStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import V2ExpensesList from './V2ExpensesList.tsx';

interface ISubcategoryProps {
  subcategory: IV2ExpenseSubcategory;
}

const V2Subcategory = observer(({ subcategory }: ISubcategoryProps) => {
  const { subcategoriesById } = subcategoriesStore;
  const { subcategoryLimit } = authStore;

  if (subcategory.totalAmount < subcategoryLimit) {
    return null;
  }

  return (
    subcategoriesById &&
    subcategoriesById[subcategory.subcategoryId] && (
      <Accordion>
        <Accordion.Button className="py-1 px-2 bg-transparent shadow-none text-white">
          <div className="col-6">{subcategoriesById?.[subcategory.subcategoryId].title}</div>
          <div className="col-2 text-center">{subcategory.percentage}%</div>
          <div className="col-4 text-end">{getCurrencyString(subcategory.totalAmount)}</div>
        </Accordion.Button>
        <Accordion.Body className="bg-light border text-dark px-0 py-1">
          <V2ExpensesList expenses={subcategory.expenses} />
        </Accordion.Body>
      </Accordion>
    )
  );
});

export default V2Subcategory;
