import React from "react";
import {
  AboutContainer,
  AboutInfo,
  AboutImageContainer,
  AboutImage,
} from "./AboutPage.styles";

function AboutPage() {
  return (
    <AboutContainer>
      <AboutInfo>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus
          magna eu quam consequat consequat. Vestibulum eu purus a ante
          malesuada rhoncus. Donec ac placerat sem. Sed pellentesque commodo
          quam, nec commodo tellus aliquam non. Sed non malesuada arcu.
          Vestibulum commodo elit vitae libero iaculis, id commodo elit
          pulvinar.
        </p>
        <h2>Our Story</h2>
        <p>
          Curabitur non volutpat nunc. Sed auctor sapien vel lectus bibendum,
          vitae gravida nisi faucibus. Suspendisse vitae leo eu nibh volutpat
          molestie. Nam sit amet lorem a mi ultrices suscipit ut sed ex. Nulla
          sit amet purus a est fringilla dapibus vel eu erat. Sed nec ex quis
          mauris convallis auctor. Vivamus quis purus a libero commodo dictum.
          Nunc fermentum, nulla id interdum ultricies, lorem sapien placerat
          justo, vel pulvinar odio orci a metus.
        </p>
        <h2>Our Mission</h2>
        <p>
          Curabitur non volutpat nunc. Sed auctor sapien vel lectus bibendum,
          vitae gravida nisi faucibus. Suspendisse vitae leo eu nibh volutpat
          molestie. Nam sit amet lorem a mi ultrices suscipit ut sed ex. Nulla
          sit amet purus a est fringilla dapibus vel eu erat. Sed nec ex quis
          mauris convallis auctor. Vivamus quis purus a libero commodo dictum.
          Nunc fermentum, nulla id interdum ultricies, lorem sapien placerat
          justo, vel pulvinar odio orci a metus.
        </p>
        <h3>Get in Touch</h3>
        <p>
          If you have any questions or comments, please don't hesitate to contact us. We'd love to hear from you!

          Email: info@ourwebsite.com
          Phone: 555-123-4567
          Address: 123 Main Street, Anytown, USA
        </p>
      </AboutInfo>
      <AboutImageContainer>
        <AboutImage
          src="https://via.placeholder.com/600x400"
          alt="Ashram image"
        />
      </AboutImageContainer>
    </AboutContainer>
  );
}

export default AboutPage;
