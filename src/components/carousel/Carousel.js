import React, { useState, useEffect, useCallback } from "react";
import "./Carousel.css";

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const previousImage = useCallback(() => {
    setCurrentImage(
      (currentImage - 1 + images.length) % images.length
    );
  }, [currentImage, images.length]);

  const nextImage = useCallback(() => {
    setCurrentImage(
      (currentImage + 1) % images.length
    );
  }, [currentImage, images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="carousel">
      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${index + 1}`}
            className={`carousel-image ${
              index === currentImage ? "active" : ""
            }`}
          />
        ))}
      </div>
      <button className="previous-button" onClick={previousImage}>
        {"<"}
      </button>
      <button className="next-button" onClick={nextImage}>
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
