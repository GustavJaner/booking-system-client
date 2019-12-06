import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));

function DateTimeslots({ setTimeslot, bookings, date, room }) {
    //Create array with timeslots
    const createTimeslots = () => {
        var timeSlotArr = []
        var startTime = room.start;
        var endTime = room.end;
        var roomDuration = room.duration;
        var dateString = date.format('DD-MM-YYYY');


        var diffSec = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'minutes');
        var durInt = parseInt(roomDuration);
        console.log(diffSec % durInt)

        //Create array with all timeslots, initialized to be available
        while (startTime !== endTime) {
            var slot = {
                start: startTime,
                end: null,
                disable: false
            };
            startTime = moment(moment(startTime, 'HH:mm').add(roomDuration * 60, 'seconds')).format('HH:mm');
            slot.end = startTime;
            timeSlotArr.push(slot);
        };

        //Disable timeslots if they're booked by someone else
        bookings.forEach(booking => {
            for (let i = 0; i < timeSlotArr.length; i += 1) {
                if (timeSlotArr[i].start === booking.startTime && dateString === booking.date) {
                    timeSlotArr[i].disabled = true;
                    break;
                }
            }
        });

        return timeSlotArr;
    };

    const timeSlots = createTimeslots();
    const classes = useStyles();
    const [value, setValue] = useState('');

    const handleChange = event => {
        setValue(event.target.value);
        setTimeslot({ start: event.target.value, end: moment(moment(event.target.value, 'HH:mm').add(room.duration * 60, 'seconds')).format('HH:mm') });
    };

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Timeslots</FormLabel>
            <RadioGroup aria-label="Timeslots" name="Timeslots1" value={value} onChange={handleChange}>
                {timeSlots.map((slot) =>
                    <FormControlLabel key={slot.start}
                        value={slot.start}
                        disabled={slot.disabled}
                        label={slot.start + '-' + slot.end}
                        control={<Radio />}
                    />
                )}
            </RadioGroup>
        </FormControl>
    );
};
export default DateTimeslots;