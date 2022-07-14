export const AUTH_TYPE = {
    SET_INTRO_SLIDER_DONE: 'SET_INTRO_SLIDER_DONE',
    SET_AUTH: 'SET_AUTH',
}

export const setIntroSliderComplete = () => {
    return {
        type: AUTH_TYPE.SET_INTRO_SLIDER_DONE
    }
}

export const setAuth = () => {
    return {
        type: AUTH_TYPE.SET_AUTH
    }
}