import styled from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
  flex-wrap: wrap;
  position: sticky;
  top: 20;
  background-color: white;
  z-index: 10;
  -webkit-appearance: none;
  -moz-appearance: none;
  
  .color-input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }

  .color-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .font-select {
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    &:focus + label {
      outline: auto;
    }
  }
`;

export const SwatchContainer = styled.div`
  position: absolute;
  z-index: 1;
  
  .color-swatch {
    position: absolute;
    top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    width: 120px;
  }

  .color-box {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const EditorArea = styled.div`
  border: ${props => props.disableBorder ? 'none' : '1px solid #ccc'};
  padding: 8px;
  min-height: 200px;
  font-size: 16px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    border-color: blue;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
  }
  
  .media-container {
    width: 40%;
    background-color: #eee;
    
    .media-wrapper {
      background-color: #000;
      display: flex;
      user-drag: auto;
      user-select: auto;
    
      &:focus,
      &:hover {
        outline: 2px solid blue;
      }
    }
  
    .resize-icon {
      bottom: 0;
      right: 0;
      font-size: 14px;
      color: blue;
      background-color: white;
      padding: 2px;
      cursor: nwse-resize;
    }
  }
  
  .selected-media {
    border: 2px solid blue;
    resize: both;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const Label = styled.label`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const Select = styled.select`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 4px;
  margin-bottom: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
  }
`;
