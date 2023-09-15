import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  styled,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Input from "../../../components/input/input";
import { NavLink } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
type FormFields = {
  username: string;
  password: string;
};

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));
interface Iprps {
  onSubmit: (...args) => void;
  loading: boolean;
}
const LoginForm: React.FC<Iprps> = ({ onSubmit, loading }) => {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormFields>();
  const submitForm = handleSubmit((data) => {
    console.log("submitting...", data);
    console.log("errors...", errors);
    onSubmit(data);
  });
  return (
    <form onSubmit={submitForm}>
      <Input
        name="username"
        label="نام کاربری"
        register={register}
        errors={errors}
      />
      <Input
        type="password"
        name="password"
        label="رمز عبور"
        register={register}
        errors={errors}
      />
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={<Checkbox style={{ color: theme.palette.secondary.dark }} />}
          label="Remember Me"
        />
        {/* <NavLink to="/"> */}
        {/* <LinkStyled sx={{color:theme.palette.secondary.dark}} onClick={(e) => e.preventDefault()}> */}
        <LinkStyled
          sx={{ color: theme.palette.secondary.dark }}
          onClick={(e) => e.preventDefault()}
        >
          فراموشی کلمه عبور
        </LinkStyled>
        {/* </LinkStyled> */}
        {/* </NavLink> */}
      </Box>

      <LoadingButton
        disabled={!isDirty && !isValid}
        sx={{ borderRadius: "8px" }}
        type="submit"
        loading={loading}
        fullWidth={true}
        variant="contained"
        color="info"
        size="large"
      >
        ورود
      </LoadingButton>
    </form>
  );
};
export default LoginForm;
