import React from "react";
import styled from "styled-components";

const SwitchContainer = styled.label`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const Input = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + ${Slider} {
    background-color: #2196f3;
  }
  &:checked + ${Slider}:before {
    transform: translateX(20px);
  }
`;

const Switch = ({ checked, onChange }) => {
    return (
        <SwitchContainer>
            <Input checked={checked} onChange={onChange} />
            <Slider />
        </SwitchContainer>
    );
};

export default Switch;
