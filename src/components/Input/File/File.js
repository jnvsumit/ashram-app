import React, { useState } from "react";
import Preview from "../../Output/Preview";
import {
    DropArea,
    PlusIcon,
    PreviewContainer, PreviewContainerList,
    PreviewInfo,
    PreviewName,
    PreviewSize,
    PreviewWrapper,
    RemoveButton
} from "./File.styles";

export const Types = {
    IMAGE: "image",
    DOCUMENT: "document",
    AUDIO: "audio",
    VIDEO: "video",
    TEXT: "text",
};

const File = ({ onChange, ...rest }) => {
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState([]);

    const getType = (mimeType) => {
        switch (true) {
            case mimeType.startsWith("image/"):
                return Types.IMAGE;
            case mimeType.startsWith("application/pdf"):
            case mimeType.startsWith("application/msword"):
                return Types.DOCUMENT;
            case mimeType.startsWith("audio/"):
                return Types.AUDIO;
            case mimeType.startsWith("video/"):
                return Types.VIDEO;
            default:
                return Types.TEXT;
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const fileHelper = (file) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const buffer = reader.result;
            const type = getType(file.type);
            const metadata = {
                type,
                mimeType: file.type,
                size: file.size,
                name: file.name,
                url: type === Types.TEXT ? new TextDecoder().decode(buffer) : URL.createObjectURL(file),
                blob: new Blob([buffer], { type: file.type }),
            };

            setFiles([...files, metadata]);
            if (onChange) {
                onChange(metadata);
            }
        };
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        Array.from(e.dataTransfer.files).forEach(fileHelper);
    };

    const handleFileClick = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = rest.accept;
        fileInput.multiple = true;
        fileInput.onchange = (e) => {
            Array.from(e.target.files).forEach(fileHelper);
        };
        fileInput.click();
    };

    const handleRemoveClick = (index) => {
        const filteredFiles = files.filter((_, i) => i !== index);
        setFiles(filteredFiles);
    };

    const getTruncatedText = (text, count) => {
        if (text.length <= count) {
            return text;
        }
        const truncatedText = text.slice(0, count - 1);
        if (text.indexOf(".") !== -1) {
            return truncatedText.slice(0, truncatedText.lastIndexOf(".")) + "..." + text.slice(text.lastIndexOf("."));
        } else {
            return truncatedText;
        }
    };

    return (
        <>
            <PreviewContainerList>
                {
                    files.map((file, index) => (
                        <PreviewContainer key={index}>
                            <Preview type={file.type} alt={"Image"} content={file.url} width="200px" height="150px" />
                            <PreviewWrapper>
                                <PreviewInfo>
                                    <PreviewName>{getTruncatedText(file.name, 15)}</PreviewName>
                                    <PreviewSize>{file.size} bytes</PreviewSize>
                                </PreviewInfo>
                                <RemoveButton onClick={() => handleRemoveClick(index)}>x</RemoveButton>
                            </PreviewWrapper>
                        </PreviewContainer>
                    ))

                }
            </PreviewContainerList>
            <DropArea
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={handleFileClick}
                style={{ borderColor: dragging ? "blue" : "#ccc" }}
            >
                <PlusIcon>+</PlusIcon>
                Drag and drop a file, or click to browse
            </DropArea>
        </>
    );
};

export default File;
