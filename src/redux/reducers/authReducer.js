import { AUTH_TYPE } from "../actions/authAction";

const initialState = {
    introSliderCompleted: false,
    isAuthenticated: false,
    userInfo: {},
    errorData: null,
    walletAmount: 0,
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
        case AUTH_TYPE.SET_USER: {
            return {
                ...state,
                userInfo: action?.payload,
            }
        }
        case AUTH_TYPE.SET_WALLET: {
            return {
                ...state,
                walletAmount: action?.payload || 0,
            }
        }
        default:
            return state;
    }
};

export default authReducer;
