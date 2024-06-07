

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import routes from "../router/routes";
import Logo from "@img/navLogo.svg";
import Login from "@img/login.png";
import Burger from "@img/sun-regular.svg";
import Moon from "@img/moon-solid.svg";
import Search from "@img/search.svg";
import "../components/ui/header/header.css";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { pathname } = useLocation();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                const header = document.querySelector(".header");
                if (window.scrollY > 80) {
                    header.classList.add("shrink");
                } else {
                    header.classList.remove("shrink");
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {routes.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton bgcolor={"transparent"}>
                            <NavLink
                                to={item.path}
                                className={`navLink ${
                                    pathname === item.path ? "bg-primary" : ""
                                }`}>
                                <i className={`fa ${item.icon}`}></i>
                                {item.content}
                            </NavLink>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    const Header = () => (
        <header className="header">
            <div className="container-header">
                <nav className="nav container">
                    <NavLink to="/">
                        <img src={Logo} className="nav-logo-img" alt="Logo" />
                    </NavLink>
                    <div className="input-group">
                        <div className="search-wrapper">
                            <img
                                src={Search}
                                alt="search icon"
                                className="search-icon"
                            />
                            <input
                                type="text"
                                className="input"
                                placeholder="Search"
                            />
                        </div>
                        <button className="nav__btn">
                            <NavLink to={"/"}>
                                <img
                                    src={Login}
                                    alt="Login"
                                    className="nav__img"
                                />
                            </NavLink>
                        </button>
                        <button className="nav__btn" onClick={toggleDarkMode}>
                            <img
                                src={darkMode ? Burger : Moon}
                                alt="toggle dark mode"
                                className="nav__img"
                            />
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% ` },
                    ml: { sm: `${drawerWidth}px` },
                }}>

                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open>
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
