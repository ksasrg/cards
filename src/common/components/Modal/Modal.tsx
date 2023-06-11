import { createPortal } from "react-dom";
import { ReactNode, useEffect, useCallback } from "react";
import s from "./style.module.css";

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ open, title, children, onClose }: Props) => {
  const onKeyDownHandler = useCallback(() => onClose(), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
      document.body.addEventListener("keydown", onKeyDownHandler);
    } else {
      document.body.style.overflowY = "";
      document.body.removeEventListener("keydown", onKeyDownHandler);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (open)
    return createPortal(
      <div className={s.modal}>
        <div className={s.box}>
          <div className={s.header}>
            <div>{title}</div>
            <div onClick={onClose} className={s.close}>
              X
            </div>
          </div>
          <div className={s.content}>{children}</div>
        </div>
      </div>,
      document.body
    );

  return <></>;
};
