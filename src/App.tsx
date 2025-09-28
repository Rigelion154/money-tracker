import AppRouter from './routes/AppRouter/AppRouter.tsx';
import { useEffect } from 'react';
import { dbClient } from './db/dbClient.ts';

const App = () => {
  useEffect(() => {
    getInstruments().then((res) => console.log(res));
  }, []);

  async function getInstruments() {
    const { data } = await dbClient.from('categories').select();
    return data;
  }

  return (
    <div className="p-3">
      <AppRouter />
    </div>
  );
};

export default App;
