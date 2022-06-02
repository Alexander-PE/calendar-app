import React, { useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';

import { eventSetActive, eventUpdated, eventAddNew } from '../../actions/events';

// por errores de compatibilidad 
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css"
import "react-clock/dist/Clock.css"


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');
const now = moment().minutes(0).seconds(0).add(1,'hours');

const endDate = now.clone().add(1,'hours');
// const end = moment().minutes(0).seconds(0).add(2,'hours');


const initEvent = {
    title:"", 
    notes:"", 
    start: now.toDate(), 
    end: endDate.toDate()
}


export const CalendarModal = () => {

    const {modalOpen} = useSelector( state => state.ui );
    const {active} = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const [dateStart, setDateStart] = React.useState(now.toDate());
    const [dateEnd, setDateEnd] = React.useState(endDate.toDate());
    const [titleValid, setTitleValid] = React.useState(true);

    // initevent es lo mismo a lo comentado pero es para restablecer el formulario
    const [formValues, setFormValues] = React.useState( initEvent );

    const {notes, title, start, end} = formValues;

    useEffect(() => {
        if(active){
            setFormValues(active);
        }
    }, [active, setFormValues])



    const handleInputChange = ({target}) => {
        setFormValues({...formValues, [target.name]: target.value}); // solo va a cambiar la propiedad con el mismo nombre del input
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventSetActive(null));
        setFormValues(initEvent);
    }

    const handleStartDate = (e) => {
        setFormValues({...formValues, start: e});
        setDateStart(e);
    }
    const handleEndDate = (e) => {
        setFormValues({...formValues, end: e});
        setDateEnd(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);
        console.log(momentStart);
        console.log(momentEnd);

        if(momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha de inicio debe ser antes que la fecha final',
            });
        }

        if(title.trim().length < 2) {
            return setTitleValid(false);
        }


        // agregar eventos al store

        if(active){
            dispatch(eventUpdated(formValues));
        }else{
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Alexander'
                }
            }));
        }

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal 
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1> Nuevo evento </h1> 
            
            <hr />
            <form className="container" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker onChange={handleStartDate} value={dateStart} className='form-control'/>
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker onChange={handleEndDate} value={dateEnd} minDate={dateStart} className='form-control'/>
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input type="text" className={`form-control ${!titleValid && "is-invalid"}`} placeholder="Título del evento" onChange={handleInputChange} value={title} name="title" autoComplete="off" />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea type="text" className="form-control" onChange={handleInputChange} value={notes} placeholder="Notas" rows="5" name="notes"></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
