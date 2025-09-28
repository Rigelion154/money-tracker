import {Route, Routes} from "react-router-dom";
import MainPage from "../../pages/Main/MainPage.tsx";
import {ROUTES} from "../routes.ts";
import AddTransactionPage from "../../pages/AddTransactionPage/AddTransactionPage.tsx";


const AppRouter = () => <Routes>
  <Route path={ROUTES.MAIN} element={<MainPage />} />
  <Route path={ROUTES.ADD_TRANSACTION} element={<AddTransactionPage />} />
</Routes>;

export default AppRouter;