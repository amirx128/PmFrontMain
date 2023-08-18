



import { styled } from "styled-components";

const Container = styled('main')(({ theme }) => ({
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.primary.light,
    display: 'flex'
}))
const ContentRightWrapper = styled('section')(({ theme }) => ({
    maxWidth: '450px',
    minWidth: '360px',
    padding: '1.75rem',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,

}))
const ContentLeftWrapper = styled('section')(({ }) => ({
    flex: '1 1 auto',
    height: '100%'
}))
const LoginVector = styled.img`
width:100%;
height:100%
`;

export { Container, ContentRightWrapper, ContentLeftWrapper, LoginVector }