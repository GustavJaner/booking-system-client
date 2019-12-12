import React, { forwardRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import useLogin from '../../components/Authentication/useLogin';
import { Link } from 'react-router-dom';

import SignInBackground from '../../assets/signin.jpg';
import { AUTH_TOKEN } from '../../constants'


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${SignInBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const homeLink = forwardRef((props, ref) => (
    <Link innerRef={ref} to="/admin" {...props} />
));

export default function SignInSide() {
    const classes = useStyles();
    const [loginUser] = useLogin();

    async function makeUser() {
        let login = await loginUser({
            username: "MaxDagerbratt",
            password: "123456"
        })
        console.log(login)

        localStorage.setItem(AUTH_TOKEN, login.data.login.token)
    }
    console.log(localStorage.getItem(AUTH_TOKEN))
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            /*component={homeLink}*/
                            onClick={makeUser}
                            //type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        //  className={classes.submit}
                        >
                            Sign In
            </Button>
                        <Box mt={5}>
                            {/*<Copyright />*/}
                        </Box>
                    </form>
                </div>
            </Grid>
            <button onClick={() => makeUser()}>  Test </button>
        </Grid >
    );
}