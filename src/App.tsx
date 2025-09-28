import AppRouter from './routes/AppRouter/AppRouter.tsx';
import { categoriesStore } from './store/CategoriesStore.ts';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

const App = () => {
  const { categories } = categoriesStore;
  const [isLoading, setIsLoading] = useState(!categories);

  useEffect(() => {
    if (!categories) {
      categoriesStore.getCategories().finally(() => setIsLoading(false));
    }
  }, [categories]);
  return (
    <div className="container-fluid py-2 h-100">
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center p-3 h-100">
          <Spinner variant="primary" />
        </div>
      )}
      {!isLoading && categories && <AppRouter />}
    </div>
  );
};

export default App;
