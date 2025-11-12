import moment from 'moment';
import { dbClient } from '../../db/dbClient.ts';
import { authStore } from '../../store/AuthStore.ts';
import type { TActivePeriod } from '../../types/expenses.types.ts';
import { REQUEST_DATE_FORMAT } from '../../utils/constants.ts';

export const getExpensesRequest = async (activePeriod: TActivePeriod, periodDate: Date | null) => {
  const query = dbClient
    .from('expenses')
    .select()
    .eq('user_id', authStore.userId)
    .order('date', { ascending: false });

  if (activePeriod && activePeriod !== 'calendar') {
    query
      .gte('date', moment().startOf(activePeriod).format('YYYY-MM-DD HH:mm:ss'))
      .lte('date', moment().endOf(activePeriod).format('YYYY-MM-DD HH:mm:ss'));
  }

  if (activePeriod && activePeriod === 'calendar' && periodDate) {
    query
      .gte('date', moment(periodDate).startOf('day').format(REQUEST_DATE_FORMAT))
      .lte('date', moment(periodDate).endOf('day').format(REQUEST_DATE_FORMAT));
  }

  return query;
};
