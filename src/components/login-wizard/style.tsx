import { styled } from "styled-components";

const Container = styled('main')(({ theme }) => ({
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.primary.light,
    display: 'flex'
}))

const LoginVector = styled.img`
width:100%;
height:100%
`;

export { Container, LoginVector }