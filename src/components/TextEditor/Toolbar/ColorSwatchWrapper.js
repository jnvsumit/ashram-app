import React from "react";
import PropTypes from "prop-types";
import { SwatchContainer } from "../TextEditor.styles";
import ColorSwatch from "./ColorSwatch";

const ColorSwatchWrapper = ({
                                iconClass,
                                swatchVisible,
                                setSwatchVisible,
                                swatchRef,
                                fixedColors,
                                handleCommand,
                                colorCommand,
                            }) => (
    <div
        className="color-wrapper"
        onMouseDown={(e) => e.preventDefault()}
    >
        <i
            className={`fa ${iconClass}`}
            onClick={() => setSwatchVisible(!swatchVisible)}
        />
        {swatchVisible && (
            <SwatchContainer ref={swatchRef}>
                <ColorSwatch
                    colors={fixedColors}
                    onSelect={(color) => {
                        handleCommand(colorCommand, color);
                        setSwatchVisible(false);
                    }}
                />
            </SwatchContainer>
        )}
    </div>
);

ColorSwatchWrapper.propTypes = {
    iconClass: PropTypes.string,
    swatchVisible: PropTypes.bool,
    setSwatchVisible: PropTypes.func,
    swatchRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    fixedColors: PropTypes.arrayOf(PropTypes.string),
    handleCommand: PropTypes.func,
    colorCommand: PropTypes.string,
};

ColorSwatchWrapper.defaultProps = {
    iconClass: "",
    swatchVisible: false,
    setSwatchVisible: () => {},
    swatchRef: null,
    fixedColors: [],
    handleCommand: () => {},
    colorCommand: "",
};

export default ColorSwatchWrapper;
