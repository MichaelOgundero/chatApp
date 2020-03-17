import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'


import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { TextField, Typography, List, ListItem,ListItemSecondaryAction,
         ListItemIcon, ListItemText, InputLabel, ListItemAvatar, Collapse, ListSubheader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import SearchIcon from '@material-ui/icons/Search'
import Box from '@material-ui/core/Box'
import {deepOrange, deepPurple} from '@material-ui/core/colors'
import Badge from '@material-ui/core/Badge';
import { InputAdornment, Hidden } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import EmailIcon from '@material-ui/icons/Email'
import PersonIcon from '@material-ui/icons/Person'
import FavoriteIcon from '@material-ui/icons/Favorite'
import BlockIcon from '@material-ui/icons/Block'
import {ExpandMore, ExpandLess, ExitToApp} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'



const StyledBadge = withStyles(theme => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);


const useStyles = makeStyles(theme=>({
    backgroundContainer:{
        //background:'#000000',
        background:'linear-gradient(45deg, #29323c 30%, #485563 90%)', 
        minHeight:"100vh", 
        minWidth:"100vw"
    },
    root: {
        //maxWidth:'85vw',
        margin: 'auto',
        background: theme.palette.common.black
    },
    gridOne:{
        //background: '#ff1100',
        background:'linear-gradient(45deg, #aa076b 30%, #61045f 90%)',
        //border: "1px solid black",
    },
    gridTwo:{
        border: '1px solid yellow',
    },
    gridThree:{
        border: '1px solid red',
    },   
     paper: {
         margin:theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //border: '1px solid red',
        
    },
    logoArea:{
        //border: '1px solid blue',
        //background: 'linear-gradient(45deg, #02aab0 30%, #00cdac 90%)',
        
    },
    appName:{
        fontWeight:'bold',
        fontSize: '35px',
        color: '#ffffff',
        //marginLeft:'20px'
    },
    userName:{
        fontWeight:"bold",
        fontSize:"13px",
        color:"#ffffff"
    },
    contentText:{
        fontSize:"13px",
        color:"white",
        fontWeight:"bold"
    },
    orange:{
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
    },
    purple:{
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500]
    },
    labelWhite:{
        '& .MuiInputLabel-root':{       
            color: '#ffffff',
        },
        '& label.Mui-focused': {
            color: '#ffffff',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff',
          },
        width:"100%"  

    },
    inputColor:{
        color:"white",
        borderBottom:"2px solid white"
    },
    activeFriends:{
        color: "white",
        fontWeight: "bold",
        fontSize:"15px"
    },
    secondaryAction:{
        width: theme.spacing(3),
        height: theme.spacing(2),
        backgroundColor: theme.palette.divider
    },
    secondaryActionNumber:{
        color: "white",
        fontWeight:"bold",
        fontSize:"8px"
    },
    handle:{
        //paddingTop:"0px",
        //paddingBottom:"0px",
        margin:0,
        padding:0,
        //paddingLeft:"32px",
        fontWeight:"bold", 
        fontSize:"10px", 
        color:"white"
    },
    fullname:{
        //paddingTop:"0px",
        //paddingBottom:"0px",
        margin:'0 !important',
        padding:'0 !important',
        //paddingLeft:"32px",
        fontWeight:"bold", 
        fontSize:"15", 
        color:"white"
    },
    rootDiv: {
        flexGrow: 1
    }


}))

export default function UserPage(props){
    const classes = useStyles();
    const history = useHistory();

    const [userData, setUserData] = useState([])
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(()=>{
        let unMounted = false;
        //_isMounted && loadUserData()

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('usertoken')}`
            },
        }
        axios.get(`http://localhost:5000/user/user_info/${props.match.params.user}`, config)
             .then(res=>{
                if(!unMounted){
                    setUserData(userData.push(res.data))
                    setIsLoading(false)
                    console.log(userData)
                }
             })
             .catch(err=>console.log(err))

        return ()=>{
            unMounted = true;
        }

    },[])//useeffect will only be called when userdata changes

    const loadUserData = () =>{

        setIsLoading(true);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('usertoken')}`
            },
            
        }
        axios.get(`http://localhost:5000/user/user_info/${props.match.params.user}`, config)
             .then(res=>{
                setUserData(userData.push(res.data))
                setIsLoading(false)
                console.log(userData)
             })
             .catch(err=>console.log(err))
    }

    const onLogout = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/authentication/logout')
             .then(res =>{
                localStorage.clear()
                history.push('/login')
             })
             .catch(err=>console.log(err))
    }

    const nameClick = () =>{
        setOpen(!open);
    }

    function formRow(){
        return(
            <React.Fragment>
                <Grid item xs={4}>
                    <ListItemAvatar>
                        <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        variant="dot"
                        >
                            <Avatar className={classes.purple}>N</Avatar>
                        </StyledBadge>
                    </ListItemAvatar>
                </Grid>
                <Grid item xs={4}>
                    <ListItemAvatar>
                        <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        variant="dot"
                        >
                            <Avatar className={classes.purple}>L</Avatar>
                        </StyledBadge>
                    </ListItemAvatar>
                </Grid>
                <Grid item xs={4}>
                    <ListItemAvatar>
                        <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        variant="dot"
                        >
                            <Avatar className={classes.purple}>A</Avatar>
                        </StyledBadge>
                    </ListItemAvatar>
                </Grid>
            </React.Fragment>
        )
    }

    if(isLoading){
        console.log("loading")
        return <div>Loading..</div>
    }


    return(
        <Container fixed  className={classes.backgroundContainer}>
            <div className={classes.rootDiv}>
            <Grid container spacing={0} component="main" className={classes.root}>
                <CssBaseline/>
                <Hidden xsDown>
                <Grid item xs={false} sm={3} md={3} lg={2} xl={2} className={classes.gridOne}>
                    <Container style={{margin:0,padding:0}}>
                        <div className={classes.paper}>
                            <div style={{minWidth:'100%', minHeight:'100%'}}>
                                <Box m={4} className={classes.logoArea}>
                                    <Typography variant='h5' className={classes.appName}>
                                        {"ChatApp"}
                                    </Typography>
                                </Box>
                            </div>
                            <div style={{minWidth:'100%', minHeight:'100%', background:"#263031"}}>
                                <List>
                                    <ListItem button onClick={nameClick}>
                                        <ListItemAvatar>
                                            <StyledBadge
                                            overlap="circle"
                                            anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                            }}
                                            variant="dot"
                                            >
                                                <Avatar className={classes.orange}>M</Avatar>
                                            </StyledBadge>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography variant='h5' className={classes.userName}>
                                                {"Michael"}
                                            </Typography>
                                        } />
                                        {open ? <ExpandLess style={{fill:"white"}}/> : <ExpandMore style={{fill:"white"}}/>}
                                    </ListItem>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button style={{paddingLeft:"32px"}} onClick={onLogout}>
                                                <ListItemIcon>
                                                    <ExitToApp style={{fill:"white"}} />
                                                </ListItemIcon>
                                                <ListItemText primary={
                                                    <Typography variant='h5' style={{fontWeight:"bold",fontSize:"11px",color:"white"}}>
                                                        {"Sign out"}
                                                    </Typography>}
                                                />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                </List>
                            </div>
                            <div style={{minWidth:'100%', minHeight:'100%', background:"#313b3c"}}>
                                <List>
                                    <ListItem>
                                    <TextField
                                        label="Search"
                                        variant="standard"
                                        className={classes.labelWhite}
                                        InputProps={{
                                            className:classes.inputColor,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                    >
                                                        <SearchIcon style={{fill:"white"}}/>
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    </ListItem>
                                </List>
                            </div>
                            <div style={{minWidth:'100%', minHeight:'100%', background:"#313b3c"}}>
                                <List>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <EmailIcon style={{fill:"white"}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography variant='h5' className={classes.contentText}>
                                                {"Messages"}
                                            </Typography>
                                        } />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end">
                                                <Avatar variant="square" className={classes.secondaryAction}>
                                                    <Typography variant='h5' className={classes.contentText}>
                                                        {"12"}
                                                    </Typography> 
                                                </Avatar>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <PersonIcon style={{fill:"white"}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography variant='h5' className={classes.contentText}>
                                                {"Visitors"}
                                            </Typography>
                                            } />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end">
                                                <Avatar variant="square" className={classes.secondaryAction}>
                                                    <Typography variant='h5' className={classes.contentText}>
                                                        {"2"}
                                                    </Typography> 
                                                </Avatar>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <FavoriteIcon style={{fill:"white"}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography variant='h5' className={classes.contentText}>
                                                {"Favourites"}
                                            </Typography>
                                            } />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end">
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <BlockIcon style={{fill:"white"}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography variant='h5' className={classes.contentText}>
                                                {"Blocked"}
                                            </Typography>
                                            } />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end">
                                                <Avatar variant="square" className={classes.secondaryAction}>
                                                    <Typography variant='h5' className={classes.contentText}>
                                                        {"4"}
                                                    </Typography> 
                                                </Avatar>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </div>
                            <div style={{minWidth:'100%', minHeight:'100%', background:"#263031"}}>
                                <Box m={1} p={1}>
                                    <Typography variant ="h5" className={classes.activeFriends}>
                                        {"Active Friends"}
                                    </Typography>
                                </Box>
                                <Box ml={.75} pl={.75} mb={3} pb={3} >
                                    <div style={{flexGrow:1}}>
                                        <Grid container spacing={1}>
                                            <Grid container item xs={12} spacing={3} style={{marginBottom:"2px", paddingBottom:"2px"}}>
                                                {formRow()}
                                            </Grid>
                                            <Grid container item xs={12} spacing={3} style={{marginBottom:"2px", paddingBottom:"2px"}}>
                                                {formRow()}
                                            </Grid>

                                        </Grid>
                                    </div>
                                </Box>
                            </div>
                            <div style={{minWidth:'100%', minHeight:'100%'}}>
                                <Box m={.25} p={.25}></Box>
                            </div>

                        </div>
                    </Container>
                </Grid>
                </Hidden>
               
                <Grid item xs={12} sm={9} md={7} lg={8} xl={8} className={classes.gridTwo}>
                    <Container style={{ margin:0,padding:0}}>
                        <div style={{border:"1px solid blue",width:"100%", height:"300px", maxHeight:"300x"}}> 

                        </div>
                        <div style={{border:"1px solid red",width:"100%", height:"100%", maxHeight:"100%"}}>

                        </div>
                    </Container>
                </Grid>
                
                <Hidden smDown>
                <Grid item xs={false} sm={false} md={2} lg={2} xl={2} className={classes.gridThree}>

                </Grid>
                </Hidden>
            </Grid>
            </div>
        </Container>
    )
}