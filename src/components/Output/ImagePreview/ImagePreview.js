import React from "react";
import styled from "styled-components";

const StyledImagePreview = styled.img`
  width: ${props => props.width || '400px'};
  height: ${props => props.height || '300px'};
  height: auto;
  margin-top: 0.5rem;
`;

const ImagePreview = ({ src, alt, width, height }) => {
    console.log(width, height);
    return <StyledImagePreview src={src} alt={alt} width={width} height={height} />
}

export default ImagePreview;