import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckBox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Person from '@material-ui/icons/Person'
import Lock from '@material-ui/icons/Lock'

import {Link as RouterLink} from 'react-router-dom'
import { InputAdornment, Fade, CircularProgress, Snackbar } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import MuiAlert from '@material-ui/lab/Alert'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios'
import { useHistory } from 'react-router-dom'




function Alert(props){
    return <MuiAlert elevation={6} variany="filled" {...props}/>
}

function Copyright(){
    return(
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                ChatApp
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}




const useStyles = makeStyles(theme=>({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 
            theme.palette.type === 'dark' ? theme.palette.grey[900]: theme.palette[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8),//material ui uses 8px factor by defaul so this means 8*8 -> 64px
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),//vertical spacing
        backgroundColor: theme.palette.secondary.main,
        
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        //border: "1px solid red"
    },
    submit: {
        margin: theme.spacing(3,0,2),//top right bottom left

        background: 'linear-gradient(45deg, #02aab0 30%, #00cdac 90%)',//green beach
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(2, 170, 176, .3)',
        color: 'white',
        
    },
    RouterLink:{
        textDecoration: "none",
        "&:hover": {    //when the cursor hovers the link
            textDecoration: "underline"
        },
        color: "#02aab0",
        fontSize:"13px"
    },
    textField:{
        '& label.Mui-focused': {//changes the color of the label on the text field when its focused
            color: '#02aab0',
          },
        '& .MuiInput-underline:after': {//changes the border color when focused
            borderBottomColor: "#02aab0",
          },
    },
    textFieldError:{
        '& label.Mui-focused': {
            color: '#eb3349'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#eb3349'
        },
    },
    marginContainer:{
       border: "none",
       marginTop: "40px",
       background: "white"
    },
    margin: {
        margin: theme.spacing(1)
    },
    createAccount:{
        fontWeight: "bold",
        fontSize: "25px",
        color: "#02aab0"
    },
    gridBackground:{
        background: 'linear-gradient(45deg, #02aab0 30%, #00cdac 90%)'
    },
    register:{
        marginTop: theme.spacing(1)
    },
    checkBox:{
        marginTop: theme.spacing(2),
    },
    FormControlLabel: {
        fontSize: "13px",
        '& label': {fontSize: "13px"},
    },
    
}))

export default function Login(){
    const classes = useStyles();

    const history = useHistory();

    const[isLoading, setIsLoading] = useState(false); 
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const[usernameErrorColor, setUsernameErrorColor] = useState(classes.textField)
    const[usernameErrorVal, setUsernameErrorVal] = useState(false);
    const[passwordErrorColor, setPasswordErrorColor] = useState(classes.textField);
    const[passwordErrorVal, setPasswordErrorVal] = useState(false)
    const[errorText, setErrorText] = useState(null)

    const onLogin = (e) => {
        e.preventDefault();
        
        setErrorText(null)
        setUsernameErrorColor(classes.textField);
        setUsernameErrorVal(false);
        setPasswordErrorColor(classes.textField);
        setPasswordErrorVal(false);

        const user = {
            usernameEmail: usernameEmail,
            password: password
        }

        setIsLoading(true);

        axios.post('http://localhost:5000/authentication/login', user)
             .then(res => {
                // console.log(res.data.message)
                 setIsLoading(false)
                 localStorage.clear()
                 localStorage.setItem('usertoken', res.data.token)
                 localStorage.setItem('refreshToken', res.data.refreshToken)
                 setUsernameEmail("")
                 setPassword("")
                 setErrorText(null)
                 history.push(`/user/${res.data.username}`);
                })
             .catch(err => {
                 console.log(err)
                 setErrorText(
                    <Fade in={true}>
                    <Box mb={1} pb={1}>
                            <Typography variant="h5" color="error" style={{fontSize:"10px", fontWeight:"bold"}}>
                                Invalid username/email or password
                            </Typography>
                        </Box>
                    </Fade>
                 )
                 setIsLoading(false);
                 setUsernameErrorVal(true);
                 setUsernameErrorColor(classes.textFieldError)
                 setPasswordErrorVal(true);
                 setPasswordErrorColor(classes.textFieldError)
                 setPassword("")
                 setErrorSnackBar(true);
                })
        
    }

    const [usernameEmail, setUsernameEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const onChangeUsernameEmail = (e) => {
        setUsernameEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = e => {
        e.preventDefault();
    }


    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.gridBackground}>
               <Container maxWidth="xs" className={classes.marginContainer} >
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Box m={5}>
                            <Typography variant="h5" className={classes.createAccount}>
                                Sign In
                            </Typography>
                        </Box>
                        {errorText}
                        <form className={classes.form} >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="email"
                                        name="email"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="usernameEmail"
                                        label="Username or Email"
                                        error={usernameErrorVal}
                                        value = {usernameEmail}
                                        className={usernameErrorColor}
                                        onChange = {onChangeUsernameEmail}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="current-password"
                                        name="password"
                                        variant="standard"
                                        required
                                        fullWidth
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        label="Password"
                                        value = {password}
                                        onChange = {onChangePassword}
                                        error={passwordErrorVal}
                                        className={passwordErrorColor}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock/>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick = {handleClickShowPassword}
                                                        onMouseDown = {handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility/> : <VisibilityOff/> }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                className={classes.checkBox}
                                control={<CheckBox style={{color:"#02aab0"}}  value="remember" size="small"/>}
                                label={<Typography className={classes.FormControlLabel}>Remember me</Typography>}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.submit}
                                onClick={onLogin}
                            >
                                Sign In
                                <Fade in={isLoading} style={{position:'absolute',right:'10px'}}>
                                    <CircularProgress size="1.25rem" thickness={12} color="inherit"/>
                                </Fade>
                            </Button>
                            <Grid container justify="center" alignItems="center">
                                <Grid item >
                                    <RouterLink className={classes.RouterLink}  to="#" >
                                        {"Forgot Password?"}
                                    </RouterLink>                                    
                                </Grid>
                                <Grid item className={classes.register}>
                                    <RouterLink className={classes.RouterLink}  to="/register" >
                                        {"Don't have an account? Register"}
                                    </RouterLink>                                    
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box pb={2}>
                        <Copyright/>
                    </Box>
               </Container>
            </Grid>
            <Snackbar 
                anchorOrigin={{vertical: "bottom", horizontal:"left"}}
                open={errorSnackBar}
                onClose={(event, reason)=>{
                    if(reason==='clickaway'){
                        return;
                    }
                    setErrorSnackBar(false)
                }}
                autoHideDuration={5000}>
                
                <Alert severity="error" onClose={(event, reason)=>{
                    if(reason==='clickaway'){
                        return;
                    }
                    setErrorSnackBar(false)
                }}>
                    Something went wrong
                </Alert>
            </Snackbar>
        </Grid>
    )
}