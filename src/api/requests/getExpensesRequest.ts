import moment from 'moment';
import { dbClient } from '../../db/dbClient.ts';
import { authStore } from '../../store/AuthStore.ts';

export const getExpensesRequest = async (activePeriod: 'day' | 'month' | 'year' | null) => {
  const query = dbClient
    .from('expenses')
    .select()
    .eq('user_id', authStore.userId)
    .order('date', { ascending: false });

  if (activePeriod) {
    query
      .gte('date', moment().startOf(activePeriod).format('YYYY-MM-DD HH:mm:ss'))
      .lte('date', moment().endOf(activePeriod).format('YYYY-MM-DD HH:mm:ss'));
  }

  return query;
};
