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

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: end;
`;
export { Row, StyledBox, ButtonContainer, StyledForm };
