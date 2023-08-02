'use client';

import { ChangeEventHandler, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const name = searchParams.get('name');

  const [value, setValue] = useState(name || '');
  const debounceValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debounceValue,
      categoryId: categoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [router, debounceValue, categoryId]);
  return (
    <div className=" relative">
      <Search className=" absolute w-4  h-4 top-3 left-4 text-muted-foreground" />
      <Input
        onChange={onChange}
        value={value}
        placeholder="Search..."
        className="pl-10 bg-primary/10"
      />
    </div>
  );
};

export default SearchInput;
