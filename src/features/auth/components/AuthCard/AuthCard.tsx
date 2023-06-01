import { FC, ReactNode } from "react";
import s from "./style.module.css";

type PropsType = {
  children: ReactNode;
};

export const AuthCard: FC<PropsType> = ({ children }) => {
  return (
    <div className="container page">
      <div className={s.card}>{children}</div>
    </div>
  );
};
