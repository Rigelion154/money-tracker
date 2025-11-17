import { useEffect, useState } from 'react';
import { dbClient } from '../db/dbClient.ts';
import { authStore } from '../store/AuthStore.ts';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useAuth');
    dbClient.auth
      .getSession()
      .then((res) => {
        console.log('GET SESSION');
        authStore.setSession(res.data.session);
      })
      .finally(() => setIsLoading(false));

    const {
      data: { subscription },
    } = dbClient.auth.onAuthStateChange((_, session) => {
      authStore.setSession(session);
    });

    // setIsLoading(false);

    return () => subscription.unsubscribe();
  }, []);

  return { isLoading };
};