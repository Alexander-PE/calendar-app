import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/events'

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    
    const deleteEvent = () => {
        dispatch(eventDeleted());
    }

  return (
    <button onClick={deleteEvent} className='btn btn-danger fab-danger'>
        <i className='fas fa-trash'></i>
        <span>Eliminar</span>
    </button>
  )
}
