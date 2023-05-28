import { useLocation, useNavigate } from "react-router-dom";
import { AuthCard } from "../AuthCard/AuthCard";
import mailsvg from "assets/mail.svg";
import Button from "@mui/material/Button/Button";
import { RouterPaths } from "common/router/router";
import { Link } from "react-router-dom";

export function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AuthCard>
      <h1>Check Email</h1>
      <img src={mailsvg} alt="" style={{ marginTop: "28px" }} />
      <div
        style={{
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "24px",
          color: "#000000",
          opacity: "0.5",
          marginTop: "31px",
        }}
      >
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
