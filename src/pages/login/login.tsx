import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoginWizard from "../../components/login-wizard/login-wizard";
import { Container, ContentLeftWrapper, ContentRightWrapper, LoginVector } from "./style";
import LoginImg from "/assets/images/login-vector.svg";
interface Iprops { }

const LoginPage: React.FC<Iprops> = (props: Iprops) => {
    const theme = useTheme();


    return (
        <Container theme={theme}>
            <ContentRightWrapper theme={theme}>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary,marginBottom:'30px'}}>
                    Welcome to App
                </Typography>
                <LoginWizard></LoginWizard>
            </ContentRightWrapper>
            <ContentLeftWrapper theme={theme}>
                <LoginVector src={LoginImg}></LoginVector>
            </ContentLeftWrapper>
        </Container>
    );
};
export default LoginPage;