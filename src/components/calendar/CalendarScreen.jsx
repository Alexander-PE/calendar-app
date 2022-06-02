import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import {AddNewFab} from '../ui/AddNewFab';

import { useDispatch, useSelector} from 'react-redux';
import { Navbar } from '../ui/Navbar';
import {messages} from '../../helpers/calendar-messages';
import {CalendarEvent} from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const myEventsList = [
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
]

export const CalendarScreen = () => {

    //mostrar los eventos del store
    const {events} = useSelector(state => state.calendar);


    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch = useDispatch();

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }  

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
        }

        return {style}; 
    }

    return (
        <div className='calendar-screen '>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"

                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab/>

            <CalendarModal/>
        </div>
    )
}
