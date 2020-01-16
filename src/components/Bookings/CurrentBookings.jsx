import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    card: {
        width: '600px',
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
    },
});



function CurrentBookings({ booking, handleDelete }) {
    const classes = useStyles();

    const handleClick = () => {
        handleDelete(booking)
    }

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" align="left">
                        {booking.room.service.name}
                    </Typography>
                    <Typography variant="h6" align="left">
                        {booking.room.name}
                    </Typography>
                    <Typography variant="h6" align="left">
                        Date: {booking.date}
                    </Typography>
                    <Typography variant="h6" align="left">
                        Time: {booking.startTime}-{booking.endTime}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color='primary' onClick={handleClick}>
                        Remove
                    </Button>
                    {/*<Button color='primary' onClick={handleClick}>
                        Update
    </Button>*/}
                </CardActions>
            </Card>
        </>

    );
};
export default CurrentBookings;