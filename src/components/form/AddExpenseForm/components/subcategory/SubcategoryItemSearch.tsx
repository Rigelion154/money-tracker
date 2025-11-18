import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { IoSearch } from 'react-icons/io5';
import { observer } from 'mobx-react-lite';

import type { ISubcategory } from '../../../../../types/expenses.types.ts';

interface ISearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredList: ISubcategory[];
}

const SubcategoryItemSearch = observer(
  ({ searchQuery, setSearchQuery, filteredList }: ISearchProps) => {
    const [isSearchShow, setIsSearchShow] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSearchShow = () => {
      setIsSearchShow(!isSearchShow);
    };

    useEffect(() => {
      if (!isSearchShow) setSearchQuery('');
    }, [isSearchShow]);

    useEffect(() => {
      if (isSearchShow && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isSearchShow]);

    return (
      <div className={isSearchShow ? 'w-100' : 'app__fade'}>
        <div className="d-flex align-items-center gap-2">
          <Button
            className="d-flex align-items-center justify-content-center py-1 px-2"
            onClick={handleSearchShow}
          >
            <IoSearch size={16} />
          </Button>

          {isSearchShow && (
            <FormControl
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow-1 lh-sm shadow-none"
            />
          )}
        </div>

        {searchQuery.trim().length > 0 && filteredList.length === 0 && (
          <p
            className="mb-0 mt-2 text-danger overflow-hidden m-auto"
            style={{ textOverflow: 'ellipsis', maxWidth: '300px' }}
          >
            Поиск <span className="fw-bold">"{searchQuery}"</span> не дал результатов!
          </p>
        )}
      </div>
    );
  },
);

export default SubcategoryItemSearch;
