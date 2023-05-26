import { createTheme } from "@mui/material";

// declare module "@mui/material/Button" {
//   interface ButtonPropsVariantOverrides {
//     radius: true;
//   }
// }

export const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      variants: [
        // {
        //   props: { variant: "radius" },
        //   style: { borderRadius: "30px" },
        // },
        {
          props: { size: "large" },
          style: { width: "100%", maxWidth: "345px" },
        },
      ],
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: "20px",
          borderRadius: "30px",
          padding: "8px 28px",
          backgroundColor: "#366EFF",
          color: "#fff",
          textTransform: "initial",
          boxShadow:
            "0 4px 18px rgba(54, 110, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
          "&:hover": {
            backgroundColor: "#205eff",
          },
        },
      },
    },
  },
});
