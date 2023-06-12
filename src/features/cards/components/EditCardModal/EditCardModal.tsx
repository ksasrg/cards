import TextField from "@mui/material/TextField/TextField";
import { Modal } from "common/components/Modal/Modal";
import s from "./style.module.css";
import { useForm } from "react-hook-form";

export type CardData = {
  question: string;
  answer: string;
};

type Props = {
  open: boolean;
  title: string;
  question?: string;
  answer?: string;
  onClose: (open: boolean) => void;
  onSave: (data: CardData) => void;
};

export const EditCardModal = (props: Props) => {
  const { open, title, question, answer, onClose, onSave } = props;
  const form = useForm<CardData>();
  const { handleSubmit, register, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: CardData) => {
    onClose(false);
    onSave(data);
    reset();
  };

  const onCloseHandler = () => {
    onClose(false);
    reset();
  };

  return (
    <Modal open={open} title={title} onClose={onCloseHandler}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Question"
          variant="standard"
          defaultValue={question}
          sx={{ marginTop: "30px", width: "100%" }}
          error={Boolean(errors.question)}
          helperText={errors.question && errors.question.message}
          {...register("question", {
            required: "Required",
          })}
        />
        <TextField
          label="Answer"
          variant="standard"
          defaultValue={answer}
          sx={{ marginTop: "30px", width: "100%" }}
          error={Boolean(errors.answer)}
          helperText={errors.answer && errors.answer.message}
          {...register("answer", {
            required: "Required",
          })}
        />
        <div className={s.buttons}>
          <button onClick={onCloseHandler} className={s.cancel} type="button">
            Cancel
          </button>
          <button type="submit" className={s.save}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};
