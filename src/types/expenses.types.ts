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

export interface IGroupedExpenses {
  [date: string]: IExpense[];
}

export interface IV2Expense {
  categoryId: string;
  totalAmount: number;
  percentage: number;
  expenses: Record<string, IExpense[]>;
  subcategories: IV2ExpenseSubcategory[];
}

export interface IV2ExpenseSubcategory {
  subcategoryId: string;
  totalAmount: number;
  percentage: number;
  expenses: Record<string, IExpense[]>;
}

export type TExpensesMap = Record<
  ICategory['id'],
  {
    totalAmount: number;
    categoryId: string;
    expenses: IExpense[];
    subcategories: Record<
      ISubcategory['id'],
      {
        subcategoryId: string;
        totalAmount: number;
        expenses: IExpense[];
      }
    >;
  }
>;

export type TActivePeriod = 'day' | 'month' | 'year' | null
