import { useEffect, useState } from 'react';
import { dbClient } from '../db/dbClient.ts';
import { authStore } from '../store/AuthStore.ts';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dbClient.auth.getSession().then((res) => {
      authStore.setSession(res.data.session);
    });

    const {
      data: { subscription },
    } = dbClient.auth.onAuthStateChange((_, session) => {
      authStore.setSession(session);
    });

    setIsLoading(false);

    return () => subscription.unsubscribe();
  }, []);

  return { isLoading };
};