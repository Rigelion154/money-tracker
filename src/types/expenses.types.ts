export interface IExpense {
  id: string;
  user_id: string;
  category_id: string;
  subcategory_id: string | null;
  amount: number;
  date: string;
  description: string | null;
  created_at: string;
  category?: ICategory;
  subcategory?: ISubcategory;
}

export interface ICategory {
  id: string;
  user_id: string | null;
  color: string;
  icon: string;
  title: string;
  is_default: boolean;
  created_at: string;
}

export interface ISubcategory {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
}

export interface IExpenseCategory extends ICategory {
  category_total_amount: number;
  expenses: IExpense[];
  subcategories: IExpenseSubcategory[];
}

export interface IExpenseSubcategory extends ISubcategory {
  expenses: IExpense[];
  subcategory_total_amount: number;
}

export interface IExpenseDetails extends IExpense {
  categories: IExpenseCategory;
  subcategories: IExpenseSubcategory;
}
