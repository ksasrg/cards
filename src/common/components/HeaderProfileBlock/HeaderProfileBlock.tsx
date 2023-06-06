import { usePopover } from "common/hooks/usePopover";
import { Avatar } from "../Avatar/Avatar";
import { RouterPaths } from "common/router/router";
import { useAppDispatch } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";
import userIcon from "assets/user.svg";
import outIcon from "assets/logout.svg";
import s from "./style.module.css";

export const HeaderProfileBlock = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [clickbox, popover] = usePopover("box", "popover");

  return (
    <div className={s.block} id={clickbox}>
      <div className={s.name}>{name}</div>
      <div style={{ position: "relative", cursor: "pointer" }}>
        <Avatar size={36} />
        <div id={popover} className={s.popover}>
          <div onClick={() => navigate(RouterPaths.profile)}>
            <img src={userIcon} alt="" /> Profile
          </div>
          <div onClick={() => dispatch(authThunks.logout())}>
            <img src={outIcon} alt="" /> Logout
          </div>
        </div>
      </div>
    </div>
  );
};
