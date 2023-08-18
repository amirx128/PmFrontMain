import styled from "styled-components";
import Input from "../input/input";

const Row = styled.div`
  display: flex;
  margin-top: 30px;
  width: 100%;
  & > div {
    margin-left: 20px;
  }
  .muirtl-wb57ya-MuiFormControl-root-MuiTextField-root,.muirtl-hgex06-MuiFormLabel-root-MuiInputLabel-root{
  text-align: right !important;
  font-family: IRANSans !important;
}
.muirtl-hgex06-MuiFormLabel-root-MuiInputLabel-root{
  color:#4c4e64de !important;
  font-family: IRANSans !important;

}
.MuiAutocomplete-root .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(-14px, -6px) scale(0.75) !important;
  color:#4c4e64de !important;
  font-family: IRANSans !important;


}
`;
const InputContent = styled(Input)(({ theme }) => ({
  marginLeft: "20px",
  flex: "1",
}));
const Form = styled.form`
  width: 100%;
`;
const TreeWrapper = styled.div`
  flex: 1;
  border: 1px dashed #a7a2a2;
  .MuiTreeItem-iconContainer {
    svg {
      transform: rotate(180deg);
    }
  }
`;

const DatePickerWrapper = styled.div`
  flex: 1;
  & > div {
    flex: 1;
    width: 100%;
  }
  input {
    width: 100% !important;
    height: 56px !important;
    font-family: IRANSans;
  }
`;
export { Row, InputContent, Form, TreeWrapper, DatePickerWrapper };
