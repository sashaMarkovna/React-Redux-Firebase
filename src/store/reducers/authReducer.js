
const initState = {
    authError: null,
    authPasswordUpdateSuccessMessage: null,
    authPasswordUpdateEmailError: null,
    authPasswordUpdatePasswordError: null,
    authEmailUpdateSuccessMessage: null,
    authEmailUpdatePasswordError: null,
    authEmailUpdateEmailError: null,
    authDeleteAccountErrorMessage: null,
    authDeleteUserAvatarError: null,
    authDeleteUserBannerError: null
};

const authReducer = (state = initState, action) => {
    switch(action.type) {

        case 'CLEAR':
            for(let key in initState) {initState[key] = null }
            return {
                ...state
                // [action.prop]: null
            };

        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            };

        case 'LOGIN_ERROR':
            console.log('login failed');
            return {
                ...state,
                authError: 'Login failed'
            };

        case 'SIGNOUT_SUCCES':
            console.log('signout success');
            return state;

        case 'SIGNOUT_ERROR':
            console.log('Signout error', action.error.message);
            return state;

        case 'SIGNUP_SUCCESS':
            console.log('Signup success');
            return {
                ...state,
                authError: null
            };

        case 'SIGNUP_ERROR':
            console.log('Signup error', action.error);
            return {
                ...state,
                authError: action.error.message
            };

        case 'USER_NAME_UPDATE_SUCCESS':
            console.log('User name was successfully updated');
            return {
                ...state,
                authError: null
            };

        case 'USER_NAME_UPDATE_ERROR':
            console.log('User name update error', action.error.message);
            return {
                ...state,
                authError: action.error.message
            };

        case 'EMAIL_UPDATE_SUCCESS':
            console.log('User email update success');
            return {
                ...state,
                authEmailUpdatePasswordError: null,
                authEmailUpdateEmailError: null,
                authEmailUpdateSuccessMessage: 'Your email was successfully updated'
            };
        case 'EMAIL_UPDATE_EMAIL_ERROR':
            console.log('User email update error', action.error.message);
            return {
                ...state,
                authEmailUpdateEmailError: action.error.message,
                authEmailUpdateSuccessMessage: null,
                authEmailUpdatePasswordError: null
            };

        case 'EMAIL_UPDATE_PASSWORD_ERROR':
            console.log('User email update error', action.error.message);
            return {
                ...state,
                authEmailUpdateEmailError: null,
                authEmailUpdateSuccessMessage: null,
                authEmailUpdatePasswordError: action.error.message
            };

        case 'PASSWORD_UPDATE_SUCCESS':
            console.log('User password update success');
            return {
                ...state,
                authPasswordUpdateEmailError: null,
                authPasswordUpdatePasswordError: null,
                authPasswordUpdateSuccessMessage: 'Your password was successfully updated'
            };

        case 'PASSWORD_UPDATE_ERROR':
            console.log('User password update error', action.error.message);
            return {
                ...state,
                authPasswordUpdateEmailError: null,
                authPasswordUpdatePasswordError: action.error.message,
                authPasswordUpdateSuccessMessage: null
            };

        case 'DELETE_ACCOUNT_SUCCESS':
            console.log('User account was succesfully deleted');
            return {
                ...state,
                authDeleteAccountErrorMessage: null
            };

        case 'DELETE_ACCOUNT_ERROR':
            console.log('Delete user account error', action.error.message);
            return {
                ...state,
                authDeleteAccountErrorMessage: action.error.message
            };

        case 'DELETE_USER_AVATAR_ERROR':
            console.log('Delete user account error', action.error.message);
            return {
                ...state,
                authDeleteUserAvatarError: action.error.message
            };

        case 'DELETE_USER_BANNER_ERROR':
            console.log('Delete user account error', action.error.message);
            return {
                ...state,
                authDeleteUserBannerError: action.error.message
            };

        default:
            return state;
    }
};

export default authReducer;