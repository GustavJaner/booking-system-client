import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import Calendar from 'rc-calendar';
import moment from 'moment';
//import "rc-calendar/assets/index.css"


function BookingCalendar() {



    const [date, setDate] = useState(moment().format('DD MM YYYY'))
    const [disabledDates, setDisabledDate] = useState()
    const [test, setTest] = useState([])


    function addTest(moment) {
        console.log(moment);


        test.push(moment);

        console.log(date);
    }



    function disabledDate(current) {
        const date = moment();

        if (!current) {
            // allow empty select
            return false;
        }
        date.hour(0);
        date.minute(0);
        date.second(0);
        if (current.valueOf() < date.valueOf()) {
            return true;
        } else {
            return test.includes(current.format('DD MM YYYY'));
        }


    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Calendar
                        onSelect={e => setDate(e.format('DD MM YYYY'))}
                        disabledDate={disabledDate}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" component="h3">
                        {date}
                    </Typography>
                    <Button
                        onClick={() => addTest(date)}
                    >
                        Test Button
                    </Button>
                </Grid>


            </Grid>
        </>

    );
};

export default BookingCalendar;