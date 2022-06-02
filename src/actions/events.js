import { types } from "../types/types"

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});


// es lo mismo que mandar null a setActive
// export const eventClearActive = (event) => ({   
//     type: types.eventSetActive,
//     payload: event
// });

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({
    type: types.eventDeleted,
});