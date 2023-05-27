import { AuthCard } from "../AuthCard/AuthCard";
import { Link, Navigate, useLocation } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "../auth.slice";
import Button from "@mui/material/Button/Button";
import { Avatar } from "../Avatar/Avatar";

function Profile() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const email = useAppSelector((state) => state.auth.profile?.email);
  const name = useAppSelector((state) => state.auth.profile?.name);

  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  if (!isAuthorized) {
    return <Navigate to={RouterPaths.signin} state={{ from: location }} />;
  }

  return (
    <>
      <Link
        to={RouterPaths.main} // TODO Back to Packs List
        style={{
          color: "#366EFF",
          display: "block",
          marginTop: "11px",
          fontSize: "20px",
        }}
      >
        Back to Packs List
      </Link>
      <AuthCard>
        <h1>Personal Information</h1>
        <Avatar size={96} marginTop={30} />
        <div style={{ marginTop: "17px" }}>{name}</div>
        <div style={{ marginTop: "14px" }}>{email}</div>
        <Button sx={{ marginTop: "29px" }} onClick={logoutHandler}>
          Log out
        </Button>
      </AuthCard>
    </>
  );
}

export default Profile;
