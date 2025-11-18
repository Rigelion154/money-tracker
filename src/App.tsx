import { observer } from 'mobx-react-lite';
import moment from 'moment';
// @ts-ignore
import 'moment/dist/locale/ru';

import { useScreenSize } from './hooks/useScreenSize.ts';

import AppRouter from './routes/AppRouter/AppRouter.tsx';
import AppToasterComponent from './components/helpers/AppToaster/AppToasterComponent.tsx';

const App = observer(() => {
  moment().locale('ru');
  useScreenSize();

  return (
    <>
      <AppRouter />
      <AppToasterComponent />
    </>
  );
});

export default App;
