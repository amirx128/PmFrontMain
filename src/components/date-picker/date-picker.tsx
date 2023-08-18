import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Container } from "./style";
import React from "react";
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
  register: UseFormRegister<any>;
  className?: string;
  rules?: RegisterOptions;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  defaultValue?: any;
  onChange?: (newType: string) => void;
  errors?: Partial<DeepMap<any, FieldError>>;
}
const JalaliDatePicker: React.FC<IProps> = (props) => {
  const theme = useTheme();
  return (
    // <Container sx={{ width: "100%" }}>
    //   <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
    //     <DatePicker
    //       label={props.label}
    //       {...props.register(props.name, {
    //         // required: `فیلد ${props.name}  نمیتواند خالی باشد.`,
    //         required: props.required,
    //         disabled: props.disabled,
    //       })}
    //       onChange={(e) => console.log(e)}
    //       minDate={new Date(2010, 1, 1)}
    //       maxDate={new Date()}
    //       value={new Date()}
    //     />
    //   </LocalizationProvider>
    //  </Container>
    <Container sx={{ width: "100%" }} theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePicker
          defaultValue={props.defaultValue}
          onChange={(e) => props.onChange(e)}
          label={props.label}
          minDate={new Date(2010, 1, 1)}
          value={new Date()}
        />
      </LocalizationProvider>
    </Container>
  );
};
export default JalaliDatePicker;
