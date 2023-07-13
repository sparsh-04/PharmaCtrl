import * as React from "react";
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  Box,
  List,
  ListItem,
  ListItemButton,
  Collapse,
  Button,
} from "@mui/material";
// import UserLoginComponent from "../userid/UserIdComponent";
import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect } from "react";
import {
  getCompany,
  getToken,
  isTokenExpired,
  parseJwt,
  removeToken,
} from "index/services/util/UtilService";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { HEADER_COLOR, SideMenuWidth } from "index/Constant";
import {
  getMenuGroupsFromApi,
  getModelingMenuFromApi,
} from "index/services/header/HeaderService";
import { IMenuGroup } from "index/vm";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SideMenuManageContext } from "index/providers/SideMenuManageProvider";
import { StatusContext } from "index/providers/StatusProvider";
import moment from "moment";
import AppButton from "index/shared/inputs/AppButton";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const {
    open,
    selectedMenuGroup,
    updateOpenStats,
    updateSelectedMenuGroup,
    updateMenuGroups,
  } = React.useContext(SideMenuManageContext);
  const { updateStatus } = React.useContext(StatusContext);
  const [networkId, setNetworkId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({} as any);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuGroups, setMenuGroups] = useState<IMenuGroup[]>([]);
  const [modelingMenu, setModelingMenu] = useState<any[]>([]);
  const [companyName, setcompanyName] = useState<string>("");
  const [curTime, setCurTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setCurTime(new Date());
    }, 1000);
    // let hasTokenExpired = isTokenExpired();
    let token = getToken();
    let setSelectedMenuFromLocal = localStorage.getItem("selectedMenu");
    let getNetworkId = localStorage.getItem("networkid");
    if (getNetworkId) {
      setNetworkId(getNetworkId);
    }
    if (token) {
      setIsLoggedIn(true);
      setSelectedMenu(setSelectedMenuFromLocal || "");
      // let parsedToken = parseJwt();
      // setUser(parsedToken);
      getMenuGroups();
    }
    let company = getCompany();
    setcompanyName(company ? company : "");
  }, []);

  const getMenuGroups = async () => {
    await getMenuGroupsFromApi().then(
      function (successResponse) {
        if (successResponse && successResponse.errorNo === 0) {
          // let menuGroups =
          //   (successResponse?.Data && successResponse.Data) || [];
          let response =
            successResponse.dTable && successResponse.dTable.length > 0
              ? successResponse.dTable
              : [];
          let tempMenuGroups: string[] = [];
          let groups: IMenuGroup[] = [];

          response.forEach(
            (ele: { group_name: string; menu_name: string; url: string }) => {
              if (tempMenuGroups.includes(ele.group_name)) {
                let index = groups.findIndex(
                  (e) => e.MenuGroup === ele.group_name
                );
                groups[index].MenuItems.push({
                  Name: ele?.menu_name || "",
                  URL: ele?.url || "",
                });
              } else {
                tempMenuGroups.push(ele.group_name);
                groups.push({
                  MenuGroup: ele.group_name,
                  MenuItems: [
                    { Name: ele?.menu_name || "", URL: ele?.url || "" },
                  ],
                });
              }
            }
          );
          setMenuGroups(groups);
          let menuGroups: string[] = groups.map((e) => e.MenuGroup);
          updateMenuGroups(menuGroups);
          getModelingMenu();
        } else {
          updateStatus(successResponse?.resultMessage, "error");
        }
      },
      function (errorResponse) {
        console.error(errorResponse);
      }
    );
  };

  const getModelingMenu = async () => {
    await getModelingMenuFromApi().then(
      function (successResponse) {
        if (successResponse && successResponse.errorNo === 0) {
          setModelingMenu(successResponse.dTable);
        } else {
          updateStatus(successResponse?.resultMessage, "error");
        }
      },
      function (errorResponse) {
        console.error(errorResponse);
      }
    );
  };

  const logout = () => {
    removeToken();
    router.push("/");
    setIsLoggedIn(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    updateOpenStats(true);
  };

  const handleDrawerClose = () => {
    updateOpenStats(false);
  };

  const goto = (path: string) => {
    router.push(path || "");
    localStorage.setItem("path", path || "/");
  };

  const toggleMenuGroup = (item: IMenuGroup) => {
    if (item.MenuGroup === selectedMenuGroup) {
      updateSelectedMenuGroup("");
    } else {
      updateSelectedMenuGroup(item.MenuGroup);
    }
  };

  const onMenuItemClicked = (group: IMenuGroup, item: string, path: string) => {
    updateSelectedMenuGroup(group.MenuGroup);
    setSelectedMenu(item);
    localStorage.setItem("selectedMenuGroup", group.MenuGroup);
    localStorage.setItem("selectedMenu", item);
    if (group.MenuGroup === "Modeling") {
      goto("/ObjectMaintForm?ObjectName=" + path.toLocaleLowerCase());
    } else {
      if (path.includes("ObjectMaintForm.aspx")) {
        path = path.replace("ObjectMaintForm.aspx", "ObjectMaintForm");
      }
      goto("/" + path);
    }
    updateOpenStats(false);
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        className="gradiantHeader"
        sx={{ backgroundColor: HEADER_COLOR, height: 64 }}
      >
        <Container maxWidth={false} className={isLoggedIn ? "px-0" : ""}>
          <Toolbar disableGutters variant="regular" sx={{ height: 64 }}>
            <React.Fragment>
              {isLoggedIn && (
                <IconButton
                  size="small"
                  edge="start"
                  aria-label="menu"
                  onClick={handleDrawerOpen}
                  className="header-menu-icon"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </React.Fragment>
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                height: 64,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img src="/images/PharmaLite.png" alt="PharmaCtrl" />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="ml-2"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              {companyName}
            </Typography>
            {isLoggedIn ? (
              <React.Fragment>
                <Box display="flex" flexDirection="column"  sx={{paddingRight:"8px"}}>
                  <Box sx={{ display: "flex",alignItems:"center"}}>
                    <Box >
                      <IconButton
                        color="inherit"
                        onClick={() => goto("/dashboard")}
                        sx={{paddingRight:0 , marginTop:"6px"}}
                      >
                        <HomeIcon sx={{ fontSize: "30px", padding: "0px" }} />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        fontSize: "20px",
                        marginTop: "6px",
                      }}
                    >
                      {networkId}
                    </Box>
                    {/* <Box sx={{ fontSize: "20px" }}></Box> */}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "-10px",
                      alignItems:"baseline",
                      justifyContent:"flex-end"
                    }}
                  >
                    <Box sx={{ alignItems: "flex-start",marginTop:"2px" }}>
                      {moment(curTime).format("DD-MMM-YYYY h:mm:ss A")}
                    </Box>
                    <Typography mr={1}>{user?.USER_ROLE || ""}</Typography>
                    {/* <AccountCircle /> */}
                    <AppButton
                      btnText="Logout"
                      className="text-white"
                      onClick={logout}
                      variant="text"
                      sx={{ marginLeft: "10px", fontSize: "13px",marginBottom:"8px",paddingRight:0 }}
                    />
                  </Box>
                </Box>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* <MenuItem onClick={logout}>
                    <Typography>Logout</Typography>
                  </MenuItem> */}
                </Menu>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: SideMenuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "280px",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 64,
            padding: theme.spacing(0, 1),
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
        <Divider />
        <List component="nav">
          {menuGroups.map((groupItem, groupIndex) => (
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
              key={groupIndex}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  toggleMenuGroup(groupItem);
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {groupItem?.MenuGroup || ""}
                </Typography>
                {groupItem.MenuGroup === selectedMenuGroup ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse
                in={groupItem.MenuGroup === selectedMenuGroup}
                timeout="auto"
                sx={{ width: "100%" }}
                unmountOnExit
              >
                {groupItem.MenuGroup === "Modeling" ? (
                  <List component="div" disablePadding>
                    {modelingMenu.length > 0 &&
                      modelingMenu.map((menuItem, menuIndex) => (
                        <ListItemButton
                          key={menuIndex}
                          sx={{ pl: 4 }}
                          selected={
                            menuItem && menuItem.tablE_NAME === selectedMenu
                              ? true
                              : false
                          }
                          className={
                            menuItem && menuItem.tablE_NAME === selectedMenu
                              ? "selected-side-menu-item"
                              : ""
                          }
                          onClick={() => {
                            onMenuItemClicked(
                              groupItem,
                              menuItem.tablE_NAME,
                              menuItem.tablE_NAME
                            );
                          }}
                        >
                          <Typography variant="subtitle2">
                            {menuItem.table_caption || ""}
                          </Typography>
                        </ListItemButton>
                      ))}
                  </List>
                ) : (
                  <List component="div" disablePadding>
                    {groupItem.MenuItems.length > 0 &&
                      groupItem.MenuItems.map((menuItem, menuIndex) => (
                        <ListItemButton
                          key={menuIndex}
                          sx={{ pl: 4 }}
                          selected={
                            menuItem &&
                            menuItem?.Name &&
                            menuItem?.Name === selectedMenu
                              ? true
                              : false
                          }
                          className={
                            menuItem &&
                            menuItem?.Name &&
                            menuItem?.Name === selectedMenu
                              ? "selected-side-menu-item"
                              : ""
                          }
                          onClick={() => {
                            onMenuItemClicked(
                              groupItem,
                              menuItem.Name,
                              menuItem.URL
                            );
                          }}
                        >
                          <Typography variant="subtitle2">
                            {menuItem?.Name || ""}
                          </Typography>
                        </ListItemButton>
                      ))}
                  </List>
                )}
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
