import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export function Preloader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={150} />
    </div>
  );
}
