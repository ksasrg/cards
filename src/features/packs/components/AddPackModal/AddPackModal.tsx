import TextField from "@mui/material/TextField/TextField";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { useForm } from "react-hook-form";
import { Modal } from "common/components/Modal/Modal";
import s from "./style.module.css";

export type Data = {
  name: string;
  private: boolean;
};

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  onSave: (data: Data) => void;
};

export const AddPackModal = ({ open, onClose, onSave }: Props) => {
  const form = useForm<Data>();
  const { handleSubmit, register, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: Data) => {
    onClose(false);
    onSave(data);
    reset();
  };

  return (
    <Modal open={open} title={"Add new pack"} onClose={() => onClose(false)}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <TextField
          label="Name pack"
          variant="standard"
          sx={{ marginTop: "30px", width: "100%" }}
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name.message}
          {...register("name", {
            required: "Required",
          })}
        />
        <div className={s.checkbox}>
          <Checkbox id="private" {...register("private")} />
          <label htmlFor="private">Private pack</label>
        </div>
        <div className={s.buttons}>
          <button onClick={() => onClose(false)} className={s.cancel} autoFocus>
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
