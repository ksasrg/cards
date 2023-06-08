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
        {text}
        <div>
          <button onClick={onDeleteHandler} className={s.button}>
            Delete
          </button>
        </div>
      </Modal>
    );

  return <></>;
};
