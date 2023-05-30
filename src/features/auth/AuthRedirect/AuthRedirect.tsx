import { useAppSelector } from "app/hooks";
import { RouterPaths } from "common/router/router";
import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type PropsType = {
  children: ReactNode;
};

export const AuthRedirect: FC<PropsType> = ({ children }) => {
  const location = useLocation();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  if (!isAuthorized && location.pathname !== RouterPaths.signin) {
    return <Navigate to={RouterPaths.signin} state={{ from: location }} />;
  }

  return <>{children}</>;
};
