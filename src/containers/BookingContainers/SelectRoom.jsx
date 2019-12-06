import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function SelectRoom({ rooms, room, setRoom }) {
    const classes = useStyles();

    const handleChange = event => {
        setRoom(event.target.value);
    };

    function compare(a, b) {
        if (a.last_nom < b.last_nom) {
            return -1;
        }
        if (a.last_nom > b.last_nom) {
            return 1;
        }
        return 0;
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="select-room">Rooms</InputLabel>
                <Select
                    labelId="select-room"
                    id="select"
                    value={room}
                    onChange={handleChange}
                >
                    {rooms.sort(compare).map((room) =>
                        <MenuItem value={room}>{room.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )
}
export default SelectRoom;