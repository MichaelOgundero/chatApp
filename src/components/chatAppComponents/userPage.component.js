import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { TextField, Typography, List, ListItem,ListItemSecondaryAction,
         ListItemIcon, ListItemText, InputLabel, ListItemAvatar, Collapse, ListSubheader, CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import SearchIcon from '@material-ui/icons/Search'
import Box from '@material-ui/core/Box'
import {deepOrange, deepPurple} from '@material-ui/core/colors'
import Badge from '@material-ui/core/Badge';
import { InputAdornment, Hidden, Backdrop, NativeSelect,FormControl,MenuItem,Select,Button } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import EmailIcon from '@material-ui/icons/Email'
import PersonIcon from '@material-ui/icons/Person'
import FavoriteIcon from '@material-ui/icons/Favorite'
import BlockIcon from '@material-ui/icons/Block'
import {ExpandMore, ExpandLess, ExitToApp, MoreHoriz, 
        FiberManualRecord, Cake, LocationOn, Wc, Event} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import {Tab, Tabs} from '@material-ui/core'

import profilePic from "../../assets/profileImage.jpg"

function TabPanel(props){
    const {children, value, index, ...other} = props;

    return(
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index){
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: "#02aab0"
    }
})(Tabs);

const AntTab = withStyles(theme=>({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily:[
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&: hover': {
            color: "#00cdac",
            opacity: 1
        },
        '&$selected':{
            color: '#02aab0',
            fontWeight: theme.typography.fontWeightMedium
        },
        '&:focus':{
            color: "#00cdac"
        },
    },
    selected: {},
}))(props=> <Tab disableRipple {...props}/>)

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
    backdrop:{
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff"
    },
    backgroundContainer:{
        //background:'#000000',
        background:'linear-gradient(45deg, #29323c 30%, #485563 90%)', 
        minHeight:"100vh", 
        minWidth:"100vw"
    },
    root: {
        width: '85vw',
        //maxWidth:'85vw',
        margin: 'auto',
        background: theme.palette.common.black
    },
    gridOne:{
        //background: '#ff1100',
        background:'linear-gradient(45deg, #02aab0 30%, #00cdac 90%)',

        //border: "1px solid black",
    },
    gridTwo:{
        //border: '1px solid yellow',
        background:"black"
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
        fontSize: '3vw',
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
    editProfile:{
        margin: theme.spacing(3,0,2),//top right bottom left

        background: 'linear-gradient(45deg, #02aab0 30%, #00cdac 90%)',//green beach
        border: 0,
        borderRadius: 20,
        "&:hover":{
            boxShadow: '0 3px 5px 2px rgba(2, 170, 176, .3)',
        },
        
        color: 'white',
    },
    selectStatus:{
        '& .MuiSelect-icon':{
            color:"#000000"
        },
        '&&&:before':{
            borderBottom:"none"
        },
        '&&:after':{
            borderBottom:"none"
        },

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
    },

    rootHeader:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        height:"100%",
        width:"100%"
    },

    profilePic:{
        display:"flex",
        flexDirection:"column",
    }


}))

export default function UserPage(props){
    const classes = useStyles();
    const history = useHistory();

    const [userData, setUserData] = useState([])
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [backdropStatus, setBackdropStatus] = useState(true);
    
    const [currentStatus, setCurrentStatus] = useState(1);
    const [currentTab, setCurrentTab] = useState(1);

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
                    setBackdropStatus(false)
                    console.log(userData)
                }
             })
             .catch(err=>console.log(err))

        return ()=>{
            unMounted = true;
        }

    },[])//useeffect will only be called when userdata changes

   /* const loadUserData = () =>{

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
    }*/

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

    const handleCurrentStatusChange = e =>{
        setCurrentStatus(e.target.value)
    }

    const handleCurrentTabChange = (event, newValue) => {
        setCurrentTab(newValue);
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
        return(
            <Backdrop className={classes.backdrop} open={backdropStatus}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
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
                                                <Avatar src={profilePic}></Avatar>
                                            </StyledBadge>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography variant='h5' className={classes.userName}>
                                                {"Susan"}
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
                            <Hidden mdUp>
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
                            </Hidden>

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
                                    <Hidden mdUp>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <MoreHoriz style={{fill:"white"}}/>
                                            </ListItemIcon>
                                            <ListItemText primary={
                                                <Typography variant='h5' className={classes.contentText}>
                                                    {"More"}
                                                </Typography>}
                                            />
                                        </ListItem>
                                    </Hidden>
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
               
                <Grid item xs={12} sm={9} md={6} lg={7} xl={7} className={classes.gridTwo}>
                    <Container style={{ margin:0,padding:0, background:"white"}}>
                        <div style={{width:"100%", height:"33vh", maxHeight:"33vh"}}> 
                            <Box className={classes.rootHeader} >
                                <Box className={classes.profilePic} style={{width:"30%",height:"100%",}}> 
                                    <Box display="flex" alignItems="center"  style={{ width:"100%", height:"90%"}}>
                                        <div style={{width:"85%", height:"85%", margin:"0 auto"}}>
                                            <Avatar alt="profile Image" src={profilePic} style={{width:"100%", height:"100%"}}/>
                                        </div>
                                    </Box>
                                    <Box style={{ width:"100%", height:"15%",}}>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <FormControl>
                                                <Select
                                                    value={currentStatus}
                                                    onChange={handleCurrentStatusChange}
                                                    className={classes.selectStatus}
                                                >
                                                    <MenuItem value={1}>
                                                        <div style={{width:"100%"}}>
                                                            <Box display="flex" flexDirection="row" alignItems="center">
                                                                <Box pr={1}>
                                                                    <FiberManualRecord style={{fill:"#00cc00", width:"11px",height:"11px"}}/>
                                                                </Box>
                                                                <Box>
                                                                    <Typography variant="h5" style={{fontSize:"13px",}}>
                                                                        {"Online"}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </div>
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                    <div style={{width:"100%"}}>
                                                            <Box display="flex" flexDirection="row" alignItems="center">
                                                                <Box pr={1}>
                                                                    <FiberManualRecord style={{fill:"#ff0000", width:"11px",height:"11px"}}/>
                                                                </Box>
                                                                <Box>
                                                                    <Typography variant="h5" style={{fontSize:"13px",}}>
                                                                        {"Away"}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </div>
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                    <div style={{width:"100%"}}>
                                                            <Box display="flex" flexDirection="row" alignItems="center">
                                                                <Box pr={1}>
                                                                    <FiberManualRecord style={{fill:"#ffcc00", width:"11px",height:"11px"}}/>
                                                                </Box>
                                                                <Box>
                                                                    <Typography variant="h5" style={{fontSize:"13px",}}>
                                                                        {"Do Not Disturb"}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </div>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="column" style={{width:"55%", height:"100%",}}> 
                                    <Box mt={1} ml={1} mr={1} mb={0} pt={1} pl={1} pr={1} pb={0}>
                                        <Typography component="div">
                                            <Box
                                                fontWeight="fontWeightBold"
                                                fontSize="2vw"
                                                style={{wordWrap:"break-word"}}
                                            >
                                                {"Susan Andrews"}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box ml={1} mr={1} mt={0} pt={0} pl={1} pr={1}>
                                        <Typography component="div">
                                            <Box
                                                fontWeight="fontWeightLight"
                                                fontSize="1vw"
                                                style={{color:"#696969", wordWrap:"break-word"}}
                                            >
                                                {"@youngTickles"}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box ml={1} mr={1} mt={1} pt={1} pl={1} pr={1}>
                                        <Typography component="div">
                                            <Box
                                                fontWeight="fontWeightLight"
                                                fontSize="1vw"
                                                style={{color:"#000000", wordWrap:"break-word", }}
                                                p={0} m={0}
                                            >
                                                {"This is my status and my status is what my status is This is my status and my status is what my status is"}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box ml={1} mr={1} mt={1} pt={0} pl={1} pr={1}>
                                        <div style={{width:"100%", }} >
                                            <Box display="flex" flexDirection="row" style={{margin:"0 !important", padding:"0 !important"}}>
                                                <Box style={{margin:0, padding:0}}>
                                                    <Cake fontSize="small" style={{margin:0,padding:0, borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"4px", marginLeft:"2px", marginRight:"8px"}}
                                                    >
                                                        {"May 12, 1996"}
                                                    </Box>
                                                </Typography>
                                                <Box style={{margin:0, padding:0}}>
                                                    <LocationOn fontSize="small" style={{margin:0,padding:0, borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"4px", marginLeft:"2px"}}
                                                    >
                                                        {"Amsterdam, Netherlands"}
                                                    </Box>
                                                </Typography>
                                            </Box>
                                        </div>
                                    </Box>
                                    <Box ml={1} mr={1} mt={0} pt={0} pl={1} pr={1}>
                                        <div style={{width:"100%",}} >
                                            <Box display="flex" flexDirection="row" style={{margin:"0 !important", padding:"0 !important"}}>
                                                <Box style={{margin:0, padding:0}}>
                                                    <Wc fontSize="small" style={{margin:0,padding:0, borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"4px", marginLeft:"2px", marginRight:"42px"}}
                                                    >
                                                        {"Female"}
                                                    </Box>
                                                </Typography>
                                                <Box style={{margin:0, padding:0}}>
                                                    <Event fontSize="small" style={{margin:0,padding:0, borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"4px", marginLeft:"2px"}}
                                                    >
                                                        {"Joined March 2020"}
                                                    </Box>
                                                </Typography>
                                            </Box>
                                        </div>
                                    </Box>
                                    <Box ml={1} mr={1} mt={0} pt={1} pl={1} pr={1}>
                                        <div style={{width:"100%", }} >
                                            <Typography>
                                                <Box 
                                                    display="inline"
                                                    fontWeight="fontWeightBold" fontSize="1vw"
                                                    style={{color:"#000000", marginRight:"3px"}}
                                                >
                                                    {"248"}
                                                </Box>
                                                <Box 
                                                    display="inline" 
                                                    fontSize="1vw"
                                                    style={{color:"#696969"}}
                                                >
                                                    {"Friends"}
                                                </Box>
                                            </Typography>
                                        </div>
                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="column" style={{width:"15%", height:"100%",}}>
                                    <Box m={0} p={0}>
                                        <Button
                                            className={classes.editProfile}
                                        >
                                            <Typography>
                                                <Box
                                                    fontSize="0.78vw"
                                                    fontWeight="fontWeightBold"
                                                >
                                                    {"Edit profile"}
                                                </Box>
                                            </Typography>
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div style={{border:"1px solid white",width:"100%", height:"100%", maxHeight:"100%"}}>
                            <AntTabs value={currentTab} onChange={handleCurrentTabChange}>
                                <AntTab label="About" {...a11yProps(0)}/>
                                <AntTab label ="Photos" {...a11yProps(1)}/>
                                <AntTab label="Friends" {...a11yProps(2)}/>
                            </AntTabs>
                            <TabPanel value={currentTab} index={0}>
                                Item One
                            </TabPanel>
                            <TabPanel value={currentTab} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={currentTab} index={2}>
                                Item Three
                            </TabPanel>
                        </div>
                    </Container>
                </Grid>
                
                <Hidden smDown>
                <Grid item xs={false} sm={false} md={3} lg={3} xl={3} className={classes.gridThree}>
                    <Container style={{margin:0,padding:0}}>
                    <div style={{minWidth:'100%', minHeight:'100%', background:"#263031"}}>
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
                    </Container>
                </Grid>
                </Hidden>
            </Grid>
            </div>
        </Container>
    )
}