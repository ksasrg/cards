import { RouterPaths } from "common/router/router";
import { Link, useLocation } from "react-router-dom";
import s from "./style.module.css";

export const BackLink = () => {
  const location = useLocation();
  console.log(location);

  const backlink =
    location.state?.from.pathname + location.state?.from.search ||
    RouterPaths.main;

  return (
    <Link to={backlink} className={s.link}>
      🡰 Back to Packs List
    </Link>
  );
};
