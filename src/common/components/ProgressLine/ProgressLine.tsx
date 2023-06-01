import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useAppSelector } from "app/hooks";

export function ProgressLine() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return <div style={{ height: "4px" }}>{isLoading && <LinearProgress />}</div>;
}
