type Props = {
  text: string;
  img: string;
};

export const TdCardTExt = ({ text, img }: Props) => {
  return <td>{img ? <img src={img} alt="" /> : text}</td>;
};
