import { makeAutoObservable } from 'mobx';
import type { Session } from '@supabase/supabase-js';
import { dbClient } from '../db/dbClient.ts';
import { categoriesStore } from './CategoriesStore.ts';

class AuthStore {
  session: Session | null = null;
  isAuth: boolean = false;
  userId: string | null = null;
  subcategoryLimit: number = 0;
  constructor() {
    makeAutoObservable(this);
    this.initSubcategoryLimit();
  }

  setSession(session: Session | null): void {
    this.session = session;
    this.isAuth = !!session;
    this.userId = session?.user.id ?? null;
  }

  logoutUser = async () => {
    try {
      await dbClient.auth.signOut();
      categoriesStore.resetCategories();
    } catch (e) {
      throw e;
    }
  };

  setSubcategoryLimit = (limit: number) => {
    this.subcategoryLimit = limit;
    localStorage.setItem('subcategoryLimit', String(limit));
  };

  initSubcategoryLimit = () => {
    const limit = localStorage.getItem('subcategoryLimit');

    if (limit !== null) {
      this.setSubcategoryLimit(Number(limit));
    } else {
      this.setSubcategoryLimit(2000);
    }
  };
}

export const authStore = new AuthStore();