import styled from "styled-components";
import { Box } from "@mui/material";

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  & > div {
  }
`;
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    //   borderRight: `1px solid ${theme.palette.divider}`
  },
}));
export { Row, StyledBox };
