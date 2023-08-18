import { TextField } from "@mui/material";
import {
  DeepMap,
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { useTheme } from "@mui/material/styles";

interface Iprops {
  type?: string;
  name: string;
  label: string;
  register: UseFormRegister<any>;
  className?: string;
  defaultValue?: any;
  rules?: RegisterOptions;
  disabled?: boolean;
  required?: boolean;
  errors?: Partial<DeepMap<any, FieldError>>;
}
const Input: React.FC<Iprops> = (props: Iprops) => {
  const theme = useTheme();
  const rules = props.rules ?? {};
  // {...(props.register(props.name) &&
  //   props.register(props.name, {
  //     required: `The ${props.name} field shouldn't be empty.`,
  //   }))}
  return (
    <>
      <TextField
        fullWidth
        label={props.label}
        className={props.className}
        defaultValue={props.defaultValue}
        type={props.type}
        InputLabelProps={{ shrink: true }}
        InputProps={{ sx: { borderRadius: "8px" } }}
        {...props.register(props.name, {
          required: {
            value: props.required ?? false,
            message: `${props.name} is required`,
          },
          disabled: props.disabled,
        })}
        helperText={
          props.errors && props.errors[props.name]
            ? props.errors[props.name].message
            : ""
        }
      />
      <p
        className={
          "font-serif text-sm text-left block text-red-600 " + props.className
        }
      >
        {props.errors && props.errors[props.name]
          ? props.errors[props.name].message
          : ""}
      </p>
    </>
  );
};
export default Input;
