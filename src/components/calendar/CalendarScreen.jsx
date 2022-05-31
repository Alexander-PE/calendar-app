import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { uiOpenModal } from '../../actions/ui';

import { useDispatch } from 'react-redux';
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

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch = useDispatch();

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }
    const onSelectEvent = (e) => {
        console.log(e);
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
                events={myEventsList}
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


            <CalendarModal/>
        </div>
    )
}
