import React, { useState, useEffect, useCallback } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap"
import './Carousel.css'

const ImageCarousel = ({ images }) => {
  return (
    <div className="image-container">
      <Row>
        <Col>
          <Carousel>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img src={image} />
                <Carousel.Caption>
                  <h1>{`Image ${index + 1}`}</h1>
                  <p>Lorem ipsum lorem ipsum</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default ImageCarousel;

