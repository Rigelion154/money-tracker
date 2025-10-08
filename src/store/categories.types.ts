export interface ICategoryOld {
  id: string;
  title: string;
  color?: string;
  icon?: string;
  created_at: string;
  totalAmount: number;
  is_default: boolean
}

export interface IStoreCategories {
  data: Record<ICategoryOld['id'], ICategoryOld>;
  order: string[];
}
