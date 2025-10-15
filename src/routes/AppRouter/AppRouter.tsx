import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { ROUTES } from '../routes.ts';
import { authStore } from '../../store/AuthStore.ts';
import { useAuth } from '../../hooks/useAuth.ts';

import Layout from '../../components/layuot/Layout.tsx';
import AuthPage from '../../pages/Auth/AuthPage.tsx';
import MainPage from '../../pages/Main/MainPage.tsx';
import AddTransactionPage from '../../pages/AddTransactionPage/AddTransactionPage.tsx';
import ExpenseDetailsPage from '../../pages/Details/ExpenseDetailsPage.tsx';

const AppRouter = observer(() => {
  const { isAuth } = authStore;
  const { isLoading } = useAuth();

  return (
    <>
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center p-3 h-100">
          <Spinner variant="primary" />
        </div>
      )}

      {!isLoading && (
        <Routes>
          {isAuth && (
            <>
              <Route path={ROUTES.AUTH} element={<Navigate to={ROUTES.MAIN} />} />
              <Route path={ROUTES.MAIN} element={<Layout />}>
                <Route path={ROUTES.MAIN} element={<MainPage />} />
                <Route path={ROUTES.ADD_TRANSACTION} element={<AddTransactionPage />} />
                <Route path={ROUTES.EXPENSE_DETAILS} element={<ExpenseDetailsPage />} />
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
