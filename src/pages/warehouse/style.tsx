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





const StyledComponent123 = styled.div`
  background-color: lightblue;
  color: darkblue;
  font-size: 16px;
`;

function PageTileComponent(__title) {
  return (
    <div className="mb-20 mt-6 text-3xl flex justify-center">
      <p className="border border-slate-500 p-6"> {__title.__text} </p>
    </div>
  );
}



export { Row, StyledBox, ButtonContainer, StyledForm  ,PageTileComponent };


