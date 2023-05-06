/**
 * @file Navbar.js
 */
import React, { useContext, useState } from "react";
import { useLocation, } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { Nav, LogoContainer, NavLinks, NavItem, NavLink } from "./Navbar.styles";
const logoUrl = `${process.env.PUBLIC_URL}/logo192.png`;

function Navbar() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isActive = (to) => location.pathname === to;

  return (
    <Nav className="navbar navbar-expand-sm">
      <LogoContainer>
        <img src={logoUrl} alt="ashram" width="40" height="40" />
      </LogoContainer>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className=" collapse navbar-collapse" id="navbarNav">
        <NavLinks>
          <NavItem>
            <NavLink to="/" className={isActive("/") ? "active" : ""}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/books" className={isActive("/books") ? "active" : ""}>
              Books
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/donate" className={isActive("/donate") ? "active" : ""}>
              Donate
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about" className={isActive("/about") ? "active" : ""}>
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" className={isActive("/contact") ? "active" : ""}>
              Contact
            </NavLink>
          </NavItem>
          <NavItem>
            {user.isLoggedIn ? (
              <NavLink to="/profile" className={isActive("/profile") ? "active" : ""}>
                Profile
              </NavLink>
            ) : (
              <NavLink to="/login" className={isActive("/login") ? "active" : ""}>
                Login
              </NavLink>
            )}
          </NavItem>
        </NavLinks>
      </div>
    </Nav>
  );
}

export default Navbar;

