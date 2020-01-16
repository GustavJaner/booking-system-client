import React, { useState, forwardRef } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import useLogin from "../../components/Authentication/useLogin"
import { Redirect } from 'react-router';
import SignInBackground from "../../assets/signin.jpg"
import { AUTH_TOKEN, USER, USER_NAME, USER_ID } from "../../constants"
import LoginSnackbar from '../../components/General/LoginSnackbar'


const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${SignInBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignInSide({ refetch }) {
  const classes = useStyles()
  const [loginUser, { loginError }] = useLogin()
  const [sucess, setSucess] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);



  const handleNameChange = event => {
    setUser(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };



  async function makeUser() {
    let login = null
    try {
      login = await loginUser({
        username: user,
        password: password
      })
    } catch (error) {
      setOpen(true)
    }
    refetch()
    //Set redirect variable to true, login was sucessfull
    if (login) {
      console.log('hej')
      localStorage.setItem(USER_NAME, { ...login.data.login.user.username })
      localStorage.setItem(USER_ID, { ...login.data.login.user.id })
      localStorage.setItem(AUTH_TOKEN, login.data.login.token)
      setSucess(true);
    }
  }


  //Redirect to Dashboard if a login was sucessfull
  if (sucess) {
    return <Redirect push to="/dashboard" />
  } else {
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
                onChange={handleNameChange}
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
                onChange={handlePasswordChange}
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
              <Box mt={5}>{/*<Copyright />*/}</Box>
            </form>
          </div>
        </Grid>
        <LoginSnackbar open={open} setOpen={setOpen} />
      </Grid>
    )
  }
}
