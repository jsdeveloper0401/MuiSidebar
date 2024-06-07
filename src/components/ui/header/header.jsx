import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "@img/navLogo.svg";
import Login from "@img/login.png";
import Burger from "@img/sun-regular.svg";
import Moon from "@img/moon-solid.svg";
import Search from "@img/search.svg";

const Index = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
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
    }, []);

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

    return (
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
};

export default Index;
