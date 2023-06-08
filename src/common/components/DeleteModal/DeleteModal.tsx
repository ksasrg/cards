import { Modal } from "common/components/Modal/Modal";
import s from "./style.module.css";

type Props = {
  modal: { open: boolean; id: string; name: string };
  title: string;
  onClose: () => void;
  onDelete: (id: string) => void;
  children?: string;
};

export const DeleteModal = (props: Props) => {
  const { modal, title, children, onClose, onDelete } = props;
  const { open, id, name } = modal;

  const onDeleteHandler = () => {
    onClose();
    onDelete(id);
  };

  const text = children?.replace("$name$", `${name}`);

  if (open)
    return (
      <Modal title={title} onClose={() => onClose()}>
        <div className={s.text}>{text}</div>
        <div className={s.buttons}>
          <button onClick={() => onClose()} className={s.cancel} autoFocus>
            Cancel
          </button>
          <button onClick={onDeleteHandler} className={s.delete}>
            Delete
          </button>
        </div>
      </Modal>
    );

  return <></>;
};
