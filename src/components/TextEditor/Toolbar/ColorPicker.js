import React from "react";
import PropTypes from "prop-types";
import { Label } from "../TextEditor.styles";

const ColorPicker = ({ iconClass, colorCommand, handleCommand, saveSelection, restoreSelection }) => {
    const id = `${colorCommand}-input`;
    return (
        <div className="color-wrapper">
            <Label
                htmlFor={id}
                onClick={(e) => {
                    e.preventDefault();
                    saveSelection();
                }}
            >
                <i className={`fa ${iconClass}`} />
            </Label>
            <input
                id={id}
                className="color-input"
                type="color"
                onChange={(e) => {
                    restoreSelection();
                    handleCommand(colorCommand, e.target.value);
                }}
            />
        </div>
    );
};

ColorPicker.propTypes = {
    iconClass: PropTypes.string.isRequired,
    colorCommand: PropTypes.string.isRequired,
    handleCommand: PropTypes.func.isRequired,
    saveSelection: PropTypes.func.isRequired,
    restoreSelection: PropTypes.func.isRequired,
};

export default ColorPicker;
