import { useEffect, useState } from "react";

export const useDebounceSearch = (
  onSearch: (text: string) => void,
  delay: number
) => {
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    if (search === null) return;

    const timerId = setTimeout(() => {
      onSearch(search);
    }, delay);

    return () => clearTimeout(timerId);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  return setSearch;
};
