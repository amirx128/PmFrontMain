import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import ListIcon from "@mui/icons-material/ListOutlined";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import RoleIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import Warehouse from "@mui/icons-material/WarehouseOutlined";
import Support from "@mui/icons-material/SupportAgentOutlined";
import SupportApprove from "@mui/icons-material/SupportTwoTone";
import ProductIcon from "@mui/icons-material/CategoryOutlined";
import { useTheme } from "@mui/material/styles";
import { DrawerHeader } from "./style";
import { useNavigate } from "react-router-dom";
import { ListItemText } from "@mui/material";

const drawerWidth = 280;

export default function PersistentDrawerLeft({ open, closeDrawer }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const MenuList = [
    {
      id: 1,
      name: " داشبورد",
      icon: (
        <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
        <HomeIcon />
      </ListItemIcon>
      ),
      route: "/",
    },
    {
      id: 2,
      name: " درخواست کالا ",
      icon: (
        <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
        <ListIcon />
      </ListItemIcon>
       
      ),
      route: "/productRequest",
    },
    {
      id: 3,
      name: "لیست کاربران ",
      icon: (
        <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
        <RoleIcon />
      </ListItemIcon>
       
      ),
      route: "/users",
    },
    {
      id: 4,
      name: "لیست نقش ها ",
      icon: (
        <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
        <RoleIcon />
      </ListItemIcon>
       
      ),
      route: "/roles",
    },
    {
      id: 5,
      name: "دسته بندی کالا ها ",
      icon: (
        <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
        <ProductIcon />
      </ListItemIcon>
       
      ),
      route: "/",
    },
    {
      id: 6,
      name: "  پشتیبانی - تصویب ",
      icon: (
        <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
        <Support />
      </ListItemIcon>
       
      ),
      route: "/supportFinalApprove",
    },
    {
      id: 7,
      name: "پشتیبانی - تایید ",
      icon: (
        <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
        <SupportApprove />
      </ListItemIcon>
       
      ),
      route: "/supportApprove",

    },
    {
      id: 8,
      name: "  انبار ",
      icon: (
        <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
        <Warehouse />
      </ListItemIcon>
       
      ),
      route: "/",
    },
  ];
  const handleClick = (route: any) => {
    navigate(route);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    
      PaperProps={{ style: { backgroundColor: theme.palette.primary.main} }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader theme={theme}>
        <IconButton onClick={closeDrawer}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon color="primary" sx={{ color: 'primary' }} />
          ) : (
            <ChevronRightIcon color="primary" sx={{color:'primary', colordisablePadding: 'primary' }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {MenuList.map((item, index) => (
          <ListItem key={item.id} >
            <ListItemButton onClick={()=>handleClick(item.route)}>
              <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
                {item["icon"]}
              </ListItemIcon>
              <ListItemText
                sx={{ color: theme.palette.common.white }}
                primary={item.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
