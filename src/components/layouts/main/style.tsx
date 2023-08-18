import MuiAppBar from "@mui/material/AppBar";
import styled from "styled-components";
import Box from "@mui/material/Box";

const Container = styled(MuiAppBar)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  backgroundColor: theme.palette.background,
}));
const Title = styled.h1`
  font-size: 24px;
  color: #333333;
`;
const DrawerHeader = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const AppBarWrapper = styled(MuiAppBar)<{ open: boolean; drawerwidth: number }>(
  ({ theme, open, drawerwidth }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerwidth}px)`,
      marginRight: `${drawerwidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    backgroundColor: "#f5f5f5",
  })
);
// const Main = styled.main((props) => ({
//   flexGrow: 1,
//   padding: props.theme.spacing(3),
//   transition: props.theme.transitions.create("margin", {
//     easing: props.theme.transitions.easing.sharp,
//     duration: props.theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${props=>props.drawerWidth}px`,
//   ...(props.open && {
//     transition: props.theme.transitions.create("margin", {
//       easing: props.theme.transitions.easing.easeOut,
//       duration: props.theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));
const Main = styled("main")<{
  open?: boolean;
  drawerwidth: number;
}>(({ theme, open, drawerwidth }) => ({
  flexGrow: 1,
  overflowX:'auto',
  backgroundColor: theme.palette.background,
  width: `100%`,
  boxSizing: "border-box",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: `0`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.background,
    boxSizing: "border-box",
    marginRight: `${drawerwidth}px`,
    width: `calc(100% - ${drawerwidth}px)`,
  }),
}));
export { Container, Title, DrawerHeader, AppBarWrapper, Main };
