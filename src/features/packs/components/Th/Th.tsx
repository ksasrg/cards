type Props = {
  name: string;
  sort: string | undefined;
  query: string;
  className?: string;
  width?: string;
  onSort: (sortPacks: string) => void;
};

export const Th = (props: Props) => {
  const { name, sort, query, className, width, onSort } = props;
  const up = "1" + query;
  const down = "0" + query;

  const sortCol = (sortBy: string) => {
    const down = "0" + sortBy;
    const up = "1" + sortBy;
    const sortPacks = sort === down ? up : sort === up ? down : up;
    onSort(sortPacks);
  };

  return (
    <th onClick={() => sortCol(query)} className={className} style={{ width }}>
      {name} {sort === up ? "▲" : sort === down ? "▼" : ""}
    </th>
  );
};
