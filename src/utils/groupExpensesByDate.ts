import type { IExpense } from '../types/expenses.types.ts';
import moment from 'moment';

interface IGroupedExpenses {
  [date: string]: IExpense[];
}

export const groupExpensesByDate = (expenses: IExpense[]): IGroupedExpenses => {
  const grouped: IGroupedExpenses = {};

  expenses.forEach((expense) => {
    const date = moment(expense.date).format('MM.DD.YYYY');

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(expense);
  });

  // Сортировка
  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
    .reduce((acc, [date, expenses]) => {
      acc[date] = expenses.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      return acc;
    }, {} as IGroupedExpenses);
};