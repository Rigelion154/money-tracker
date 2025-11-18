import { dbClient } from '../../../db/dbClient.ts';
import { authStore } from '../../../store/AuthStore.ts';

export const checkSubcategoryExist = async (
  categoryId: string,
  title: string,
  subcategoryId?: string,
) => {
  let query = dbClient
    .from('subcategories')
    .select()
    .eq('user_id', authStore.userId)
    .eq('category_id', categoryId);

  if (!subcategoryId) {
    query = query.ilike('title', title.trim().toLowerCase());
  } else {
    query = query.eq('title', title.trim()).neq('id', subcategoryId);
  }

  return query;
};