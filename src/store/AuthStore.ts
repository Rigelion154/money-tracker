import { makeAutoObservable } from 'mobx';
import type { Session } from '@supabase/supabase-js';
import { dbClient } from '../db/dbClient.ts';

class AuthStore {
  session: Session | null = null;
  isAuth: boolean = false;
  userId: string | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setSession(session: Session | null): void {
    this.session = session;
    this.isAuth = !!session;
    this.userId = session?.user.id ?? null;
  }

  logoutUser = async () => {
    try {
      await dbClient.auth.signOut();
    } catch (e) {
      throw e;
    }
  };
}

export const authStore = new AuthStore();