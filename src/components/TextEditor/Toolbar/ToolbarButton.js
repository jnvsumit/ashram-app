import React from 'react';
import PropTypes from 'prop-types';

const ToolbarButton = ({ command, iconClass, value, onClick }) => (
    <button
        type="button"
        onClick={(e) => {
            e.preventDefault();
            onClick(command, value);
        }}
    >
        <i className={`fa ${iconClass}`} />
    </button>
);

ToolbarButton.propTypes = {
    command: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

ToolbarButton.defaultProps = {
    value: null,
};

export default ToolbarButton;
