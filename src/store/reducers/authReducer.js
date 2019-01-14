
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
            return {
                ...state,
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

        case 'USER_DATA_UPDATE_SUCCESS':
            console.log('User data was succesfully updated', action.newData);
            return {
                ...state,
                authError: null
            };

        case 'USER_DATA_UPDATE__ERROR':
            console.log('User data update error', action.error.message);
            return {
                ...state,
                authError: action.error.message
            };

        case 'UNFOLLOW_SUCCESS':
            console.log('Unfollow success');
            return {
                ...state,
                authError: null
            };

        case 'UNFOLLOW_ERROR':
            console.log('Unfollow error', action.error.message);
            return {
                ...state,
                authError: action.error.message
            };

        case 'FOLLOW_SUCCESS':
            console.log('Follow success');
            return {
                ...state,
                authError: null
            };

        case 'FOLLOW_ERROR':
            console.log('Follow error', action.error.message);
            return {
                ...state,
                authError: action.error.message
            };

        case 'TOGGLE_FOLLOW_ERROR':
            console.log('Toggle Follow error', action.error.message);
            return {
                ...state,
                authError: action.error.message
            };


        default:
            return state;
    }
};

export default authReducer;