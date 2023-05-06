import React from 'react';
import styled from 'styled-components';
import PlayIcon from "../../icons/PlayIcon";
import PauseIcon from "../../icons/PauseIcon";

const AudioWrapper = styled.div`
  width: ${props => props.width || '400px'};
  height: ${props => props.height || '300px'};
  position: relative;
`;

const AudioContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const AudioControls = styled.div`
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

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Audio = styled.audio`
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

const defaultThumbnailUrl = 'https://via.placeholder.com/400x300';

const AudioPreview = ({ audioUrl, thumbnailUrl = defaultThumbnailUrl,width, height }) => {
    const audioRef = React.useRef(null);

    const [isPlaying, setIsPlaying] = React.useState(false);

    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    const handlePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (e) => {
        const time = e.target.value;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    return (
        <AudioWrapper width={width} height={height}>
            <AudioContainer>
                {thumbnailUrl && <ThumbnailImage src={thumbnailUrl} alt="Audio Thumbnail" />}
                <Audio
                    ref={audioRef}
                    onClick={handlePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                >
                    <source src={audioUrl} type="audio/mp3" />
                </Audio>
                <AudioControls>
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
                </AudioControls>
            </AudioContainer>
        </AudioWrapper>
    );
};

export default AudioPreview;
