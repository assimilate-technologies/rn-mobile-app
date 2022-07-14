import { AUTH_TYPE } from "../actions/authAction";

const initialState = {
    introSliderCompleted: false,
    isAuthenticated: false,
    userInfo: {},
    errorData: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_TYPE.SET_INTRO_SLIDER_DONE: {
            return {
                ...state,
                introSliderCompleted: true,
            }
        }
        case AUTH_TYPE.SET_AUTH: {
            return {
                ...state,
                isAuthenticated: true,
            }
        }
        default:
            return state;
    }
};

export default authReducer;
