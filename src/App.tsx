import { observer } from 'mobx-react-lite';

import AppRouter from './routes/AppRouter/AppRouter.tsx';
import AppToaster from './components/helpers/AppToaster/AppToaster.tsx';

const App = observer(() => {
  return (
    <div className="p-2 w-100 h-100">
      <AppRouter />
      <AppToaster />
    </div>
  );
});

export default App;
