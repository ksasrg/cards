import Button from "@mui/material/Button/Button";
import logo from "assets/logo.svg";
import { RouterPaths } from "common/router/router";
import { Avatar } from "common/components";
import { useAppSelector } from "app/hooks";
import { Link, useNavigate } from "react-router-dom";
import s from "./style.module.css";
import { ProgressLine } from "../ProgressLine/ProgressLine";

export const Header = () => {
  const navigate = useNavigate();
  const name = useAppSelector((state) => state.auth.profile?.name);

  return (
    <header className={s.appbar}>
      <ProgressLine className={s.progress} />
      <div className="container">
        <div className={s.header}>
          <Link to={RouterPaths.main}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={s.block}>
            {name ? (
              <>
                <Link to={RouterPaths.profile} className={s.name}>
                  {name}
                </Link>
                <Link to={RouterPaths.profile}>
                  <Avatar size={36} />
                </Link>
              </>
            ) : (
              <Button onClick={() => navigate(RouterPaths.signin)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
