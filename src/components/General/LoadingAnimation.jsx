import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(there => ({
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))


const LoadingAnimation = () => {
    const classes = useStyles();

    return (
        <div className={classes.loading}>
            <CircularProgress />
        </div>
    );
};
export default LoadingAnimation;