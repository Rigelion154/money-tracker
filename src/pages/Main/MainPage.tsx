import { observer } from 'mobx-react-lite';

import { useInitialState } from '../../hooks/useInitialState.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import PeriodBar from '../../components/layuot/PeriodBar/PeriodBar.tsx';
import V2ExpenseList from '../../components/expenses/V2ExpenseList.tsx';

const MainPage = observer(() => {
  const { isLoading } = useInitialState();

  return (
    <div className="w-100 py-3 pb-5">
      {isLoading && <BaseLoader />}
      {!isLoading && (
        <>
          <V2ExpenseList />
          <PeriodBar />
        </>
      )}
    </div>
  );
});

export default MainPage;
