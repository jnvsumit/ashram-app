import React from "react";
import { ContactContainer, ContactInfo, MapContainer } from "./ContactPage.styles";

const ContactPage = () => {
  return (
    <ContactContainer>
      <ContactInfo>
        <h1>Contact Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod,
          nulla eu auctor vehicula, velit augue pharetra est, eu sollicitudin
          dolor orci at purus. Nam imperdiet felis sed sem tristique, et sodales
          nisi blandit.
        </p>
        <p>
          Nulla ornare volutpat erat, a tincidunt lorem finibus sed. Fusce
          ullamcorper, quam ut suscipit varius, orci eros consequat lectus,
          quis vestibulum quam nibh eu orci. Praesent imperdiet eget turpis
          sed lobortis.
        </p>
        <h2>Get in Touch</h2>
        <p>
          For any inquiries, please contact us using the information below:
        </p>
        <p>
          <strong>Phone:</strong> (123) 456-7890
        </p>
        <p>
          <strong>Email:</strong> info@example.com
        </p>
        <p>
          <strong>Address:</strong> 123 Main St, Anytown, USA
        </p>
      </ContactInfo>
      <MapContainer>
        <iframe
          title="Ashram"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14088.603711414555!2d83.35822226257514!3d25.185808106862794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1682342266243!5m2!1sen!2sin"
          style={{ border: "0", width: "100%", height: "100%" }}
          allowFullScreen={true}
        ></iframe>
      </MapContainer>
    </ContactContainer>
  );
};

export default ContactPage;
