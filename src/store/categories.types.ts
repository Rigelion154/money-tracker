export interface ICategory {
  id: string;
  title: string;
  color?: string;
  icon?: string;
  created_at: string;
  totalAmount: number;
}

export interface ISubcategory {
  "id": string;
  "created_at": string;
  "title": string;
  "user_id": string;
  "category_id": string;
}

export interface IExpense {
  id: string;
  amount: number;
  description: string | null;
  category_id: string;
  subcategory_id: string | null;
  user_id: string;
  date: string;
  created_at: string;
  categories: {
    icon: string;
    color: string;
    title: string;
  };
  subcategories: ISubcategory
}

export interface IStoreExpense {
  category: Partial<ICategory>;
  subcategories:  Record<ISubcategory["id"], ISubcategory>;
  totalAmount: number;
  items: IExpense[];
}

export interface IStoreCategories {
  data: Record<ICategory['id'], ICategory>;
  order: string[];
}
