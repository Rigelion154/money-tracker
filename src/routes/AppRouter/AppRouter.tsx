import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { ROUTES } from '../routes.ts';
import { authStore } from '../../store/AuthStore.ts';
import { useAuth } from '../../hooks/useAuth.ts';
import { useInitialState } from '../../hooks/useInitialState.ts';

import Layout from '../../components/layuot/Layout.tsx';
import AuthPage from '../../pages/Auth/AuthPage.tsx';
import ExpensesPage from '../../pages/Main/ExpensesPage.tsx';
import AddTransactionPage from '../../pages/AddTransactionPage/AddTransactionPage.tsx';

const AppRouter = observer(() => {
  const { isAuth } = authStore;
  const { isLoading } = useAuth();
  const { isLoading: initialLoading } = useInitialState(isAuth);

  return (
    <>
      {isLoading ||
        (initialLoading && (
          <div className="d-flex align-items-center justify-content-center p-3 vh-100">
            <Spinner variant="primary" />
          </div>
        ))}

      {!isLoading && !initialLoading && (
        <Routes>
          {isAuth && (
            <>
              <Route path={ROUTES.AUTH} element={<Navigate to={ROUTES.MAIN} />} />
              <Route path={ROUTES.MAIN} element={<Layout />}>
                <Route path={ROUTES.MAIN} element={<ExpensesPage />} />
                <Route path={ROUTES.ADD_TRANSACTION} element={<AddTransactionPage />} />
              </Route>
            </>
          )}

          {!isAuth && (
            <>
              <Route path="*" element={<Navigate to={ROUTES.AUTH} />} />
              <Route path={ROUTES.AUTH} element={<AuthPage />} />
            </>
          )}
        </Routes>
      )}
    </>
  );
});

export default AppRouter;
