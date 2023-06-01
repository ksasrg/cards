import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard/AuthCard";
import mailsvg from "assets/mail.svg";
import Button from "@mui/material/Button/Button";
import { RouterPaths } from "common/router/router";

export function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state?.email) {
    return <Navigate to={RouterPaths.forgot} />;
  }

  return (
    <AuthCard>
      <h1>Check Email</h1>
      <img src={mailsvg} alt="" style={{ marginTop: "28px" }} />
      <div className="auth_text">
        We’ve sent an Email with instructions to{" "}
        {location.state?.email || "<no_email>"}
      </div>
      <Button
        size="large"
        sx={{ marginTop: "41px" }}
        onClick={() => navigate(RouterPaths.signin)}
      >
        Back to login
      </Button>
    </AuthCard>
  );
}
