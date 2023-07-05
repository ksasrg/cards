import { ChangeEvent } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const Choices = (props: Props) => {
  const { onChange } = props;

  const choices = [
    "Did not know",
    "Forgot",
    "A lot of thought",
    "Confused",
    "Knew the answer",
  ];

  return (
    <>
      {choices.map((choice, i) => (
        <label key={i}>
          <input type="radio" name="grade" value={i + 1} onChange={onChange} />
          <span>{choice}</span>
        </label>
      ))}
    </>
  );
};
