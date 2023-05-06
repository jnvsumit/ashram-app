/**
 * @file Navbar.styles.js
 */
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";


const fadeIn = keyframes`
  from{
    opacity:0;
  }
  to{
    opacity:1;
  }
`;

export const Nav = styled.nav`
  display:flex;
  justify-content:space-between;
  .navbar-toggler:focus,
  .navbar-toggler {
    outline: none;
    box-shadow: none;
    border: none;
  }
  & .navbar-collapse {
    opacity: 10;
    animation: ${fadeIn} 2s ease forwards;
    transition: all 0.5s ease-in-out;

  }

  & .show {
    opacity: 1;
  }
`;

export const LogoContainer = styled.div`
`;



export const NavLinks = styled.ul`
  display:flex;
  margin:auto;
  padding:0px;
  @media (max-width: 575px) {
    flex-direction: column;
  }
`;


export const NavItem = styled.li`
  margin-left:20px;
  margin-right:20px;
  list-style-type:none;
  @media (max-width: 575px) {

    text-align:center;
    padding:10px;
  }
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

