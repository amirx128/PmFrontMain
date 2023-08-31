import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Container } from "./style";
import React, { useEffect } from "react";
import {
  DeepMap,
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { useTheme } from "@mui/material";
interface IProps {
  name: string;
  label: string;
  className?: string;
  rules?: RegisterOptions;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  defaultValue?: any;
  onChange?: (newType: string) => void;
  errors?: Partial<DeepMap<any, FieldError>>;
  value?: any;
}
const JalaliDatePicker: React.FC<IProps> = (props) => {
  const theme = useTheme();
  return (
    <Container sx={{ width: "100%" }} theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePicker
          defaultValue={new Date(+props.defaultValue)}
          onChange={(e) => props.onChange(e)}
          label={props.label}
          minDate={new Date(2010, 1, 1)}
          value={new Date(+props.value)}
        />
      </LocalizationProvider>
    </Container>
  );
};

export const JalaliDatePickerNew: React.FC<IProps> = (props) => {
  const theme = useTheme();
  return (
    <Container sx={{ width: "100%" }} theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePicker
          defaultValue={props.defaultValue}
          onChange={(e) => props.onChange(e)}
          label={props.label}
          minDate={new Date(2010, 1, 1)}
          value={new Date(props.defaultValue ?? "")}
        />
      </LocalizationProvider>
    </Container>
  );
};
export default JalaliDatePicker;
