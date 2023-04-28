import React from "react";
import { StyledFooter, Logo, Contact } from "./Footer.styles";
const logoUrl = `${process.env.PUBLIC_URL}/logo512.png`;

function Footer() {
  return (
    <StyledFooter>
      <Logo>
        <img src={logoUrl} alt="Logo" />
      </Logo>
      <Contact>
        <h3>Contact Us</h3>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="message">Message</label>
          <textarea id="message"></textarea>
          <button type="submit">Send</button>
        </form>
      </Contact>
    </StyledFooter>
  );
}

export default Footer;
