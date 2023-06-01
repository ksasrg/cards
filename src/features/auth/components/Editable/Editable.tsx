import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import editIcon from "assets/editIcon.svg";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import Button from "@mui/material/Button/Button";

type PropsType = {
  text: string;
  style: React.CSSProperties | undefined;
  onSubmit: (text: string) => void;
};

export function Editable(props: PropsType) {
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

  return (
    <div style={props.style}>
      {edit ? (
        <TextField
          label="Nickname"
          variant="standard"
          value={text}
          onChange={onChangeHandler}
          onKeyDown={onKeyHandler}
          autoFocus
          sx={{
            width: "100%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Button
                  variant="contained"
                  size="small"
                  onClick={onSubmitHandler}
                >
                  SAVE
                </Button>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <div style={{ height: "48px", lineHeight: "48px" }}>
          <span
            onDoubleClick={onClickHandler}
            style={{
              display: "inline-block",
              maxWidth: "300px",
              overflow: "hidden",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            {props.text}
          </span>{" "}
          <img
            src={editIcon}
            alt={"edit"}
            style={{ verticalAlign: "baseline", cursor: "pointer" }}
            onClick={onClickHandler}
          />
        </div>
      )}
    </div>
  );
}
