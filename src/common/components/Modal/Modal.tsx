import { ReactNode, KeyboardEvent } from "react";
import s from "./style.module.css";

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ open, title, children, onClose }: Props) => {
  const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Escape") onClose();
  };

  if (open)
    return (
      <div className={s.modal} onKeyDown={onKeyDownHandler}>
        <div className={s.box}>
          <div className={s.header}>
            <div>{title}</div>
            <div onClick={onClose} className={s.close}>
              X
            </div>
          </div>
          <div className={s.content}>{children}</div>
        </div>
      </div>
    );

  return <></>;
};
