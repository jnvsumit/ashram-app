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
        <h1>About Our Ashram</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus
          magna eu quam consequat consequat. Vestibulum eu purus a ante
          malesuada rhoncus. Donec ac placerat sem. Sed pellentesque commodo
          quam, nec commodo tellus aliquam non. Sed non malesuada arcu.
          Vestibulum commodo elit vitae libero iaculis, id commodo elit
          pulvinar.
        </p>
        <p>
          Curabitur non volutpat nunc. Sed auctor sapien vel lectus bibendum,
          vitae gravida nisi faucibus. Suspendisse vitae leo eu nibh volutpat
          molestie. Nam sit amet lorem a mi ultrices suscipit ut sed ex. Nulla
          sit amet purus a est fringilla dapibus vel eu erat. Sed nec ex quis
          mauris convallis auctor. Vivamus quis purus a libero commodo dictum.
          Nunc fermentum, nulla id interdum ultricies, lorem sapien placerat
          justo, vel pulvinar odio orci a metus.
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
