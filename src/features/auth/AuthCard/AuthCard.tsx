import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import React, { FC, ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

export const AuthCard: FC<PropsType> = ({ children }) => {
  return (
    <>
      <Container fixed>
        <Grid container justifyContent={"center"}>
          <Grid item marginTop={"60px"}>
            <Paper
              elevation={2}
              sx={{
                textAlign: "center",
                padding: "42px 33px",
                minWidth: "400px",
              }}
            >
              {children}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
