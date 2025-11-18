import { dbClient } from '../../../db/dbClient.ts';

export const deleteSubcategoryRequest = async (subcategoryId?: string) =>
  await dbClient.from('subcategories').delete().eq('id', subcategoryId).select();