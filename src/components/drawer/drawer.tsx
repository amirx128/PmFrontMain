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
import { useLocation, useNavigate } from "react-router-dom";
import { ListItemText, Typography } from "@mui/material";
import { Abc, ExpandMore, ExpandLess, Inventory } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useState, Fragment, useRef, useEffect } from "react";
import UserRole from "../../core/enums/userRoleEnum";
const drawerWidth = 200;

export default function PersistentDrawerLeft({ open, closeDrawer }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [userRoles, setUserRoles] = useState(
    () => JSON.parse(localStorage.getItem("user")).usersRoles
  );

  useEffect(() => {
    const { pathname } = location;
    const isActive = MenuList.find((menu) =>
      menu.subMenus.some((sub) => sub.route === pathname)
    );
    setActiveMenu(isActive ? isActive.id : null);
    setOpenCollapse(!!isActive);
  }, []);

  const MenuList = [
    {
      id: 2,
      name: " درخواست کالا ",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <ListIcon fontSize="large" />
        </ListItemIcon>
      ),

      subMenus: [
        {
          id: 0,
          name: "ثبت درخواست جدید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/productRequest",
          role: UserRole.Requester,
        },
        {
          id: 1,
          name: "تحویل دریافت",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/requesteruser",
          role: UserRole.Requester,
        },
        {
          id: 2,
          name: "درخواست های ارسال شده",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole.Requester,
        },
      ],
    },
    {
      id: 3,
      name: "مدیریت",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <RoleIcon fontSize="large" />
        </ListItemIcon>
      ),
      subMenus: [
        {
          id: 0,
          name: "کاربران",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/users",
          role: UserRole.Admin,
        },
        {
          id: 1,
          name: "تعاریف",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/definitions",
          role: UserRole.Admin,
        },
        {
          id: 2,
          name: "کالا ها",
          icon: (
              <ListItemIcon
                  sx={{ color: theme.palette.secondary.light }}
                  style={{ justifyContent: "center" }}
              >
                <Inventory fontSize="large" />
              </ListItemIcon>
          ),
          route: "/commodities",
          role: UserRole.Admin,
        },
        {
          id: 3,
          name: "نقش ها",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/roles",
          role: UserRole.Admin,
        },
      ],
    },
    {
      id: 4,
      name: "پشتیبانی",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <RoleIcon fontSize="large" />
        </ListItemIcon>
      ),
      subMenus: [
        {
          id: 0,
          name: "منتظر تایید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/supportApprove",
          role: UserRole.Approver,
        },
        {
          id: 1,
          name: "تایید شده ها",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole.Approver,
        },
        {
          id: 2,
          name: "در صف تایید تهایی",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/supportFinalApprove",
          role: UserRole.FinalApprove,
        },
        {
          id: 3,
          name: "تایید شده ها",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole.FinalApprove,
        },
      ],
    },
    {
      id: 5,
      name: "خرید",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <ProductIcon fontSize="large" />
        </ListItemIcon>
      ),
      subMenus: [
        {
          id: 0,
          name: "تدارکات-منتظر بررسی",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Purchase.Logistics"],
        },
        {
          id: 1,
          name: "تدارکات-بررسی شده ها",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Purchase.Logistics"],
        },
        {
          id: 2,
          name: "مالی-منتظر بررسی",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Purchase.Financial"],
        },
        {
          id: 3,
          name: "مالی-بررسی شده ها",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Purchase.Financial"],
        },
        {
          id: 4,
          name: "تایید خرید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Purchase.Approver"],
        },
        {
          id: 5,
          name: "تایید شده ها",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Purchase.Financial"],
        },
      ],
    },
    {
      id: 6,
      name: "تامین کننده",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <Support fontSize="large" />
        </ListItemIcon>
      ),
      subMenus: [
        {
          id: 0,
          name: "در صف بررسی",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole.Supplier,
        },
        {
          id: 1,
          name: "بررسی شده",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole.Supplier,
        },
      ],
    },
    {
      id: 7,
      name: "انبار",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <SupportApprove fontSize="large" />
        </ListItemIcon>
      ),
      subMenus: [
        {
          id: 0,
          name: "در صف تحویل",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Warehouse.Warehouser"],
        },
        {
          id: 1,
          name: "تحویل گرفته شده",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Warehouse.Warehouser"],
        },
        {
          id: 2,
          name: "در صف خروج",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Warehouse.Exit"],
        },
        {
          id: 3,
          name: "خارج شده",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "",
          role: UserRole["Warehouse.Exit"],
        },
      ],
    },
  ];
  const handleClickMenu = (id) => {
    setActiveMenu(openCollapse ? null : id);
    setOpenCollapse((prev) => !prev);
  };
  const handleClickSubMenu = (route) => {
    console.log(route);
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
      PaperProps={{ style: { backgroundColor: theme.palette.primary.main } }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader theme={theme}>
        <IconButton onClick={closeDrawer}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon color="secondary" sx={{ color: "secondary" }} />
          ) : (
            <ChevronRightIcon
              color="secondary"
              sx={{ color: "secondary", colordisablePadding: "primary" }}
            />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {MenuList.map((item, index) => (
          <Fragment key={index}>
            {item.subMenus
              ?.map((subMenu) => subMenu.role)
              .some((subMneu) =>
                userRoles.map((role) => role.id).includes(subMneu)
              ) && (
              <>
                <ListItem
                  key={item.id}
                  style={{
                    backgroundColor:
                      activeMenu === item.id && theme.palette.secondary.main,
                  }}
                >
                  <ListItemButton
                    onClick={() => handleClickMenu(item.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <>{item["icon"]}</>
                    <ListItemText
                      sx={{ color: theme.palette.common.white }}
                      primary={item.name}
                    />

                    {item?.subMenus &&
                      (openCollapse && activeMenu === item.id ? (
                        <ExpandLess
                          sx={{ color: theme.palette.common.white }}
                        />
                      ) : (
                        <ExpandMore
                          sx={{ color: theme.palette.common.white }}
                        />
                      ))}
                  </ListItemButton>
                </ListItem>
                {item?.subMenus && (
                  <Collapse
                    in={openCollapse && activeMenu === item.id}
                    timeout="auto"
                  >
                    <List>
                      {item?.subMenus?.map((sub) => (
                        <Fragment key={sub.id}>
                          {userRoles
                            .map((role) => role.id)
                            ?.includes(sub.role) && (
                            <ListItemButton
                              onClick={() => handleClickSubMenu(sub.route)}
                              sx={{
                                "&:hover": {
                                  backgroundColor:
                                    theme.palette.secondary.light,
                                },
                              }}
                              key={sub.id}
                              style={{
                                backgroundColor:
                                  sub.route === location.pathname &&
                                  openCollapse &&
                                  theme.palette.secondary.main,
                              }}
                            >
                              <ListItem style={{ justifyContent: "center" }}>
                                <p
                                  style={{
                                    color: theme.palette.common.white,
                                    fontSize: "12px",
                                    textAlign: "center",
                                  }}
                                >
                                  {sub.name}
                                </p>
                              </ListItem>
                            </ListItemButton>
                          )}
                        </Fragment>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
            )}
          </Fragment>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
