import { ReactNode } from "react";
import { Modal } from "common/components/Modal/Modal";
import s from "./style.module.css";

type Props = {
  open: boolean;
  id: string;
  title: string;
  onClose: () => void;
  onDelete: (id: string) => void;
  children?: ReactNode;
};

export const DeleteModal = (props: Props) => {
  const { open, id, title, children, onClose, onDelete } = props;

  const onDeleteHandler = () => {
    onClose();
    onDelete(id);
  };

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className={s.text}>{children}</div>
      <div className={s.buttons}>
        <button onClick={onClose} className={s.cancel} autoFocus>
          Cancel
        </button>
        <button onClick={onDeleteHandler} className={s.delete}>
          Delete
        </button>
      </div>
    </Modal>
  );
};
