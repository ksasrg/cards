import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useAppSelector } from "app/hooks";

type Props = {
  className?: string;
};

export function ProgressLine({ className }: Props) {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return <div className={className}>{isLoading && <LinearProgress />}</div>;
}
