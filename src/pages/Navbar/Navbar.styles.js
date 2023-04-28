/**
 * @file Navbar.styles.js
 */
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

export const LogoContainer = styled.div``;

export const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
`;


export const NavItem = styled.li`
  margin-right: 30px;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #999;
  }

  &.active {
    color: #f00; // Change this to your desired active color
    font-weight: bold;
  }
`;

