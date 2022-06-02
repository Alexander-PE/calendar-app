import { types } from "../types/types";
import moment from "moment";

const initialState = {
    events: [
        {
            title: 'All Day Event very long title',
            start: moment().toDate(),  // lo mismo que new Date()
            end: moment().add(2, 'hours').toDate() ,   // le agregamos dos horas
            allDay: true,
            user: {
                _id: '123',
                name: 'Juan'
            }
        }
    ],
    active: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state, 
                active: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventUpdated:
            return{
                ...state,
                events: state.events.map(event =>
                    event._id === action.payload._id ? action.payload : event
                )           
            }


        default:
            return state;
    }
}