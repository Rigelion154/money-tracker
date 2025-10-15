import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import type { IExpenseCategory, IExpenseSubcategory } from '../../../types/expenses.types.ts';

import { ROUTES } from '../../../routes/routes.ts';
import { modalStore } from '../../../store/ModalStore.ts';
import { screenStore } from '../../../store/ScreenStore.ts';

import ExpenseSubcategoryModal from './ExpenseSubcategoryModal.tsx';

interface ISubcategoryItemProps {
  subcategory: IExpenseSubcategory;
  category: IExpenseCategory;
}
const ExpenseSubcategoryDefaultItem = observer(
  ({ category, subcategory }: ISubcategoryItemProps) => {
    const { isMobile } = screenStore;
    const navigate = useNavigate();
    // const percentage = useMemo(
    //   () =>
    //     calculatePercentage(category.category_total_amount, subcategory.subcategory_total_amount),
    //   [category.category_total_amount, subcategory.subcategory_total_amount],
    // );
    // const currencyString = useMemo(
    //   () => getCurrencyString(subcategory.subcategory_total_amount),
    //   [subcategory.subcategory_total_amount],
    // );

    const handleSubcategoryClick = () => {
      if (!isMobile) {
        modalStore.openModal({
          children: <ExpenseSubcategoryModal subcategoryId={subcategory.id} />,
        });
      }

      if (isMobile) {
        navigate(`${ROUTES.SUBCATEGORY}/${subcategory.id}`);
      }
    };
    if (subcategory.expenses.length < 3) {
      return null;
    }

    return (
      <div
        className="d-flex rounded-0 py-1 px-2 shadow-none text-white"
        style={{ backgroundColor: category.color }}
        role="button"
        onClick={handleSubcategoryClick}
      >
        <div className="col-6">{subcategory.title}</div>
        {/*<div className="col-2 text-center">{percentage}%</div>*/}
        <div className="col-6 text-end">
          {subcategory.subcategory_total_amount.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
          })}
        </div>
      </div>
    );
  },
);

export default ExpenseSubcategoryDefaultItem;