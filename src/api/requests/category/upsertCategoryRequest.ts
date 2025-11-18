import { dbClient } from '../../../db/dbClient.ts';
import { authStore } from '../../../store/AuthStore.ts';

export const upsertCategoryRequest = async (
  title: string,
  color: string,
  icon: string,
  categoryId?: string,
) =>
  await dbClient
    .from('categories')
    .upsert({
      id: categoryId,
      user_id: authStore.userId,
      title: title.trim(),
      color: color.trim(),
      icon: icon,
    })
    .select();
