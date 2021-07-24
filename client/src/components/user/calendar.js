import React from 'react';
import { Container} from  'react-bootstrap';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const DateWrapper = ({children}) => 
    React.cloneElement(React.Children.only(children),{
        style: {
            backgroundColor: 'lightblue',
        },
    })

const CalendarComp = (props) => {
    const {eventList} = props

    return (
        <Container>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                views={['month', 'agenda']}
                events={eventList}
                style={{height:300}}
                components={{
                    timeSlotWrapper: DateWrapper,
                }}
            />
        </Container>
    )
}

export default CalendarComp;

