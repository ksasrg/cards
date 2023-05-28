import React, {
  useState,
  KeyboardEvent,
  FocusEvent,
  ChangeEvent,
  MouseEvent,
} from "react";
import editIcon from "assets/editIcon.svg";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import Button from "@mui/material/Button/Button";

type PropsType = {
  text: string;
  style: React.CSSProperties | undefined;
  onChange: (text: string) => void;
};

export function Editable(props: PropsType) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const onClickHandler = () => {
    setEdit(true);
    setText(props.text);
  };

  const onCloseHandler = () => {
    // if (event.key === "Enter" || event.type === "blur") {
    setEdit(false);
    props.onChange(text);
    // }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);

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
          sx={{
            width: "100%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Button
                  variant="contained"
                  size="small"
                  onClick={onCloseHandler}
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
