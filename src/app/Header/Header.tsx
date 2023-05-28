import Container from "@mui/material/Container/Container";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Button from "@mui/material/Button/Button";
import logo from "assets/logo.svg";
import { RouterPaths } from "common/router/router";
import { Avatar } from "features/auth/Avatar/Avatar";
import AppBar from "@mui/material/AppBar/AppBar";
import { useAppSelector } from "app/hooks";
import { Link } from "react-router-dom";

export function Header() {
  const name = useAppSelector((state) => state.auth.profile?.name);

  return (
    <AppBar position="static" color="inherit">
      <Container sx={{ maxWidth: "1000px" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src={logo} alt="" />
          <div>
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
              <Button component={Link} to={RouterPaths.signin}>
                Sign In
              </Button>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}