import React, { useState, useEffect, useContext } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import styled from "styled-components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditIcon from "../icons/EditIcon";
import { Editor } from "react-draft-wysiwyg";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { UserContext } from "../../context/UserContextProvider";
import Button from "../Buttons/Button";

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const EditorWrapper = styled.div`
  width: 100%;
  margin: 100px 0;
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;

const StyledEditor = styled(Editor)`
  .wrapper-class {
    width: 100%;
  }
  .editor-class {
    height: 400px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 2px;
  }
  .toolbar-class {
    border: 1px solid #ccc;
  }
`;

const HtmlViewWrapper = styled.div`
  p {
    margin-top: 20px;
  }
  .text-area {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
  }
`;

const CustomEditor = ({ content, isEditing, pageId, savePage, handleEditClick }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { user } = useContext(UserContext);

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleSave = async () => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const content = JSON.stringify(rawContentState);
        await savePage(pageId, content);
    };

    useEffect(() => {
        try {
            if (content === "") {
                setEditorState(EditorState.createEmpty());
            } else {
                const contentState = convertFromRaw(JSON.parse(content));
                setEditorState(EditorState.createWithContent(contentState));
            }
        } catch (e) {
            console.log("Error", e);
        }
    }, [content]);

    return (
        <MyPageWrapper>
            <EditIcon onClick={handleEditClick} />
            <EditorWrapper>
                <StyledEditor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    toolbarOnFocus={user.isLoggedIn ? !isEditing : false}
                />
                <HtmlViewWrapper>
                    <p>HTML View</p>
                    <textarea
                        className="text-area"
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                </HtmlViewWrapper>
            </EditorWrapper>
            <Button
                colors={['#4caf50', '#ffffff', '#46a049']}
                size="18px"
                corners="8px"
                onClick={handleSave}
            >
                Save
            </Button>
        </MyPageWrapper>
    );
};

export default CustomEditor;
