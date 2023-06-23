import { ChangeEvent, useState } from "react";
import { useDebounceSearch } from "./useDebounceSearch";

type Props = {
  onSearch: (text: string) => void;
  value: string;
  placeholder: string;
};

export const Search = (props: Props) => {
  const { value, placeholder, onSearch } = props;
  const [text, setText] = useState(value);
  const debounceSearch = useDebounceSearch(onSearch, 1000);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setText(input);
    debounceSearch(input);
  };

  return (
    <input
      type="text"
      value={text}
      onChange={onChangeHandler}
      placeholder={placeholder}
    />
  );
};
