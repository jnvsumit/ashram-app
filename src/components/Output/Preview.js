import React from 'react';
import styled from "styled-components";
import VideoPreview from "./VideoPreview/VideoPreview";
import ImagePreview from "./ImagePreview/ImagePreview";
import TextPreview from "./TextPreview/TextPreview";
import AudioPreview from "./AudioPreview/AudioPreview";
import PdfPreview from "./PdfPreview/PdfPreview";
import { Types } from "../Input/File/File";

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
`;

const Preview = ({ type, content, thumbnail, alt, ...rest }) => {
    if (type === Types.VIDEO) {
        return (
            <PreviewContainer>
                <VideoPreview videoUrl={content} {...rest} />
            </PreviewContainer>
        );
    }

    if (type === Types.IMAGE) {
        return (
            <PreviewContainer>
                <ImagePreview src={content} alt={alt} {...rest} />
            </PreviewContainer>
        );
    }

    if (type === Types.TEXT) {
        return (
            <PreviewContainer>
                <TextPreview txt={content} {...rest} />
            </PreviewContainer>
        );
    }

    if (type === Types.AUDIO) {
        return (
            <PreviewContainer>
                <AudioPreview audioUrl={content} thumbnailUrl={thumbnail} {...rest} />
            </PreviewContainer>
        );
    }

    if (type === Types.DOCUMENT) {
        return (
            <PreviewContainer>
                <PdfPreview pdfUrl={content} {...rest} />
            </PreviewContainer>
        );
    }

    return (
        <PreviewContainer>
            <h1>
                Preview not available
            </h1>
        </PreviewContainer>
    );
}

export default Preview;