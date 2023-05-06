import React from "react";
import PropTypes from "prop-types";

const ColorSwatch = ({ colors, onSelect }) => {
    return (
        <div className="color-swatch">
            {colors.map((color) => (
                <div
                    key={color}
                    className="color-box"
                    style={{ backgroundColor: color }}
                    onClick={() => onSelect(color)}
                />
            ))}
        </div>
    );
};

ColorSwatch.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
};

ColorSwatch.defaultProps = {
    colors: [],
    onSelect: () => {},
};

export default ColorSwatch;
