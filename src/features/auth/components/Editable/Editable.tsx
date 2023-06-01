import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { editIcon } from "./icon";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import Button from "@mui/material/Button/Button";
import s from "./style.module.css";

type Props = {
  text: string;
  style: React.CSSProperties | undefined;
  onSubmit: (text: string) => void;
};

export function Editable(props: Props) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const onClickHandler = () => {
    setEdit(true);
    setText(props.text);
  };

  const onSubmitHandler = () => {
    setEdit(false);
    if (text !== props.text) props.onSubmit(text);
  };

  const onKeyHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSubmitHandler();
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const input = (
    <TextField
      label="Nickname"
      variant="standard"
      value={text}
      onChange={onChangeHandler}
      onKeyDown={onKeyHandler}
      autoFocus
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <Button variant="contained" size="small" onClick={onSubmitHandler}>
              SAVE
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );

  const username = (
    <div style={{ height: "48px" }}>
      <span onDoubleClick={onClickHandler} className={s.nick}>
        {props.text}
      </span>
      <img
        src={editIcon}
        alt="edit"
        className={s.icon}
        onClick={onClickHandler}
      />
    </div>
  );

  return <div style={props.style}>{edit ? input : username}</div>;
}
