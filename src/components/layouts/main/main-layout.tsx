import Button from "@material-ui/core/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  FunctionComponent,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import PersistentDrawerLeft from "../../drawer/drawer";
import { AppBarWrapper, DrawerHeader, Container, Main } from "./style";

const drawerWidth = 280;

export const MainLayout = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  useEffect(() => {
    document.title = title;
  }, [title]);
  const theme = useTheme();
  return (
    <Container
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
      theme={theme}
    >
      <CssBaseline />
      <AppBarWrapper
        position="fixed"
        open={open}
        theme={theme}
        sx={{
          backgroundColor: theme.palette.background.default,
          boxShadow: "none !important",
        }}
        drawerwidth={280}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleMenu}
            edge="start"
            sx={{ boxShadow: "none", mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <Typography color="primary" variant="h6" noWrap component="div">
            Header
          </Typography>
        </Toolbar>
      </AppBarWrapper>
      <PersistentDrawerLeft
        open={open}
        closeDrawer={toggleMenu}
      ></PersistentDrawerLeft>
      <Main open={open} theme={theme} drawerwidth={drawerWidth}>
        <DrawerHeader theme={theme} />
        {children}
      </Main>

      {/* <Title>Main Layout </Title> */}
    </Container>
  );
};
