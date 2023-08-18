import { Box } from "@mui/material";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Label=styled.div`
font-size: 14px;
font-weight: bold;
`;
const Value=styled.div`
font-size: 12px;
`;
const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
    //   borderRight: `1px solid ${theme.palette.divider}`
    }
  }))
export {Row,Label,Value,StyledBox}