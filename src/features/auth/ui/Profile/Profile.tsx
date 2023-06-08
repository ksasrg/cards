import Button from "@mui/material/Button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { Avatar, BackLink } from "common/components";
import { Editable } from "features/auth/components/Editable/Editable";

export function Profile() {
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.auth.profile?.email);
  const name = useAppSelector((state) => state.auth.profile?.name);

  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  const onEditableChange = (name: string) => {
    dispatch(authThunks.update({ name }));
  };

  return (
    <div className="container page">
      <BackLink />
      <div className="card">
        <h1>Personal Information</h1>
        <Avatar size={96} marginTop={30} />
        {name && (
          <Editable
            text={name}
            onSubmit={onEditableChange}
            style={{ marginTop: "17px" }}
          />
        )}
        <div style={{ marginTop: "14px", lineHeight: "24px" }}>{email}</div>
        <Button sx={{ marginTop: "29px" }} onClick={logoutHandler}>
          Log out
        </Button>
      </div>
    </div>
  );
}
