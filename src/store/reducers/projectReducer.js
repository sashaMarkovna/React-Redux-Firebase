// In case we don't have data
const initState = {
    projects: [
        {id: '1', title: 'help me find peach', content: 'bla bla bla bla'},
        {id: '2', title: 'collect all the stars', content: 'bla bla bla bla bla bla'},
        {id: '3', title: 'egg hunt with Yoshi', content: 'bla bla bla bla bla'},
        {id: '4', title: 'bring some fun', content: 'bla bla bla'}
    ]
};

const projectReducer = (state = initState, action) => {

    switch (action.type) {

        case 'CREATE_PROJECT':
            console.log('Created project', action.project);
            return state;

        case 'CREATE_PROJECT_ERROR':
            console.log('create project error ', action.error);
            return state;

        default:
            return state;
    }
};

export default projectReducer;