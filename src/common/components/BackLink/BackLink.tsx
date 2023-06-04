import { RouterPaths } from "common/router/router";
import { Link } from "react-router-dom";
import s from "./style.module.css";

export const BackLink = () => {
  return (
    <Link to={RouterPaths.main} className={s.link}>
      🡰 Back to Packs List
    </Link>
  );
};
