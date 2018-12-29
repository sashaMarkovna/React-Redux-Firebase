// In case we don't have data
const initState = {
    projectError: null,
    projectSuccess: null
};

const projectReducer = (state = initState, action) => {

    switch (action.type) {

        case 'CLEAN_STATE_SUCCESS':
            return {
                ...state,
                projectError: null,
                projectSuccess: null
            };

        case 'CREATE_PROJECT_SUCCESS':
            console.log('Created project', action.project.id);
            return {
                ...state,
                projectError: null
            };

        case 'CREATE_PROJECT_ERROR':
            console.log('create project error ', action.error.message);
            return {
                ...state,
                projectError: action.error.message
            };

        case 'DELETE_PROJECT_SUCCESS':
            console.log('Project deleted');
            return {
                ...state,
                projectError: null,
                projectSuccess: true
            };

        case 'DELETE_PROJECT_ERROR':
            console.log('Delete project error', action.error.message);
            return {
                ...state,
                projectError: action.error.message
            };

        case 'PROJECT_UPDATE_SUCCESS':
            console.log('Project was successfully updated', action.project);
            return {
                ...state,
                projectError: null
            };

        case 'PROJECT_UPDATE_ERROR':
            console.log('Project update error', action.error.message);
            return {
                ...state,
                projectError: action.error.message
            };

        default:
            return state;
    }
};

export default projectReducer;