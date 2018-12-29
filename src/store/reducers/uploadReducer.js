const initState = {
    uploadError: null,
    uploadFileUrl: null
};

const uploadReducer = (state = initState, action) => {
    switch (action.type) {

        case 'CLEAN_STATE_SUCCESS':
            return {
                ...state,
                uploadError: null,
                uploadFileUrl: null
            };

        case 'FILE_UPDATE_SUCCESS':
            console.log('File has been uploaded');
            return {
                ...state,
                uploadError: null
            };

        case 'FILE_UPDATE_ERROR':
            console.log('File Uploading Error', action.error.message);
            return {
                ...state,
                uploadError: 'File update failed'
            };

        case 'FILE_UPLOAD_SUCCESS':
            console.log('File has been successfully uploaded');
            return {
                ...state,
                uploadError: null,
                uploadFileUrl: action.downloadUrl
            };

        case 'FILE_UPLOAD_ERROR':
            console.log('File Uploading Error', action.error.message);
            return {
                ...state,
                uploadFileUrl: action.downloadUrl,
                uploadError: 'File upload failed'
            };

        case 'DELETE_FILE_SUCCESS':
            console.log('File has been deleted');
            return {
                ...state,
                uploadError: null
            };

        case 'DELETE_FILE_ERROR':
            console.log('File Delete Error', action.error.message);
            return {
                ...state,
                uploadError: 'Delete file failed'
            };

        default:
            return state;
    }
};

export default uploadReducer;