import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  to: string;
  children: ReactNode;
};

export const AppLink = (props: Props) => {
  const location = useLocation();

  return (
    <Link to={props.to} state={{ from: location }}>
      {props.children}
    </Link>
  );
};
