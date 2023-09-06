import { MenuItem, TextField, useTheme } from "@mui/material";
import React from "react";
import { InputContainer } from "./style";

interface Iprops {
  options: any[];
  valuefieldName?: string;
  labelFieldName?: string;
  field: any;
  label: string;
  disabled?: boolean;
  defaultValue?: string;
}
const SelectComponent: React.FC<Iprops> = (props: Iprops) => {
  const theme = useTheme();
  return (
    <InputContainer>
      <TextField
        disabled={props.disabled}
        sx={{ textAlign: "left" }}
        select
        label={props.label}
        fullWidth
        {...props.field}
        defaultValue={props.defaultValue}
      >
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
    </InputContainer>
  );
};
export default SelectComponent;
