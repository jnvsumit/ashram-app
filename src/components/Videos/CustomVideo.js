import React from "react";
import styled from "styled-components";

const VideoWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // Maintain 16:9 aspect ratio
`;

const IframeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CustomVideo = ({ src, type = "file", ...props }) => {
    if (type === "iframe") {
        return (
            <VideoWrapper>
                <IframeWrapper>
                    <iframe
                        src={src}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="Embedded video"
                        {...props}
                    ></iframe>
                </IframeWrapper>
            </VideoWrapper>
        );
    }

    if (type === "buffer") {
        const videoSrc = URL.createObjectURL(new Blob([src], { type: "video/mp4" }));

        return (
            <VideoElement src={videoSrc} controls {...props}>
                Your browser does not support the video tag.
            </VideoElement>
        );
    }

    if (type === "file") {
        return (
            <VideoElement src={src} controls {...props}>
                Your browser does not support the video tag.
            </VideoElement>
        );
    }

    return null;
};

export default CustomVideo;
