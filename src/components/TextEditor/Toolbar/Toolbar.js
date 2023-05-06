import React, {useCallback, useEffect, useRef, useState} from 'react';
import ToolbarButton from './ToolbarButton';
import MediaInput from './MediaInput';
import ColorSwatchWrapper from './ColorSwatchWrapper';
import { ToolbarContainer, Select } from '../TextEditor.styles';
import ColorPicker from "./ColorPicker";
import { MediaWrapper } from '../TextEditor.styles';

const Toolbar = ({
                     editorRef,
                     fixedColors,
                     handleCommand,
                     defaultMediaMaxWidth = 40,
                 }) => {
    const [fonts, setFonts] = useState([
        'Arial',
        'Courier New',
        'Georgia',
        'Tahoma',
        'Times New Roman',
        'Verdana',
    ]);

    const [textColorSwatchVisible, setTextColorSwatchVisible] = useState(false);
    const [bgColorSwatchVisible, setBgColorSwatchVisible] = useState(false);
    const textColorSwatchRef = useRef(null);
    const bgColorSwatchRef = useRef(null);

    const [storedSelection, setStoredSelection] = useState(null);
    const [colorPickerType, setColorPickerType] = useState(null);
    const [mediaElements, setMediaElements] = useState([]);

    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            setStoredSelection(sel.getRangeAt(0));
        }
    };

    const restoreSelection = () => {
        const sel = window.getSelection();
        sel.removeAllRanges();
        if (storedSelection) {
            sel.addRange(storedSelection);
        }
    };

    const handleFontChange = (e) => {
        const selectedFont = e.target.value;
        handleCommand('fontName', selectedFont);
    };

    const insertMediaElement = useCallback(
        (element) => {
            const mediaTag = `
              <div id="${element.id}" contentEditable="false" style="display: inline-block; position: relative;">
                <${element.type} src="${element.src}" controls style="max-width: ${element.maxWidth}%;" />
                <p contentEditable="true">Enter caption here</p>
                <div class="resize-icon" style="width: 10px; height: 10px; background-color: black; position: absolute; bottom: 0; right: 0; cursor: se-resize;"></div>
                <div class="drag-icon" style="width: 10px; height: 10px; background-color: black; position: absolute; top: 0; left: 0; cursor: move;"></div>
              </div>`;

            editorRef.current.focus();

            // Restore the selection if it's available
            if (storedSelection) {
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(storedSelection);
            }

            document.execCommand('insertHTML', false, mediaTag);
        },
        [editorRef]
    );

    useEffect(() => {
        if (mediaElements.length > 0) {
            const element = mediaElements[mediaElements.length - 1];
            insertMediaElement(element);
        }
    }, [mediaElements, insertMediaElement]);

    const handleFileInsert = (e, mediaType) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                const mediaMaxWidth =
                    defaultMediaMaxWidth < 10 || defaultMediaMaxWidth > 100
                        ? 40
                        : defaultMediaMaxWidth;

                setMediaElements((prevMedia) => [
                    ...prevMedia,
                    {
                        id: `media-wrapper-${Date.now()}`,
                        type: mediaType,
                        src: base64,
                        maxWidth: mediaMaxWidth,
                    },
                ]);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.style.fontFamily = fonts[0];
        }
    }, [editorRef, fonts]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                textColorSwatchRef.current &&
                !textColorSwatchRef.current.contains(event.target)
            ) {
                setTextColorSwatchVisible(false);
            }
            if (
                bgColorSwatchRef.current &&
                !bgColorSwatchRef.current.contains(event.target)
            ) {
                setBgColorSwatchVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let draggedElement = null;
        let initialX = 0;
        let initialY = 0;
        let offsetX = 0;
        let offsetY = 0;

        let resizedElement = null;
        let initialWidth = 0;
        let initialHeight = 0;

        const handleMouseDown = (event) => {
            if (event.target.classList.contains('drag-icon')) {
                draggedElement = event.target.parentElement;
                initialX = event.clientX - offsetX;
                initialY = event.clientY - offsetY;
                event.preventDefault();
            } else if (event.target.classList.contains('resize-icon')) {
                resizedElement = event.target.parentElement;
                const rect = resizedElement.getBoundingClientRect();
                initialWidth = rect.width;
                initialHeight = rect.height;
                initialX = event.clientX;
                initialY = event.clientY;
                event.preventDefault();
            }
        };

        const handleMouseMove = (event) => {
            if (draggedElement) {
                offsetX = event.clientX - initialX;
                offsetY = event.clientY - initialY;
                draggedElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            } else if (resizedElement) {
                const deltaX = event.clientX - initialX;
                const deltaY = event.clientY - initialY;
                resizedElement.style.width = `${initialWidth + deltaX}px`;
                resizedElement.style.height = `${initialHeight + deltaY}px`;
            }
        };

        const handleMouseUp = (event) => {
            draggedElement = null;
            resizedElement = null;
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <ToolbarContainer>
            <ToolbarButton command="bold" iconClass="fa-bold" onClick={handleCommand} />
            <ToolbarButton command="italic" iconClass="fa-italic" onClick={handleCommand} />
            <ToolbarButton command="underline" iconClass="fa-underline" onClick={handleCommand} />
            <ToolbarButton command="subscript" iconClass="fa-subscript" onClick={handleCommand} />
            <ToolbarButton command="superscript" iconClass="fa-superscript" onClick={handleCommand} />
            <ToolbarButton command="removeFormat" iconClass="fa-eraser" onClick={handleCommand} />
            <ToolbarButton command="insertUnorderedList" iconClass="fa-list-ul" onClick={handleCommand} />
            <ToolbarButton command="insertOrderedList" iconClass="fa-list-ol" onClick={handleCommand} />
            <ToolbarButton command="justifyLeft" iconClass="fa-align-left" onClick={handleCommand} />
            <ToolbarButton command="justifyCenter" iconClass="fa-align-center" onClick={handleCommand} />
            <ToolbarButton command="justifyRight" iconClass="fa-align-right" onClick={handleCommand} />
            <ToolbarButton command="justifyFull" iconClass="fa-align-justify" onClick={handleCommand} />
            <ToolbarButton command="indent" iconClass="fa-indent" onClick={handleCommand} />
            <ToolbarButton command="outdent" iconClass="fa-outdent" onClick={handleCommand} />
            <ToolbarButton command="insertHorizontalRule" iconClass="fa-minus" onClick={handleCommand} />
            <ToolbarButton command="undo" iconClass="fa-undo" onClick={handleCommand} />
            <ToolbarButton command="redo" iconClass="fa-repeat" onClick={handleCommand} />
            <ToolbarButton command="strikeThrough" iconClass="fa-strikethrough" onClick={handleCommand} />
            <Select id="font-size-select" defaultValue="3" onChange={(e) => handleCommand('fontSize', e.target.value)}>
                <option value="1">XS</option>
                <option value="2">S</option>
                <option value="3">M</option>
                <option value="4">L</option>
                <option value="5">XL</option>
                <option value="6">XXL</option>
            </Select>
            <Select
                id="font-family-select"
                defaultValue={fonts[0]}
                onChange={handleFontChange}
                className="font-select"
            >
                {fonts.map((font, index) => (
                    <option key={index} value={font} style={{ fontFamily: font }}>
                        {font}
                    </option>
                ))}
            </Select>
            { fixedColors && fixedColors.length > 0 ? (
                    <>
                        <ColorSwatchWrapper
                            swatchRef={textColorSwatchRef}
                            iconClass={'fa-font'}
                            colorCommand={'foreColor'}
                            swatchVisible={textColorSwatchVisible}
                            setSwatchVisible={setTextColorSwatchVisible}
                            fixedColors={fixedColors}
                            handleCommand={handleCommand}
                        />
                        <ColorSwatchWrapper
                        swatchRef={bgColorSwatchRef}
                        iconClass={'fa-paint-brush'}
                        colorCommand={'hiliteColor'}
                        swatchVisible={bgColorSwatchVisible}
                        setSwatchVisible={setBgColorSwatchVisible}
                        fixedColors={fixedColors}
                        handleCommand={handleCommand}
                        />
                    </>
                ) : (
                    <>
                        <ColorPicker
                        iconClass="fa-font"
                        colorCommand="foreColor"
                        saveSelection={saveSelection}
                        restoreSelection={restoreSelection}
                        handleCommand={handleCommand}
                        />
                        <ColorPicker
                        iconClass="fa-paint-brush"
                        colorCommand="hiliteColor"
                        saveSelection={saveSelection}
                        restoreSelection={restoreSelection}
                        handleCommand={handleCommand}
                        />
                    </>
                )
            }
            <MediaInput
                type="image"
                accept="image/*"
                iconClass="fa-picture-o"
                saveSelection={saveSelection}
                onChange={(e) => handleFileInsert(e, 'img')}
            />
            <MediaInput
                type="video"
                accept="video/*"
                iconClass="fa-video-camera"
                saveSelection={saveSelection}
                onChange={(e) => handleFileInsert(e, 'video')}
            />
            <MediaInput
                type="audio"
                accept="audio/*"
                iconClass="fa-music"
                saveSelection={saveSelection}
                onChange={(e) => handleFileInsert(e, 'audio')}
            />
        </ToolbarContainer>
    );
};

export default Toolbar;

