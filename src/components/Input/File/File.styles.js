import styled from "styled-components";

export const DropArea = styled.div`
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  cursor: pointer;
`;

export const PlusIcon = styled.span`
  display: inline-block;
  margin-right: 8px;
  font-size: 24px;
`;

export const PreviewContainerList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PreviewInfo = styled.div``;

export const PreviewName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const PreviewSize = styled.div`
  font-size: 14px;
`;

export const RemoveButton = styled.button`
  margin-left: 16px;
`;