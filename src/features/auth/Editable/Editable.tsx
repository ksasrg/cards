import React, {
  useState,
  KeyboardEvent,
  FocusEvent,
  ChangeEvent,
  MouseEvent,
} from "react";

type PropsType = {
  text: string;
  style: React.CSSProperties | undefined;
  onChange: (text: string) => void;
};

export function Editable(props: PropsType) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const onDoubleClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    setEdit(true);
    setText(event.currentTarget.innerText);
  };

  const onCloseHandler = (
    event: KeyboardEvent<HTMLDivElement> & FocusEvent<HTMLInputElement, Element>
  ) => {
    if (event.key === "Enter" || event.type === "blur") {
      setEdit(false);
      props.onChange(event.target.value);
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div style={props.style}>
      {edit ? (
        <input
          type="text"
          onKeyDown={onCloseHandler}
          onBlur={onCloseHandler}
          onChange={onChangeHandler}
          autoFocus
          value={text}
          width="100%"
        />
      ) : (
        <div
          onDoubleClick={onDoubleClickHandler}
          style={{ width: "100%", overflow: "hidden" }}
        >
          {props.text}
        </div>
      )}
    </div>
  );
}
