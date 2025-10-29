import { observer } from 'mobx-react-lite';

import { useInitialState } from '../../hooks/useInitialState.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import PeriodBar from '../../components/layuot/PeriodBar/PeriodBar.tsx';
import V2ExpenseContent from '../../components/expenses/V2ExpenseContent.tsx';

const MainPage = observer(() => {
  const { isLoading } = useInitialState();

  return (
    <div className="w-100 py-3 pb-5">
      {isLoading && <BaseLoader />}
      {!isLoading && (
        <>
          <V2ExpenseContent />
          <PeriodBar />
        </>
      )}
    </div>
  );
});

export default MainPage;
