import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CodeFlask from 'codeflask';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '400px'};
  height: ${props => props.height || '300px'};
  position: relative;
  
    .CodeFlask {
        width: 100%;
        height: 100%;
    }
    
    .CodeFlask__pre {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 0;
        margin: 0;
        font-family: 'Fira Code', monospace;
        font-size: 16px;
        line-height: 1.5;
        box-sizing: border-box;
    }
`;

const EditorContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    line-height: 1.5;
    padding: 8px;
    box-sizing: border-box;
    font-family: 'Fira Code', monospace;
    
    &::selection {
        background-color: #ddd;
    }
`;

const TextPreview = ({ txt = '', language = 'text', width, height }) => {
    const [editor, setEditor] = useState(null);

    console.log(txt, language)

    useEffect(() => {
        if (editor) {
            editor.updateCode(txt);
            editor.updateLanguage(language);
        }
    }, [txt, language]);

    useEffect(() => {
        const editor = new CodeFlask('.editor-container', { language });
        editor.updateCode(txt);
        setEditor(editor);

        return () => {
            if (editor && editor.destroy) {
                editor.destroy();
            }
        };
    }, [txt, language]);

    return (
        <Container width={width} height={height}>
            <EditorContainer className="editor-container" />
        </Container>
    );
};

export default TextPreview;
