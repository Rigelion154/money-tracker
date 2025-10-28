import { dbClient } from '../../db/dbClient.ts';
import { authStore } from '../../store/AuthStore.ts';

export const getSubcategoriesRequest = async () =>
  dbClient.from('subcategories').select().eq('user_id', authStore.userId);
