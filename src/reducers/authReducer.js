import { types } from "../types/types"

const init = {
    checking: true,
    // uid: null,
    // name:null
}

export const authReducer = (state = init, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }


        default:
            return state;
    }
}