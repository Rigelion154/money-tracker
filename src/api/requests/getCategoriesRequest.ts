import { dbClient } from '../../db/dbClient.ts';
import { authStore } from '../../store/AuthStore.ts';

export const getCategoriesRequest = async () =>
  dbClient.from('categories').select().or(`user_id.eq.${authStore.userId},is_default.eq.true`);
