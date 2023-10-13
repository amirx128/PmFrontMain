import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import ListIcon from "@mui/icons-material/ListOutlined";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FactCheckIcon from "@mui/icons-material/FactCheck";

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
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../../redux/features/userSlicer";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 200;

export default function PersistentDrawerLeft({ open, closeDrawer }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const { pathname } = location;
    const isActive = MenuList.find((menu) =>
      menu?.subMenus?.some((sub) => sub.route === pathname)
    );
    setActiveMenu(isActive ? isActive.id : null);
    setOpenCollapse(!!isActive);
  }, []);

  const handleClickMenu = (id) => {
    setActiveMenu(openCollapse ? null : id);
    setOpenCollapse((prev) => !prev);
  };
  const handleClickSubMenu = (route) => {
    navigate(route);
  };
  const exitHandler = () => {
    dispatch(setLoggedOut(false));
    localStorage.removeItem("user");
    navigate("/login");
    navigate(0);
  };
  const MenuList = [
    {
      id: 2,
      name: "مدیریت درخواست",
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
          name: "ثبت درخواست ",
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
          id: 0,
          name: "لیست انتظار تائید درخواست",
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
          name: "لیست تائید درخواست",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/support/Approved-list",
          role: UserRole.Approver,
        },
        {
          id: 2,
          name: "لیست انتظار تصویب درخواست",
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
          name: "لیست تصویب درخواست",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/support/final-Approved-list",
          role: UserRole.FinalApprove,
        },
      ],
    },
    {
      id: 5,
      name: "مدیریت خرید",
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
          name: "لیست انتظار درخواست خرید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/logistics/queue",
          role: UserRole["Purchase.Logistics"],
        },
        {
          id: 1,
          name: "لیست درخواست خرید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/logistics/send-items",
          role: UserRole["Purchase.Logistics"],
        },
        {
          id: 2,
          name: "لیست انتظار بررسی مالی خرید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/financials/queue",
          role: UserRole["Purchase.Financial"],
        },
        {
          id: 3,
          name: "لیست بررسی مالی خرید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/financials/send-items",
          role: UserRole["Purchase.Financial"],
        },
        {
          id: 4,
          name: "لیست انتظار دستور خرید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/approve/queue",
          role: UserRole["Purchase.Approver"],
        },
        {
          id: 5,
          name: "لیست دستور خرید",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/approve/send-items",
          role: UserRole["Purchase.Financial"],
        },
      ],
    },
    {
      id: 7,
      name: "مدیریت انبار",
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
          name: "لیست انتظار تحویل انبار",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/warehosue/warehouse-queue",
          role: UserRole["Warehouse.Warehouser"],
        },
        {
          id: 1,
          name: "لیست تحویل انبار",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/warehosue/warehouse-sentitems",
          role: UserRole["Warehouse.Warehouser"],
        },
        {
          id: 2,
          name: "لیست انتظار خروج از انبار",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/warehosue/exitwarehouse-queue",
          role: UserRole["Warehouse.Exit"],
        },
        {
          id: 3,
          name: "لیست خروج از انبار",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/warehosue/exitwarehouse-sentitems",
          role: UserRole["Warehouse.Exit"],
        },
      ],
    },
    {
      id: 4,
      name: "مدیریت درخواست کنندگان",
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
          id: 2,
          name: "لیست درخواست های ارسال شده",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/requestcase-sentitem",
          role: UserRole.Requester,
        },
        {
          id: 1,
          name: "لیست حواله های دریافتی",
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
      ],
    },
    {
      id: 6,
      name: "مدیریت تامین کنندگان",
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
          name: "لیست انتظار بررسی تامین کننده",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/supplier/supplier-queue",
          role: UserRole.Supplier,
        },
        {
          id: 1,
          name: "لیست بررسی تامین کننده",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/supplier/supplier-sentitem",
          role: UserRole.Supplier,
        },
      ],
    },
    {
      id: 8,
      name: "کنترل کیفیت",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <FactCheckIcon fontSize="large" />
        </ListItemIcon>
      ),
      subMenus: [
        {
          id: 0,
          name: "آیتم اصلی",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/qc/originalItems",
          role: UserRole.Admin,
        },
        {
          id: 1,
          name: "آیتم فرعی",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/qc/subItems",
          role: UserRole.Admin,
        },
        {
          id: 2,
          name: "تعریف کاربری",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/qc/defineUsability",
          role: UserRole.Admin,
        },
        {
          id: 3,
          name: "چک لیست ها",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/qc/checkLists",
          role: UserRole.Admin,
        },
        {
          id: 4,
          name: "شروع چک لیست ها",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/qc/checkListInstances",
          role: UserRole.Admin,
        },
      ],
    },
    {
      id: 10,
      name: "پیمانکار",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <FactCheckIcon fontSize="large" />
        </ListItemIcon>
      ),
      subMenus: [
        {
          id: 0,
          name: "منتظر اعلام زمان",
          icon: (
            <ListItemIcon
              sx={{ color: theme.palette.secondary.light }}
              style={{ justifyContent: "center" }}
            >
              <HomeIcon fontSize="large" />
            </ListItemIcon>
          ),
          route: "/qc/ContractorAddDate",
          role: UserRole.Admin,
        },
      ],
    },
    {
      id: 3,
      name: "مدیریت سیستم",
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
          name: "مدیریت کاربران",
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
          name: "تعاریف پایه",
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
          name: "مدیریت کالاها",
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
        // ,
        // {
        //   id: 3,
        //   name: "نقش ها",
        //   icon: (
        //     <ListItemIcon
        //       sx={{ color: theme.palette.secondary.light }}
        //       style={{ justifyContent: "center" }}
        //     >
        //       <HomeIcon fontSize="large" />
        //     </ListItemIcon>
        //   ),
        //   route: "/roles",
        //   role: UserRole.Admin,
        // },
      ],
    },
    {
      id: 9,
      name: "خروج",
      icon: (
        <ListItemIcon
          sx={{ color: theme.palette.secondary.light }}
          style={{ justifyContent: "center" }}
        >
          <LogoutIcon fontSize="large" />
        </ListItemIcon>
      ),
      role: "public",
      clickHandler: exitHandler,
    },
  ];
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
      <DrawerHeader theme={theme} sx={{ mt: 3 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            color="white"
            fontSize={13}
            sx={{ ml: 5, cursor: "pointer", "&:hover": { color: "GrayText" } }}
            onClick={() => navigate("/profile")}
          >
            {user?.fullName}
          </Typography>
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
        </div>
      </DrawerHeader>
      <Divider />
      <List>
        {MenuList.map((item, index) => (
          <Fragment key={index}>
            {(item.subMenus
              ?.map((subMenu) => subMenu.role)
              .some((subMneu) =>
                user.usersRoles.map((role) => role.id).includes(subMneu)
              ) ||
              item?.role === "public") && (
              <>
                <ListItem
                  key={item.id}
                  style={{
                    backgroundColor:
                      activeMenu === item.id && theme.palette.secondary.main,
                  }}
                >
                  <ListItemButton
                    onClick={() =>
                      item.clickHandler
                        ? item.clickHandler()
                        : handleClickMenu(item.id)
                    }
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
                          {user.usersRoles
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
