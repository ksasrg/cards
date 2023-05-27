import { AuthCard } from "../AuthCard/AuthCard";
import { Link, Navigate } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "../auth.slice";
import Button from "@mui/material/Button/Button";

function Profile() {
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.auth.profile?.email);
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  if (!isAuthorized) {
    return <Navigate to={RouterPaths.signin} />;
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
        <div>{email}</div>
        <Button sx={{ marginTop: "68px" }} onClick={logoutHandler}>
          Log out
        </Button>
      </AuthCard>
    </>
  );
}

export default Profile;
