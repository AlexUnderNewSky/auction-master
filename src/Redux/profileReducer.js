let initialState = {
    user: {
        userId: null,
        nickname: null,
        email: null,
        password: null,
        name: null,
        secondName: null,
        isAdmin: null,
        betList: null,
    }
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET-USER': {
            return {user: {...action.user, userId: action.user._id}}
        }
        default:
            return state;
    }
}

export default profileReducer;

export const setUser = (user) => {
    return {type: 'SET-USER', user}
}