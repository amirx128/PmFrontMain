import { Box, styled } from "@mui/material";

const Container = styled<any>(Box)(({theme}) => ({
  ".MuiFormControl-root": {
    width: "100%",
  },
  ".MuiFormLabel-root": {
    textAlign: "left",
    color: `${theme.palette.text.primary} !important`,
    fontFamily: "IRANSans",
  },
  ".MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
  },
}));
export { Container };
