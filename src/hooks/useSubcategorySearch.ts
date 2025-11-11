import { subcategoriesStore } from '../store/SubcategoriesStore.ts';
import { useEffect, useState } from 'react';
import type { ISubcategory } from '../types/expenses.types.ts';

export const useSubcategorySearch = () => {
  const { currentSubcategoryList } = subcategoriesStore;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState<ISubcategory[]>([]);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      const filteredValue = currentSubcategoryList.filter((subcategory) =>
        subcategory.title.trim().toLowerCase().includes(query),
      );
      setFilteredList(filteredValue);
    } else {
      setFilteredList(currentSubcategoryList);
    }
  }, [currentSubcategoryList, searchQuery]);

  return { searchQuery, setSearchQuery, filteredList, currentSubcategoryList };
};
