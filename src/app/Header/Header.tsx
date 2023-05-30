import Container from "@mui/material/Container/Container";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Button from "@mui/material/Button/Button";
import logo from "assets/logo.svg";
import { RouterPaths } from "common/router/router";
import { Avatar } from "features/auth/Avatar/Avatar";
import AppBar from "@mui/material/AppBar/AppBar";
import { useAppSelector } from "app/hooks";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const name = useAppSelector((state) => state.auth.profile?.name);

  return (
    <AppBar position="static" color="inherit">
      <Container style={{ maxWidth: "1048px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "60px",
            alignItems: "center",
          }}
        >
          <Link to={RouterPaths.main}>
            <img src={logo} alt="" />
          </Link>
          <div style={{ display: "flex", alignItems: "center" }}>
            {name ? (
              <>
                <span
                  style={{
                    borderBottom: "1px dashed #000000",
                    lineHeight: "24px",
                    marginRight: "12px",
                    maxWidth: "300px",
                    overflow: "hidden",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  <Link
                    to={RouterPaths.profile}
                    style={{
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "16px",
                      lineHeight: " 24px",
                      color: "#000000",
                    }}
                  >
                    {name}
                  </Link>
                </span>
                <span style={{ verticalAlign: "middle" }}>
                  <Link to={RouterPaths.profile}>
                    <Avatar size={36} />
                  </Link>
                </span>
              </>
            ) : (
              <Button onClick={() => navigate(RouterPaths.signin)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </Container>
    </AppBar>
  );
}
