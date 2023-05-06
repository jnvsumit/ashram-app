import React from 'react';
import styled from 'styled-components';
import PlayIcon from "../../icons/PlayIcon";
import PauseIcon from "../../icons/PauseIcon";
import FullScreenIcon from "../../icons/FullScreenIcon";

const VideoWrapper = styled.div`
  width: ${props => props.width || '400px'};
  height: ${props => props.height || '300px'};
  position: relative;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlayButton = styled.button`
  font-size: 2rem;
  color: #fff;
  background-color: transparent;
  border: none;
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FullScreenButton = styled.button`
  font-size: 1.5rem;
  color: #fff;
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const SeekBar = styled.input`
  width: 100%;
  margin-top: 0.5rem;
`;

const VideoPreview = ({ videoUrl, width, height, ...rest }) => {
    const videoRef = React.useRef(null);

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isFullScreen, setIsFullScreen] = React.useState(false);

    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    const handlePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
        }

        setIsFullScreen(true);
    };

    const handleExitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        setIsFullScreen(false);
    };

    const handleSeek = (e) => {
        const time = e.target.value;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    return (
        <VideoWrapper width={width} height={height}>
            <VideoContainer>
                <Video
                    ref={videoRef}
                    onClick={handlePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                >
                    <source src={videoUrl} type="video/mp4" />
                </Video>
                {isFullScreen && (
                    <FullScreenButton onClick={handleExitFullScreen}>
                        <FullScreenIcon width="32" height="32" color="#fff" />
                    </FullScreenButton>
                )}
                <VideoControls>
                    <PlayButton onClick={handlePlay}>
                        {
                            isPlaying ? (
                                <PauseIcon width="32" height="32" color="#fff" />
                            ) : (
                                <PlayIcon width="32" height="32" color="#fff" />
                            )
                        }
                    </PlayButton>
                    <SeekBar
                        type="range"
                        min="0"
                        max={duration}
                        step="1"
                        value={currentTime}
                        onChange={handleSeek}
                    />
                    <FullScreenButton onClick={() => videoRef.current.requestFullscreen()}>
                        <FullScreenIcon width="24" height="24" color="#fff" />
                    </FullScreenButton>
                </VideoControls>
            </VideoContainer>
        </VideoWrapper>
    );
};

export default VideoPreview;






