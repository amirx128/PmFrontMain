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
    [theme.breakpoints.up("xs")]: {
        maxWidth: '100%',
        width: '100%'
    },
    [theme.breakpoints.up("lg")]: {
        maxWidth: '450px',
        width: '100%'
    }
}))
const ContentLeftWrapper = styled('section')(({ theme }) => ({
    flex: '1 1 auto',
    height: '100%',
    [theme.breakpoints.up("xs")]: {
        display: 'none '
    },
    [theme.breakpoints.up("lg")]: {
        display: 'flex'
    }
}))
const LoginVector = styled.img`
width:100%;
height:100%
`;

export { Container, ContentRightWrapper, ContentLeftWrapper, LoginVector }