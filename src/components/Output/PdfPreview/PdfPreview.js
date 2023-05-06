import React, { useState } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import FullScreenIcon from '../../icons/FullScreenIcon';
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPreviewWrapper = styled.div`
  width: ${props => props.width || '400px'};
  height: ${props => props.height || '300px'};
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background-color: #a8dadc;
`;

const PdfContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
`;

const PdfControls = styled.div`
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

const PageNumber = styled.div`
  font-size: 1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  margin: 0 0.5rem;
`;

const PageInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const PageInputLabel = styled.label`
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const PageInput = styled.input`
  width: 3rem;
  height: 2rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  text-align: center;
  margin-right: 0.5rem;
`;

const PageInputButton = styled.button`
  font-size: 1rem;
  color: #fff;
  background-color: #0077cc;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005fa3;
  }
`;

const PdfButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #564dff;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
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

const StyledDocument = styled(Document)`
    width: 100%;
    height: 100%;
`;

const StyledPage = styled(Page)`
    canvas {
        width: 100% !important;
        height: 100% !important;
    }
`;

const PdfPreview = ({ pdfUrl,width, height }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handlePrevious = () => {
        if (pageNumber <= 1) return;
        setPageNumber(pageNumber - 1);
    };

    const handleNext = () => {
        if (pageNumber >= numPages) return;
        setPageNumber(pageNumber + 1);
    };

    const handleGoToPage = (e) => {
        const page = e.target.value;
        if (page > 0 && page <= numPages) {
            setPageNumber(page);
        }
    };

    const handleFullScreen = () => {
        const previewContainer = document.getElementById('pdf-preview-container');
        if (previewContainer.requestFullscreen) {
            previewContainer.requestFullscreen();
        } else if (previewContainer.webkitRequestFullscreen) {
            previewContainer.webkitRequestFullscreen();
        } else if (previewContainer.msRequestFullscreen) {
            previewContainer.msRequestFullscreen();
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

    const getNumberFromPixels = (pixels) => {
        return Number(pixels.replace('px', ''));
    }

    return (
        <PdfPreviewWrapper>
            <PdfContainer id="pdf-preview-container">
                <style>{".react-pdf__Page__textContent { display: none; }"}</style>
                <StyledDocument
                    file={pdfUrl}
                    width={width}
                    height={height}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-preview"
                    loading="Loading PDF..."
                    options={{ cMapUrl: 'cmaps/', cMapPacked: true, disableTextLayer: true }}
                >
                    <StyledPage pageNumber={pageNumber} width={getNumberFromPixels(width)} height={getNumberFromPixels(height)} />
                </StyledDocument>
                {isFullScreen ? (
                    <FullScreenButton onClick={handleExitFullScreen}>
                        <FullScreenIcon width="32" height="32" color="#fff" />
                    </FullScreenButton>
                ) : (
                    <FullScreenButton onClick={handleFullScreen}>
                        <FullScreenIcon width="32" height="32" color="#fff" />
                    </FullScreenButton>
                )}
                <PdfControls>
                    <PdfButton onClick={handlePrevious}>
                        <ArrowLeftIcon width="20" height="20" color="#000" />
                    </PdfButton>
                    <PageNumber>
                        {pageNumber}/{numPages}
                    </PageNumber>
                    <PdfButton onClick={handleNext}>
                        <ArrowRightIcon width="20" height="20" color="#000" />
                    </PdfButton>
                    <PageInputWrapper>
                        <PageInputLabel>Go to page:</PageInputLabel>
                        <PageInput
                            type="number"
                            min="1"
                            max={numPages}
                        />
                        <PageInputButton onClick={handleGoToPage}>
                            Go
                        </PageInputButton>
                    </PageInputWrapper>
                    {isFullScreen ? null : (
                        <FullScreenButton onClick={handleFullScreen}>
                            <FullScreenIcon width="24" height="24" color="#000" />
                        </FullScreenButton>
                    )}
                </PdfControls>
            </PdfContainer>
        </PdfPreviewWrapper>
    );
};

export default PdfPreview;
