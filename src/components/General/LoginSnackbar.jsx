import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import PropTypes from "prop-types";



const useStyles = makeStyles({
    error: {
        backgroundColor: '#d32f2f',
    },
    icon: {
        fontSize: 20,
    },
    message: {
        display: "flex",
        alignItems: "center"
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: '20px',
        fontSize: 20,
    }
});



const variantIcon = {
    error: ErrorIcon
};

const variantMessage = {
    error: 'Invalid login details.. Please try again'
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["error"]).isRequired
};

function MySnackbarContentWrapper(props) {
    const classes = useStyles();
    const { className, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {variantMessage[variant]}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
}



function LoginSnackbar({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <MySnackbarContentWrapper
                onClose={handleClose}
                variant={'error'}
            />
        </Snackbar>
    )

}
export default LoginSnackbar;