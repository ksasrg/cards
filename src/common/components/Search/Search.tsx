import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  onSearch: (text: string) => void;
  value: string;
  placeholder: string;
};

export const Search = (props: Props) => {
  const [text, setText] = useState("");
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    setText(props.value);
  }, [props.value]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;

    setText(input);
    clearTimeout(timerId);

    setTimerId(
      setTimeout(() => {
        if (input.trim() !== text) {
          props.onSearch(input.trim());
        }
      }, 1000)
    );
  };

  return (
    <input
      type="text"
      value={text}
      onChange={onChangeHandler}
      placeholder={props.placeholder}
    />
  );
};
