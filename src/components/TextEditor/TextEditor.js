import React, { useRef, useEffect } from 'react';
import {EditorArea, EditorContainer} from './TextEditor.styles';
import Toolbar from "./Toolbar/Toolbar";

const TextEditor = ({ value = '', isEditorEnabled = true, disableBorder = false, onChange = () => {} }) => {
    const editorRef = useRef(null);
    const fixedColors = [
        '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
        '#ffff00', '#00ffff', '#ff00ff', '#c0c0c0', '#808080',
        '#800000', '#808000', '#008000', '#800080', '#008080',
        '#000080', '#808040', '#804000', '#408000', '#800040',
        '#004080', '#804080', '#008040', '#004040', '#8080ff'
    ];

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value;
        }
    }, []);

    const handleInput = (e) => {
        const newValue = e.target.innerHTML;
        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            handleCommand('insertTab');
        }
    };

    const handleMediaClick = (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.tagName === 'AUDIO') {
            e.target.parentNode.classList.add('selected-media');
        } else {
            const selectedMedia = editorRef.current.querySelector('.selected-media');
            if (selectedMedia) {
                selectedMedia.classList.remove('selected-media');
            }
        }
    };

    const handleCommand = (command, value) => {
        if (command === 'fontSize' || command === 'foreColor' || command === 'hiliteColor' || command === 'fontName' || command === 'formatBlock') {
            document.execCommand(command, false, value);
        } else if (command === 'insertTab') {
            document.execCommand('insertHTML', false, ' ');
        } else {
            document.execCommand(command);
        }
        editorRef.current.focus();
    };


    return (
        <EditorContainer>
            {isEditorEnabled && <Toolbar fixedColors={fixedColors} editorRef={editorRef} handleCommand={handleCommand} /> }
            <EditorArea
                disableBorder={disableBorder}
                ref={editorRef}
                contentEditable={isEditorEnabled}
                onInput={isEditorEnabled ? handleInput : null}
                onKeyPress={handleKeyPress}
                onClick={handleMediaClick}
            />
        </EditorContainer>
    );
};

export default TextEditor;
