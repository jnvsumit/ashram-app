import styled, { css, keyframes } from "styled-components";

export const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

export const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const rotateIn = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

export const rotateOut = keyframes`
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

export const BookWrapper = styled.div`
  display: flex;
  min-height: 500px;
  font-family: "Roboto", sans-serif;
`;

export const TitleInput = styled.input`
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  outline: none;
  background: none;
  width: 100%;
`;

export const BookTitleContent = styled.h2`
  margin-right: 8px;
`;

export const BookTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #f1f1f1;
  height: 100%;
  overflow: auto;
  flex-shrink: 0;
  position: relative;
  ${({ collapsed }) =>
    collapsed
      ? css`
          animation: ${slideOut} 0.3s forwards;
        `
      : css`
          animation: ${slideIn} 0.3s forwards;
        `}
`;

export const SidebarContent = styled.div`
  width: 100%;
  padding: 16px;
`;

export const SidebarToggle = styled.button`
  position: absolute;
  top: 0;
  left: -40px;
  height: 100%;
  width: 40px;
  border: none;
  background-color: #f1f1f1;
  cursor: pointer;
`;

export const SidebarArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  ${({ collapsed }) =>
    collapsed
      ? css`
          animation: ${rotateIn} 0.3s forwards;
        `
      : css`
          animation: ${rotateOut} 0.3s forwards;
        `}
`;

export const PageList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const PageItem = styled.li`
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #ddd;
  }

  input {
    display: block;
    padding: 8px;
    border: none;
    background-color: #f1f1f1;
    width: 100%;
  }
`;

export const Main = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f8f8;
  border-left: 1px solid #ddd;
`;
