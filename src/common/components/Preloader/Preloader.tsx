import s from "./style.module.css";

export function Preloader() {
  return (
    <div className={s.container}>
      <div className={s.loader} />
    </div>
  );
}
