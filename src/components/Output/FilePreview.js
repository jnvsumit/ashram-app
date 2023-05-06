import React from "react";
import FileViewer from "react-file-viewer";

const FilePreview = ({ fileType, filePath }) => {

    return (
        <div>
            <FileViewer fileType={fileType} filePath={filePath} />
        </div>
    );
};

export default FilePreview;
