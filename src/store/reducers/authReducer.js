
const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    switch(action.type) {

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

        default:
            return state;
    }
};

export default authReducer;