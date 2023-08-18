import { styled } from "styled-components";

const Row = styled("div")<{
  justifycontent?: string;
}>(({ justifycontent }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginTop: "40px",
  justifyContent: justifycontent ?? "unset",
  "& > div": {
    marginLeft: "20px",
    flex:1
  },
}));

export { Row };

