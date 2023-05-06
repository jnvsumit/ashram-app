import React from "react";
import PropTypes from "prop-types";
import { FileInput, Label } from "../TextEditor.styles";

const MediaInput = ({ type, accept, onChange, iconClass, saveSelection }) => {
    const id = `${type}-input`;
    return (
        <>
            <Label htmlFor={id} onMouseDown={saveSelection}>
                <i className={`fa ${iconClass}`} />
            </Label>
            <FileInput id={id} type="file" accept={accept} onChange={onChange} />
        </>
    );
};

MediaInput.propTypes = {
    type: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    iconClass: PropTypes.string.isRequired,
    saveSelection: PropTypes.func.isRequired,
};

export default MediaInput;
