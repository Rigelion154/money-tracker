import { observer } from 'mobx-react-lite';

import AppRouter from './routes/AppRouter/AppRouter.tsx';
import AppToasterComponent from './components/helpers/AppToaster/AppToasterComponent.tsx';

const App = observer(() => {
  return (
    <>
      <AppRouter />
      <AppToasterComponent />
    </>
  );
});

export default App;
