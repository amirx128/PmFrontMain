import { Button } from "@mui/material";
import Input from "../../input/input";
import { useForm } from "react-hook-form";

const ConfirmationCodeForm = ({ onSubmit }) => {
  type FormFields = {
    username: string;
    code: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const submitForm = handleSubmit((data) => {
    localStorage.setItem("TOKEN", "token");
    // navigate("/");
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
      <Input name="code" label="کد تایید" register={register} errors={errors} />
      <Button
        type="submit"
        fullWidth={true}
        variant="contained"
        color="info"
        size="large"
      >
        ورود
      </Button>
    </form>
  );
};
export default ConfirmationCodeForm;
