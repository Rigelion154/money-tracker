import { makeAutoObservable } from 'mobx';
import type { Session } from '@supabase/supabase-js';
import { dbClient } from '../db/dbClient.ts';

class AuthStore {
  session: Session | null = null;
  isAuth: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  setSession(session: Session | null): void {
    this.session = session;
    this.isAuth = !!session;
  }

  async logoutUser() {
    try {
      await dbClient.auth.signOut();
    } catch (e) {
      throw e;
    }
  }
}

export const authStore = new AuthStore();