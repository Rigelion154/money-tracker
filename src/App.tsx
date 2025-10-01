import { observer } from 'mobx-react-lite';

import AppRouter from './routes/AppRouter/AppRouter.tsx';
import AppToaster from './components/helpers/AppToaster/AppToaster.tsx';

const App = observer(() => {
  return (
    <>
      <AppRouter />
      <AppToaster />
    </>
  );
});

export default App;
