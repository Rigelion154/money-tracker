import { dbClient } from '../../../db/dbClient.ts';
import { authStore } from '../../../store/AuthStore.ts';

export const upsertSubcategoryRequest = async (
  categoryId: string,
  title: string,
  subcategoryId?: string,
) =>
  await dbClient
    .from('subcategories')
    .upsert({
      id: subcategoryId,
      category_id: categoryId,
      user_id: authStore.userId,
      title: title.trim(),
    })
    .select();
