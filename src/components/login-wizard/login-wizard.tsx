import axios from '../../utils/axios.config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILogin } from '../../core/user/user.model';
import { withSnackbar } from '../../utils/snackbar-hook';
import LoginForm from './login-form/login-form';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggined, setUser } from '../../redux/features/userSlicer.ts';
const LoginWizard = (props) => {
  const [wizardLoading, setWizardLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [step, setStep] = useState<number>(1);
  const { user } = useSelector((state: any) => state?.user);
  const onsubmitLoginForm = (data) => {
    data = {
      ...data,
      userId: user?.id ?? '0',
      captchaId: '1',
      captchaValues: '1',
    };
    login(data);
  };
  // const onSubmitConfirmationCodeForm = () => {
  //     navigate("/");

  // }
  const login = async (data: ILogin) => {
    setWizardLoading(true);
    try {
      const response = await axios.post('/AccountCountroller/Login', {
        ...data,
      });
      if (response && response.data) {
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data.model));
        dispatch(setUser(response.data.model));
        dispatch(setLoggined(true));
        const token = response.data.model?.token;
        localStorage.setItem('atkn', token);
      }
      props.snackbarShowMessage('ورود با موفقیت انجام شد');
      setWizardLoading(false);
      navigate(0);
    } catch (error) {
      setWizardLoading(false);
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <LoginForm loading={wizardLoading} onSubmit={onsubmitLoginForm} />

      {/* {
                step === 1 ? (<LoginForm onSubmit={onsubmitLoginForm}></LoginForm>) : (<ConfirmationCodeForm onSubmit={onSubmitConfirmationCodeForm}></ConfirmationCodeForm>)
            } */}
    </div>
  );
};
export default withSnackbar(LoginWizard);
