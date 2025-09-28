export interface ICategory {
  uid: string;
  title: string;
  color?: string;
  icon?: string;
  created_at: string;
}

export interface IStoreCategories {
  data: Record<ICategory['uid'], ICategory>;
  order: string[];
}
