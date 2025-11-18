import { dbClient } from '../../../db/dbClient.ts';
import { authStore } from '../../../store/AuthStore.ts';

export const checkCategoryExistRequest = async (title: string, categoryId?: string) => {
  let query = dbClient.from('categories').select().eq('user_id', authStore.userId);

  if (!categoryId) {
    query = query.ilike('title', title.trim().toLowerCase());
  } else {
    query = query.eq('title', title.trim()).neq('id', categoryId);
  }

  return query;
};
