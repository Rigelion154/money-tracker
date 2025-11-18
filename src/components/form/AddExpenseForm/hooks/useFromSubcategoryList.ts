import { useEffect, useState } from 'react';

import type { ISubcategory } from '../../../../types/expenses.types.ts';

export const useFromSubcategoryList = (subcategoryList: ISubcategory[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState<ISubcategory[]>([]);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query && subcategoryList.length > 0) {
      const filteredValue = subcategoryList.filter((subcategory) =>
        subcategory.title.trim().toLowerCase().includes(query),
      );
      setFilteredList(filteredValue);
    } else {
      setFilteredList(subcategoryList);
    }
  }, [searchQuery, subcategoryList]);

  return { searchQuery, setSearchQuery, filteredList };
};