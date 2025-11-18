import { dbClient } from '../../../db/dbClient.ts';

export const deleteCategoryRequest = async (categoryId?: string) =>
  await dbClient.from('categories').delete().eq('id', categoryId).select();
