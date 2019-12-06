import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';


const TestBooking = ({ date, changeDate, fullDates }) => {

    function disableFullDates(date) {
        return date.format('DD-MM-YYYY') in fullDates;
    }

    // prettier-ignore
    return (
        <>
            <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        autoOk
                        disablePast="true"
                        format={'DD-MM-YYYY'}
                        orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={date}
                        shouldDisableDate={disableFullDates}
                        onChange={changeDate}
                    />
                </MuiPickersUtilsProvider>
            </div>
        </>
    );
};

export default TestBooking;