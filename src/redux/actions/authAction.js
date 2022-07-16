export const AUTH_TYPE = {
    SET_INTRO_SLIDER_DONE: 'SET_INTRO_SLIDER_DONE',
    SET_AUTH: 'SET_AUTH',
    SET_USER: 'SET_USER',
    SET_WALLET: "SET_WALLET"
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

export const setUser = (payload) => {
    return {
        type: AUTH_TYPE.SET_USER,
        payload
    }
}

export const setWalletAmount = (payload) => {
    return {
        type: AUTH_TYPE.SET_WALLET,
        payload
    }
}