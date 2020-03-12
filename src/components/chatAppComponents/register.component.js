import React, { useState, useEffect } from 'react'//useEffect is like compnentdidmount it runs before everything loads
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckBox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Email'
import Lock from '@material-ui/icons/Lock'

import {Link as RouterLink} from 'react-router-dom'
import { InputAdornment, Fade, CircularProgress, Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

import axios from 'axios'
import { red } from '@material-ui/core/colors'
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
    textFieldPasswordMatch:{
        '& .MuiInputLabel-root':{       //when its not
            color: 'rgba(0,0,0,0.54)',
            '& .MuiFormLabel-asterisk':{
                color: 'rgba(0,0,0,0.54)'
            }
        },
        '& label.Mui-focused': {    //when its focused
            color: '#02aab0',
            '& .MuiFormLabel-asterisk':{
                color: '#02aab0'
            }
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#02aab0'
        },
        '& .MuiFormHelperText-root.Mui-error':{
            color: '#02aab0'
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
    }

}))


export default function Register(){


    /*const API_ID = "X86roonaGECZK_8bv8gWITXCK0MdRZEH4vkS3nIqZEQ"
    const Photo_ID = "SKcTKYNRvHY"
    const API_URL = `https://api.unsplash.com/photos/${Photo_ID}?client_id=${API_ID}`*/

    //const [image, setImage] = useState("");

    //like componentdidmount and componentdidupdate
    /*useEffect(()=>{ //the second parameter is used to tell react when we want our effect to be called
        loadImage();
    }, [])

    const loadImage = async ()=>{
        const response = await fetch(API_URL);
        const body = await response.json();
    }*/

    const classes = useStyles();
    const history = useHistory();

    const[isLoading, setIsLoading] = useState(false);
    const [snackBarStatus, setSnackBarStatus] = useState(false);
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const[usernameTakenError, setUsernameTakenError] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [firstNameErrorText, setFirstNameErrorText] = useState("");
    const [lastNameErrorText, setLastNameErrorText] = useState("");
    const [usernameErrorText, setUsernameErrorText] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("")
    const [confirmPassowrdErrorText, setConfirmPasswordErrorText] = useState("")
    
    const [showPassword, setShowPassword] = useState(false);

    const [textErrorColor, setTextErrorColor] = useState(classes.textField);
    const [errorVal, setErrorVal] = useState(false);

    const [firstNameErrorColor, setFirstNameErrorColor] = useState(classes.textField);
    const [firstNameErrorVal, setFirstNameErrorVal] = useState(false);
    const [lastNameErrorColor, setLastNameErrorColor] = useState(classes.textField);
    const [lastNameErrorVal, setLastNameErrorVal] = useState(false);
    const [usernameErrorColor, setUsernameErrorColor] = useState(classes.textField);
    const [usernameErrorVal, setUsernameErrorVal] = useState(false);
    const [emailErrorColor, setEmailErrorColor] = useState(classes.textField);
    const [emailErrorVal, setEmailErrorVal] = useState(false);
    const [passwordErrorColor, setPasswordErrorColor] = useState(classes.textField);
    const [passwordErrorVal, setPasswordErrorVal] = useState(false);
    const [confirmPasswordErrorColor, setConfirmPasswordErrorColor] = useState(classes.textField);
    const [confirmPasswordErrorVal, setConfirmPasswordErrorVal] = useState(false);

    const onRegister = (e) =>{
        e.preventDefault()

        setUsernameErrorColor(classes.textField)
        setUsernameErrorVal(false)
        setUsernameErrorText("")

        setEmailErrorColor(classes.textField)
        setEmailErrorVal(false)
        setEmailErrorText("")

        
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }

        setIsLoading(true);

        axios.post('http://localhost:5000/authentication/register', newUser)
             .then(res => {
                console.log(res.data)
                setIsLoading(false)
                setSnackBarStatus(true)
                setTimeout(()=>{history.push('/login')}, 2000)
                setFirstName("")
                setLastName("")
                setUsername("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setConfirmPasswordErrorVal(true);
                setConfirmPasswordErrorText("")  
             })
             .catch(err => {
                 if(err.response.data.message === "username taken"){
                    setIsLoading(false);
                    setUsernameErrorColor(classes.textFieldError)
                    setUsernameErrorVal(true)
                    setUsernameErrorText("Username Taken")
                 }else if(err.response.data.message === "email taken"){
                    setIsLoading(false);
                    setEmailErrorColor(classes.textFieldError)
                    setEmailErrorVal(true)
                    setEmailErrorText("Email Taken") 
                 }else{
                    setIsLoading(false);
                    setErrorSnackBar(true);
                 }
                })


    }

    const onlyLettersAndDigits = (str) => {
        const regex = /^[A-Za-z0-9]+$/
        return regex.test(str)
    }

    const onlyLetters = (str) => {
        const regex = /^[A-Za-z]+$/

        return regex.test(str)
    }
        
    const passwordChecker = (pswrd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[a-zA-Z\d@$!%*?&.]{8,}$/  //minimum 8 characters, at least one lower and upper and special characters
        return regex.test(pswrd)
    }


    const onChangeFirstName = (e) =>{
        //console.log(e.target.value)
        setFirstName(e.target.value);
        if(!onlyLetters(e.target.value)){
            setFirstNameErrorColor(classes.textFieldError)
            setFirstNameErrorVal(true)
            setFirstNameErrorText("Should only contain letters")
        }else{
            setFirstNameErrorColor(classes.textField)
            setFirstNameErrorVal(false)
            setFirstNameErrorText("")
        }
    }

    const onChangeLastName = (e) =>{
        setLastName(e.target.value);
        if(!onlyLetters(e.target.value)){
            setLastNameErrorColor(classes.textFieldError)
            setLastNameErrorVal(true)
            setLastNameErrorText("Should only contain letters")
        }else{
            setLastNameErrorColor(classes.textField)
            setLastNameErrorVal(false)
            setLastNameErrorText("")
        }
    }

    const onChangeUsername = (e) =>{
        setUsername(e.target.value);
        if(!onlyLettersAndDigits(e.target.value)){
            setUsernameErrorColor(classes.textFieldError)
            setUsernameErrorVal(true)
            setUsernameErrorText("Should only contain letters and numbers")
        }else{
            setUsernameErrorColor(classes.textField)
            setUsernameErrorVal(false)
            setUsernameErrorText("")
        }
    }

    const onChangeEmail = (e) =>{
        setEmail(e.target.value);
    }

    const onChangePassword = (e) =>{
        setPassword(e.target.value);
        if(!passwordChecker(e.target.value)){
            setPasswordErrorColor(classes.textFieldError)
            setPasswordErrorVal(true);
            setPasswordErrorText(`Your password needs to;
                                  include at least one upper case and one lower case characater, 
                                  include at least one number and one of these symbol[@$!%*?&.], 
                                  be at least 8 characters long`) 
        }else{
            setPasswordErrorColor(classes.textField)
            setPasswordErrorVal(false)
            setPasswordErrorText("")
        }
    }

    const onChangeConfirmPassword = (e) =>{
        setConfirmPassword(e.target.value);
        if(e.target.value !== password){
            setConfirmPasswordErrorColor(classes.textFieldError);
            setConfirmPasswordErrorVal(true);
            setConfirmPasswordErrorText("Passwords don't match")
        }else{
            setConfirmPasswordErrorColor(classes.textFieldPasswordMatch);
            setConfirmPasswordErrorVal(true);
            setConfirmPasswordErrorText("Passwords Match")        
        }
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
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.gridBackground}>
               <Container maxWidth="xs" className={classes.marginContainer} >
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Box m={5}>
                            <Typography variant="h5" className={classes.createAccount}>
                                Create Account
                            </Typography>
                        </Box>

                        <form className={classes.form} >
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        helperText = {firstNameErrorText}
                                        error = {firstNameErrorVal}
                                        value={firstName}
                                        onChange={onChangeFirstName}
                                        className={firstNameErrorColor}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="lname"
                                        name="lastName"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        helperText = {lastNameErrorText}
                                        error = {lastNameErrorVal}
                                        value={lastName}
                                        onChange={onChangeLastName}      
                                        className={lastNameErrorColor}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus = {usernameTakenError}
                                        autoComplete="username"
                                        name="username"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        value={username}
                                        helperText = {usernameErrorText}
                                        error = {usernameErrorVal}
                                        className={usernameErrorColor}
                                        onChange={onChangeUsername}  
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
                                        autoComplete="email"
                                        name="email"
                                        variant="standard"
                                        required
                                        fullWidth
                                        type="email"
                                        id="email"
                                        label="Email"
                                        value={email}
                                        helperText = {emailErrorText}
                                        error = {emailErrorVal}
                                        onChange={onChangeEmail} 
                                        className={emailErrorColor}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email/>
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
                                        type={showPassword ? "text" : "password"}//show password will be text if true and password if false
                                        id="password"
                                        label="Password"
                                        helperText = {passwordErrorText}
                                        error = {passwordErrorVal}
                                        className={passwordErrorColor}
                                        value={password}
                                        onChange={onChangePassword} 
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock/>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="current-password"
                                        name="confirmPassword"
                                        variant="standard"
                                        required
                                        fullWidth
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        helperText = {confirmPassowrdErrorText}
                                        error = {confirmPasswordErrorVal}
                                        className={confirmPasswordErrorColor}
                                        value={confirmPassword}
                                        onChange={onChangeConfirmPassword} 
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock/>
                                                </InputAdornment>
                                            ),

                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.submit}
                                onClick={onRegister}
                            >
                                Register
                                <Fade in={isLoading} style={{position:'absolute',right:'10px'}}>
                                    <CircularProgress size="1.25rem" thickness="12" color="white"/>
                                </Fade>
                            </Button>
                            <Grid container justify="center" alignItems="center">
                                <Grid item>
                                    <RouterLink className={classes.RouterLink}  to="/login" >
                                        {"Already have an account? Login"}
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
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Snackbar 
                anchorOrigin={{vertical:"bottom", horizontal:"left"}}
                open={snackBarStatus}>
                <Alert severity="success">
                   Account Created
                </Alert>
            </Snackbar>
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