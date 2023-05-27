import { useAppSelector } from "app/hooks";
import noavatar from "assets/noavatar.png";

type PropsType = {
  size: number;
  marginTop?: number;
};

export function Avatar(props: PropsType) {
  const { size, marginTop } = props;
  const avatar = useAppSelector((state) => state.auth.profile?.avatar);

  return (
    <img
      src={avatar || noavatar}
      alt="avatar"
      style={{ borderRadius: "50%", width: size, height: size, marginTop }}
    />
  );
}
