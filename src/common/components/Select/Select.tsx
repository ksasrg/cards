import { ChangeEvent } from "react";

type Props = {
  pageCount: number;
  onChange: (pageCount: number) => void;
};

export const Select = ({ pageCount, onChange }: Props) => {
  const onPageCountHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageCount = +event.currentTarget.value;
    onChange(pageCount);
  };

  return (
    <div>
      Show
      <select
        style={{ margin: "0 15px" }}
        onChange={onPageCountHandler}
        value={pageCount}
      >
        <option value="4">4</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      per Page
    </div>
  );
};
