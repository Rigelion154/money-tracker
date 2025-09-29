export interface ICategory {
  id: string;
  title: string;
  color?: string;
  icon?: string;
  created_at: string;
}

export interface IStoreCategories {
  data: Record<ICategory['id'], ICategory>;
  order: string[];
}
