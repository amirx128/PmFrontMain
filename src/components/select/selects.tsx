import { MenuItem, TextField, useTheme } from "@mui/material";
import React from "react";
import { InputContainer } from "./style";

interface Iprops {
  // data: any[];
  // name: string;
  // label: string;
  // // defaultValue?: string;
  // register: UseFormRegister<any>;
  // className?: string;
  // rules?: RegisterOptions;
  // errors?: Partial<DeepMap<any, FieldError>>;
  options: any[];
  valuefieldName?: string;
  labelFieldName?: string;
  field: any;
  label:string;
  disabled?:boolean;
}
const SelectComponent: React.FC<Iprops> = (props: Iprops) => {
  const theme = useTheme();
  return (
    <InputContainer>
        <TextField disabled={props.disabled} sx={{textAlign:'left'}} select label={props.label} fullWidth {...props.field}>
        {props.options.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={props.valuefieldName ? item[props.valuefieldName] : item}
            >
              {props.labelFieldName ? item[props.labelFieldName] : item}
            </MenuItem>
          );
        })}
       </TextField>
      {/* <Selector
              defaultValue={UserStatus.DISABLED}
                select
                theme={theme}
                {...props.register(props.name)}
                variant="outlined"
                label={props.label}
                >
                {props.data.map((item, index) => (
                    <MenuItem key={index + 'status'} value={item}>{item}</MenuItem>
                ))}
                
            </Selector>
            <p
                className={
                    "font-serif text-sm text-left block text-red-600 " + props.className
                }
            >
                {props.errors && props.errors[props.name]
                    ? props.errors[props.name].message
                    : ""}
            </p> */}
    </InputContainer>
  );
};
export default SelectComponent;
