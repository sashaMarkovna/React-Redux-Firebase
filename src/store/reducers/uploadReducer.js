const initState = {
    uploadError: null
};

const uploadReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FILE_UPLOAD_SUCCESS':
            console.log('File has been uploaded');
            return {
                ...state,
                uploadError: null
            };

        case 'FILE_UPLOAD_ERROR':
            console.log('File Uploading Error', action.error.message);
            return {
                ...state,
                uploadError: 'File upload failed'
            };

        default:
            return state;
    }
};

export default uploadReducer;