import styled from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  & > div {
  }
`;
const ColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
  column-gap: 10rem;
  padding: 30px;
`;
export { Row, ColumnGrid };
