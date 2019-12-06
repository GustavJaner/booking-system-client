import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment';
//Component imports
import TestBooking from '../../components/Bookings/TestBooking'
import DateTimeslots from '../../components/Bookings/DateTimeslots'
//GraphQL imports
import useBookingsByRoom from '../../components/Querys/useBookingsByRoom'



function SelectDateTime({ room, date, changeDate, setTimeslot }) {

    const { bookings, loading } = useBookingsByRoom({ id: room.id });

    const slots = () => {
        return (moment(room.endTime, 'HH:mm').diff(moment(room.startTime, 'HH:mm'), 'minutes') / room.duration)
    }

    const disabledDates = () => {

        var fullDates = {};
        bookings.forEach(function (i) { fullDates[i.date] = (fullDates[i.date] || 0) + 1; });

        for (var b in fullDates) {
            if (fullDates[b] < slots) {
                delete fullDates[b];
            }
        }
        return fullDates;
    }


    if (loading) { return <CircularProgress /> };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={7} lg={7}>
                <TestBooking date={date} changeDate={changeDate} fullDates={disabledDates()} />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
                <DateTimeslots setTimeslot={setTimeslot} bookings={bookings} date={date} room={room} />
            </Grid>
        </Grid>
    );
}
export default SelectDateTime;