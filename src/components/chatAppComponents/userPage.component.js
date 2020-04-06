import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { makeStyles, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { TextField, Typography, List, ListItem,ListItemSecondaryAction,
         ListItemIcon, ListItemText, InputLabel, ListItemAvatar, 
         Collapse, ListSubheader, CircularProgress, GridList, GridListTile, GridListTileBar,
         ListSubhea} from '@material-ui/core';
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
        FiberManualRecord, Cake, LocationOn, Wc, Event,
        Close, Link, AddAPhoto, Favorite} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import {Tab, Tabs, Snackbar} from '@material-ui/core'
import {Fade, Modal, Divider, Tooltip} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import profilePic from "../../assets/images/profileImage.jpg"
import profilePicMale from "../../assets/images/profileImageMale.jpg"
import uploadImage from '../../assets/icons/uploadImage.png'
import letMeIn from '../../assets/gifs/letMeInGif.gif'
import {Link as RouterLink} from 'react-router-dom'




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

function LikedImage(){
    return(
        <Favorite 
            style={{
                fill: "#00cdac"
            }}
        />
    )
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function Alert(props){
    return <MuiAlert elevation={6} variany="filled" {...props}/>
}

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
        minWidth:"98vw",
        boxSizing:"border-box",
    },
    root: {
        width: '85vw',
        //maxWidth:'85vw',
        margin: 'auto',
        background: theme.palette.common.black
    },
    gridOne:{
        //background: '#ff1100',
        background:'linear-gradient(45deg, #29323c 30%, #485563 90%)', 

        //border: "1px solid black",
    },
    gridTwo:{
        //border: '1px solid yellow',
        background:"white"
    },
    gridThree:{
        //border: '1px solid red',
        background:"#263031"
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
        fontSize: '2.4vw',
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

        '& .MuiOutlinedInput-root':{
            ['& fieldset']:{
                borderColor: "#00cdac !important"

            }
        },
        '&:hover fieldset':{
            borderColor:"#00cdac !important"
        },

        width:"100%" ,
        ['& fieldset']:{
            borderRadius: "45px",
            border:"2px solid  #00cdac",
        }

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
        '&.Mui-selected':{
            outline: 'none'
        }
    },

    inputColor:{
        color:"white",
        //borderBottom:"2px solid white"
    },
    activeFriends:{
        color: "white",
        fontWeight: "bold",
        fontSize:"15px"
    },
    secondaryAction:{
        width: theme.spacing(3),
        height: theme.spacing(2),
        backgroundColor: theme.palette.divider,
    },
    secondaryActionNumber:{
        color: "white",
        fontWeight:"bold",
        fontSize:"8px"
    },
    handle:{
        margin:0,
        padding:0,
        fontWeight:"bold", 
        fontSize:"10px", 
        color:"white"
    },
    fullname:{
        margin:'0 !important',
        padding:'0 !important',
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
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'transparent'
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        //border:"3px solid white",
        width:"35vw",
        height:"80vh",
        maxHeight:"80vh",
        maxWidth:"35vw",
        padding: theme.spacing(2,2,2,2)
    },

    textFieldColors:{
        '& label.Mui-focused': {//changes the color of the label on the text field when its focused
            color: '#02aab0',
          },
        '& .MuiInput-underline:after': {//changes the border color when focused
            borderBottomColor: "#02aab0",
          },
    },  

    calendarColors:{
        '& .MuiPickersToolbar-toolbar':{
            backgroundColor:"#02aab0",
        },
        '& .MuiPickersDay-daySelected':{
            backgroundColor: "#02aab0"
        },
        '& .MuiButton-textPrimary':{
            color: "#02aab0"
        },
        '& .MuiPickersToolbarButton-toolbarBtn':{
            '& .MuiPickersToolbarText-toolbarTxt':{
                color: "#ffffff"
            }
        }
    },

    linkEdit: {
        color:"#696969",
        "&:hover":{
            color:"#02aab0",
            textDecoration: "underline"
        }
    },

    gridTileRoot:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    
    },

    gridList: {
        width: "300px",
        height: "250px"
    },

    favIcon: {
        color: 'rgba(255,255,255,0.54)'
    }

}))



export default function UserPage(props){
    const classes = useStyles();
    const history = useHistory();
    const uploadRef = useRef(null);

    const [userData, setUserData] = useState([])
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [backdropStatus, setBackdropStatus] = useState(true);
    const [forbiddenError, setForbiddenError] = useState(false);

    
    const [currentStatus, setCurrentStatus] = useState(1);
    const [currentTab, setCurrentTab] = useState(0);

    const [modalStatus, setModalStatus] = useState(false);

    const [name, setName] = useState("");
    const [nameEdit, setNameEdit] = useState(name);

    const [firstName, setFirstName] = useState("")
    const [username, setUsername] = useState("")

    const [bio, setBio] = useState("")
    const [bioEdit, setBioEdit] = useState(bio)
    const [bioStyle, setBioStyle] = useState("")

    const [sex, setSex] = useState("")
    const [sexEdit, setSexEdit] = useState("")
    const [sexStyle, setSexStyle] = useState("")

    const [joined, setJoined] = useState("")

    const [location, setLocation] = useState("")
    const [locationEdit, setLocationEdit] = useState(location)
    const [locationStyle, setLocationStyle] = useState("")

    const [website, setWebsite] = useState("")
    const [websiteEdit, setWebsiteEdit] = useState(website);
    const [websiteStyle, setWebsiteStyle] = useState("")


    const [DOB, setDOB] = useState("")
    const [dobEdit, setDobEdit] = useState("");
    const [dobStyle, setDobStyle] = useState("")
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    const [profilePicture, setProfilePicture] = useState(profilePic);
    const [profilePictureEdit, setProfilePictureEdit] = useState(profilePicture);

    const [editProfileSnackbar, setEditProfileSnackbar] = useState(false);
    const [errorEditProfileSnackBar, setErrorEditProfileSnackbar] = useState(false);


    const [likeIcon, setLikeIcon] = useState(<Favorite/>);
    const [mockLike, setMockLike] = useState(<Favorite/>)
    const [status, setStatus] = useState(false)

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
                    setUserData(userData.push(res.data))//NEEDS WORK!!!
                    setFirstName(userData[0].firstName);

                    setName(`${userData[0].firstName} ${userData[0].lastName}`)
                    setNameEdit(`${userData[0].firstName} ${userData[0].lastName}`)
                    
                    setUsername(`@${userData[0].username}`)

                    setJoined(userData[0].joined)

                    if(userData[0].dateOfBirth==="" || userData[0].dateOfBirth === null || userData[0].dateOfBirth === undefined){
                        setDobStyle('oblique')
                        setDOB("not set")
                    }else{
                        setDobStyle('normal')
                        setDOB(userData[0].dateOfBirth)
                        setDobEdit(new Date(userData[0].dateOfBirth));
                    }

                    if(userData[0].bio === "" || userData[0].bio === undefined || userData[0].bio===null){
                        setBioStyle('oblique')
                        setBio("not set")
                    }else{
                        setBioStyle('normal')
                        setBio(userData[0].bio)
                        setBioEdit(userData[0].bio)
                    }
                    if(userData[0].sex === "" || userData[0].sex === undefined || userData[0].sex===null){
                        setSexStyle('oblique')
                        setSex("not set")
                    }else{
                        setSexStyle('normal')
                        setSex(userData[0].sex)
                        setSexEdit(userData[0].sex)
                    }
                    if(userData[0].location === "" || userData[0].location === undefined || userData[0].location===null){
                        setLocationStyle('oblique')
                        setLocation("not set")
                    }else{
                        setLocationStyle('normal')
                        setLocation(userData[0].location)
                        setLocationEdit(userData[0].location)
                    }
                    if(userData[0].website === "" || userData[0].website === undefined || userData[0].website===null){
                        setWebsiteStyle('oblique')
                        setWebsite("not set")
                    }else{
                        setWebsiteStyle('normal')
                        setWebsite(userData[0].website)
                        setWebsiteEdit(userData[0].website)
                    }

                    //temporary
                    if(userData[0].firstName==="Dan"){
                        setProfilePicture(profilePicMale)
                    }else{
                        setProfilePicture(profilePic)
                    }

                    setIsLoading(false)
                    setBackdropStatus(false)
                    console.log(userData)
                }
             })
             .catch(err=>{
                 if(err.response.status===403 || err.response.data==="Forbidden"){//NEEDS WORK, error if no token
                    setForbiddenError(true)
                 }
             })

        return ()=>{
            unMounted = true;
        }

    },[])//useeffect will only be called when userdata changes

    const tileData = [
        {
            img: "https://source.unsplash.com/user/erondu/1600x900",
            title: "Title",
            by: username,
            imageLiked: false,
            likeIcon: <LikedImage/>,
            notLikedIcon: <Favorite/>,
            mockLike: mockLike
        },
        {
            img: "https://source.unsplash.com/weekly?water",
            title: "Title",
            by: username,
            imageLiked: false,
            likeIcon: <LikedImage/>,
            notLikedIcon: <Favorite/>,
            mockLike: mockLike
        },
        {
            img: "https://source.unsplash.com/weekly?road",
            title: "Title",
            by: username,
            imageLiked: false,
            likeIcon: <LikedImage/>,
            notLikedIcon: <Favorite/>,
            mockLike: mockLike
        },
        {
            img: "https://source.unsplash.com/weekly?city",
            title: "Title",
            by: username,
            imageLiked: false,
            likeIcon: <LikedImage/>,
            notLikedIcon: <Favorite/>,
            mockLike: mockLike
        },
        {
            img: "https://source.unsplash.com/weekly?sky",
            title: "Title",
            by: username,
            imageLiked: false,
            likeIcon: <LikedImage/>,
            notLikedIcon: <Favorite/>,
            mockLike: mockLike
        },
        {
            img: "https://source.unsplash.com/weekly?game",
            title: "Title",
            by: username,
            imageLiked: false,
            likeIcon: <LikedImage/>,
            notLikedIcon: <Favorite/>,
            mockLike: mockLike
        }
    ]

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

    const handleModalOpen = () => {
        setModalStatus(true);
    }

    const handleModalClose = () => {
        setModalStatus(false);
    }



    const handleModalSave = () => {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('usertoken')}`
            }
        }
        const Dateformated = months[dobEdit.getMonth()] +" "+dobEdit.getDate()+", "+dobEdit.getFullYear()


        const data = {
            "dateOfBirth": Dateformated,
            "sex": sexEdit,
            "location": locationEdit,
            "website": websiteEdit,
            "bio": bioEdit
        }

        axios.patch(`http://localhost:5000/user/user_info/${props.match.params.user}/editProfile`, data, config)
            .then(res=>{
                setEditProfileSnackbar(true)

                setModalStatus(false)
                setName(nameEdit)
        
                if(bioEdit === "" || bioEdit===undefined || bioEdit===null){
                    setBioStyle('oblique')
                    setBio("not set")
                }else{
                    setBioStyle('normal')
                    setBio(bioEdit)
                }
                if(sexEdit === "" || sexEdit===undefined || sexEdit===null){
                    setSexStyle('obllique')
                    setSex('not set')
                }else{
                    setSexStyle('normal')
                    setSex(sexEdit)
                }
                if(locationEdit === "" || locationEdit===undefined || locationEdit===null){
                    setLocationStyle('oblique')
                    setLocation('not set')
                }else{
                    setLocationStyle('normal')
                    setLocation(locationEdit)
                }
                if(websiteEdit==="" || websiteEdit===undefined || websiteEdit===null){
                    setWebsiteStyle('oblique')
                    setWebsite('not set')
                }else{
                    setWebsiteStyle('normal')
                    setWebsite(websiteEdit)
                }
                if(dobEdit==="" || dobEdit===null || dobEdit===undefined){
                    setDobStyle('oblique')
                    setDOB('not set')
                }else{
                    setDobStyle('normal')
                    setDOB(months[dobEdit.getMonth()] +" "+dobEdit.getDate()+", "+dobEdit.getFullYear())
                }
                
                //console.log(dobEdit)


                    setProfilePicture(profilePictureEdit);                
                
            })
            .catch(err=>{
                setErrorEditProfileSnackbar(true)
            })
    }

    const handleNameChange = (e) => {
        setNameEdit(e.target.value)
    }

    const handleBioChange = (e) => {
        setBioEdit(e.target.value)
    }

    const handleLocationChange = (e) => {
        setLocationEdit(e.target.value)
    }

    const handleWebsiteChange = (e) => {
        setWebsiteEdit(e.target.value)
    }

    const handleSexChange =(e) => {
        setSexEdit(e.target.value)
    }

    const handleDobChange = date => {
        setDobEdit(date);
    }

    const handleFiles = (event) => {
        console.log(event.target.files[0])
        setProfilePictureEdit(event.target.files[0])
    }

    const handleUploadImage = () => {
        uploadRef.current.click();
    }

    const userPhotos = () =>{
        let photos = []

        
      
        for(let i=0;i<tileData.length;i++){

         photos.push(
            <GridListTile key={i} 
            style={{
                cursor:"pointer",
            }}
            >
                <div style={{WebkitBoxSizing: "border-box", MozBoxSizing:"border-box", boxSizing:"border-box"}}>
                <img src={tileData[i].img} alt={tileData[i].title} style={{padding:0}}/>
                <GridListTileBar
                    title={
                        <Box>
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightBold"
                                fontSize="1vw"
                                fontStyle={bioStyle}
                                style={{color:"#ffffff", wordWrap:"break-word",}}
                                p={0} m={0}
                                fontFamily='Segoe UI Symbol'
                            >
                                {tileData[i].title}
                            </Box>
                        </Typography>
                        </Box>                                                            
                    }
                    subtitle={
                        <Box>
                            <Typography component="div">
                            <Box
                                fontWeight="fontWeightLight"
                                fontSize="0.7vw"
                                fontStyle={bioStyle}
                                style={{color:"#ffffff", wordWrap:"break-word",}}
                                p={0} m={0}
                                fontFamily='Segoe UI Symbol'
                            >
                                {tileData[i].by}
                            </Box>
                            </Typography>
                        </Box>                
                        }
                        actionIcon={
                            
                            <IconButton aria-label={`like`} className={classes.favIcon} 
                                onClick={()=>{
                                setStatus(!status)
                                tileData[i]["smn"] = status

                                if(tileData[i].smn){
                                    
                                }

                                /*tileData[i].imageLiked = !tileData[i].imageLiked
                                
                                if(tileData[i].imageLiked){
                                    console.log(tileData[i].imageLiked)
                                    tileData[i]["smn"] = likeIcon
                                    setLikeIcon(<LikedImage/>)
                                    console.log(tileData[i]["smn"])
                                    console.log(tileData[i+1]["smn"])
                                }else{
                                    //console.log(tileData[i].imageLiked)
                                }*/
                            }}>
                                {tileData[i].mockLike}
                            </IconButton>
                        }
                />
                </div>   
            </GridListTile>
         )
        }
        return photos
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

        if(forbiddenError){
            return(
                <div style={{width:"100vw", height:"100vh",background: 'linear-gradient(45deg, #02aab0 30%, #00cdac 90%)'}}>
                
                <div style={{margin:"0 auto", width:"700px", height:"350px", background:"white"}}>
                    <Box display="flex" justifyContent="center" style={{}}>
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightBold"
                                fontSize="2vw"
                                style={{color:"#696969", wordWrap:"break-word"}}
                                fontFamily='Segoe UI Symbol'>

                                   Error 403 - Forbidden: Acces is Denied
                            </Box>
                        </Typography>
                    </Box>
                    <Divider variant="fullWidth"/>
                    <Box  display="flex" justifyContent="center" p={1} mt={1} style={{}}>
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightBold"
                                fontSize="1vw"
                                style={{color:"#696969", wordWrap:"break-word"}}
                                fontFamily='Segoe UI Symbol'>

                                   You dont have permission to view this page. You either have to be logged in or a registered user to acces this page
                            </Box>
                        </Typography>
                    </Box>
                    <Box  display="flex" justifyContent="center" p={1} mt={1} style={{}}>
                        <img src={letMeIn} alt="let me in" style={{width:"300px", height:"169px"}}/>
                    </Box>
                </div>
                </div>
            )
        }

        return(
            <Backdrop className={classes.backdrop} open={backdropStatus}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }


    return(
        <div style={{
            height:"100%",
            width:"100%",
            overFlowY:"auto",
            overFlowX: "none",
            WebkitBoxSizing:"border-box",
            MozBoxSizing:"border-box",
            background: "linear-gradient(45deg, #29323c 30%, #485563 90%)"
        }}>
        <Container fixed  className={classes.backgroundContainer} >
            <div className={classes.rootDiv}>
            <Grid container spacing={0} component="main" className={classes.root}>
                <CssBaseline/>
                <Hidden xsDown>
                <Grid item xs={false} sm={3} md={3} lg={2} xl={2} className={classes.gridOne}>
                    <Container style={{margin:0,padding:0}}>
                        <div className={classes.paper}>
                            <div style={{minWidth:'100%', minHeight:'100%',background:'linear-gradient(45deg, #02aab0 30%, #00cdac 90%)'}}>
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
                                                <Avatar src={profilePicture}></Avatar>
                                            </StyledBadge>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography variant='h5' className={classes.userName}>
                                                {firstName}
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
                                        <ListItemText onClick={()=>{
                                               history.push(`/messages/${props.match.params.user}`)
                                            }} 
                                            primary={
                                            <Typography variant='h5' className={classes.contentText}>
                                                {"Messages"}
                                            </Typography>
                                        } />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end">
                                                <Avatar variant="square" className={classes.secondaryAction} style={{backgroundColor:"#00cdac"}}>
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
                            <div style={{minWidth:'100%', minHeight:'20%',background:'linear-gradient(45deg, #02aab0 30%, #00cdac 90%)'}}>
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
                                    <Box display="flex" alignItems="center"  style={{ width:"100%", height:"100%"}}>
                                        <div style={{width:"85%", height:"85%", margin:"0 auto"}}>
                                            <Avatar alt="profile Image" src={profilePicture} style={{width:"12.5vw", height:"12.5vw", maxWidth:"200px", maxHeight:"200px"}}/>
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
                                                                <Box pr={1} style={{ paddingTop:"1px"}}>
                                                                    <FiberManualRecord style={{fill:"#00cc00", width:"11px",height:"11px"}}/>
                                                                </Box>
                                                                <Box style={{paddingBottom:"2px"}}>
                                                                    <Typography 
                                                                        variant="h5" 
                                                                        style={{fontSize:"13px",
                                                                                fontFamily:'Segoe UI Symbol',
                                                                                
                                                                        }}
                                                                    >
                                                                        {"Online"}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </div>
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                    <div style={{width:"100%"}}>
                                                            <Box display="flex" flexDirection="row" alignItems="center">
                                                                <Box pr={1}  style={{ paddingTop:"1px"}}>
                                                                    <FiberManualRecord style={{fill:"#ff0000", width:"11px",height:"11px"}}/>
                                                                </Box>
                                                                <Box style={{paddingBottom:"2px"}}>
                                                                    <Typography variant="h5" style={{fontSize:"13px",fontFamily:'Segoe UI Symbol'}}>
                                                                        {"Away"}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </div>
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                    <div style={{width:"100%"}}>
                                                            <Box display="flex" flexDirection="row" alignItems="center">
                                                                <Box pr={1}  style={{ paddingTop:"1px"}}>
                                                                    <FiberManualRecord style={{fill:"#ffcc00", width:"11px",height:"11px"}}/>
                                                                </Box>
                                                                <Box style={{paddingBottom:"2px"}}>
                                                                    <Typography variant="h5" style={{fontSize:"13px",fontFamily:'Segoe UI Symbol'}}>
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
                                                fontFamily='Segoe UI Symbol'
                                            >
                                                {name}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box ml={1} mr={1} mt={0} pt={0} pl={1} pr={1}>
                                        <Typography component="div">
                                            <Box
                                                fontWeight="fontWeightLight"
                                                fontSize="1vw"
                                                style={{color:"#696969", wordWrap:"break-word"}}
                                                fontFamily='Segoe UI Symbol'
                                            >
                                                {username}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box ml={1} mr={1} mt={1} pt={1} pl={1} pr={1}>
                                        <Typography component="div">
                                            <Box
                                                fontWeight="fontWeightLight"
                                                fontSize="1vw"
                                                fontStyle={bioStyle}
                                                style={{color:"#000000", wordWrap:"break-word",}}
                                                p={0} m={0}
                                                fontFamily='Segoe UI Symbol'
                                            >
                                                {bio}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box ml={1} mr={1} mt={1} pt={0} pl={1} pr={1}>
                                        <div style={{width:"100%", }} >
                                            <Box display="flex" flexDirection="row" style={{margin:"0 !important", padding:"0 !important"}}>
                                                <Tooltip title="birthday">
                                                <Box style={{margin:0, padding:0}}>
                                                    <Cake fontSize="small" style={{margin:0,padding:0, borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                </Tooltip>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"3px", marginLeft:"2px", marginRight:"8px"}}
                                                        fontFamily='Segoe UI Symbol'
                                                        fontStyle={dobStyle}
                                                    >
                                                        {DOB}
                                                    </Box>
                                                </Typography>

                                                <Tooltip title="gender">
                                                <Box style={{margin:0, padding:0}}>
                                                <Wc fontSize="small" style={{margin:0,padding:0, borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                </Tooltip>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"3px", marginLeft:"2px", marginRight:"2px"}}
                                                        fontFamily='Segoe UI Symbol'
                                                        fontStyle={sexStyle}
                                                    >
                                                    {sex}
                                                </Box>
                                                </Typography>

                                                <Tooltip title="location">
                                                <Box style={{margin:0, padding:0}}>
                                                    <LocationOn fontSize="small" style={{margin:0,padding:0, borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                </Tooltip>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"3px",}}
                                                        fontFamily='Segoe UI Symbol'
                                                        fontStyle={locationStyle}
                                                    >
                                                        {location}
                                                    </Box>
                                                </Typography>
                                                
                                            </Box>
                                        </div>
                                    </Box>
                                    <Box ml={1} mr={1} mt={0} pt={0} pl={1} pr={1}>
                                        <div style={{width:"100%",}} >
                                            <Box display="flex" flexDirection="row" style={{margin:"0 !important", padding:"0 !important"}}>

                                                <Tooltip title="joined">
                                                <Box style={{margin:0, padding:0}}>
                                                    <Event fontSize="small" style={{margin:0,padding:0, borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                </Tooltip>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"3px", marginLeft:"2px", marginRight:"8px"}}
                                                        fontFamily='Segoe UI Symbol'
                                                    >
                                                        {joined}
                                                    </Box>
                                                </Typography>
                                                
                                                <Tooltip title="website">
                                                <Box style={{marginTop:"2px"}}>
                                                    <Link fontSize="small" style={{ borderCollapse:"collapse", fill:"#696969"}}/>
                                                </Box>
                                                </Tooltip>
                                                <Typography>
                                                    <Box
                                                        fontWeight="fontWeightLight"
                                                        fontSize="0.8vw"
                                                        style={{color:"#696969", marginTop:"3px", marginLeft:"2px"}}
                                                        fontFamily='Segoe UI Symbol'
                                                        fontStyle={websiteStyle}
                                                        className={classes.linkEdit}
                                                        style={{cursor:"pointer"}}

                                                    >
                                                        <a href={`${website}`} target="_blank" style={{textDecoration:"none", color:"inherit", outline:"none"}}>{website}</a>
                                                    </Box>
                                                </Typography>
                                            </Box>
                                        </div>
                                    </Box>
                                    <Box ml={1} mr={1} mt={0} pt={1} pl={1} pr={1}>
                                        <div style={{width:"100%", marginTop:"2px"}} >
                                            <Typography>
                                                <Box 
                                                    display="inline"
                                                    fontWeight="fontWeightBold" fontSize="1vw"
                                                    style={{color:"#000000", marginRight:"3px"}}
                                                    fontFamily='Segoe UI Symbol'
                                                >
                                                    {"248"}
                                                </Box>
                                                <Box 
                                                    display="inline" 
                                                    fontSize="1vw"
                                                    style={{color:"#696969"}}
                                                    fontFamily='Segoe UI Symbol'
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
                                            onClick={handleModalOpen}
                                        >
                                            <Typography>
                                                <Box
                                                    fontSize="0.78vw"
                                                    fontWeight="fontWeightBold"
                                                    fontFamily='Segoe UI Symbol'
                                                >
                                                    {"Edit profile"}
                                                </Box>
                                            </Typography>
                                        </Button>

                                        <Modal
                                            className={classes.modal}
                                            open={modalStatus}
                                            onClose={handleModalClose}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500
                                            }}
                                            
                                        >
                                            <Fade in={modalStatus}>
                                                <div className={classes.modalPaper} style={{outline:"none"}}>
                                                    <div style={{width:"100%"}}>
                                                        <Box display="flex" flexDirection="row">
                                                            <Box display="flex" justifyContent="flex-start" alignSelf="flex-end" style={{width:"100%"}}>
                                                                <Typography>
                                                                    <Box
                                                                    fontWeight="fontWeightBold"
                                                                    fontSize="1.5vw"
                                                                    fontFamily='Segoe UI Symbol'                                                            
                                                                    >
                                                                    {"Edit Profile"}
                                                                    </Box>
                                                                </Typography>
                                                            </Box>
                                                            <Box display="flex" alignSelf="flex-end"
                                                                style={{paddingBottom:"5px",}}
                                                            >
                                                                <Close fontSize="default" 
                                                                    style={{fill:"#02aab0", 
                                                                            cursor:"pointer",
                                                                            }}
                                                                            
                                                                    onClick={handleModalClose}
                                                                />
                                                            </Box>
                                                        </Box>                                                       
                                                    </div>

                                                    <Divider/>
                                                    <Box style={{paddingTop:"2px", paddingBottom:"2px"}}>
                                                        <div style={{width:"100%", overflowY:"auto", 
                                                             maxHeight:"60vh", padding:"8px",
                                                             scrollbarColor:"#00cdac #ffffff",
                                                             scrollbarWidth:"thin"
                                                             }}
                                                        >
                                                            <Box mt={1} pt={1} mb={1} pb={1} display="flex" alignContent="center"  style={{ width:"100%", height:"100%"}}>
                                                                    <div style={{margin:"0 auto"}}>
                                                                    <Badge
                                                                        overlap="circle"
                                                                        anchorOrigin={{
                                                                            vertical:"bottom",
                                                                            horizontal:"right"
                                                                        }}
                                                                        badgeContent={
                                                                            <div>
                                                                                <input
                                                                                type="file"
                                                                                id="fileLoadaer"
                                                                                ref = {uploadRef}                                                                                
                                                                                style={{display:"none"}}
                                                                                onChange={handleFiles}
                                                                                />
                                                                                <IconButton onClick={handleUploadImage}>
                                                                                    <Avatar alt="upload image" src={uploadImage} 
                                                                                    className={classes.uploadIcon}
                                                                                    style={{
                                                                                    width:"50px", height:"50px",background:"#00cdac",
                                                                                    border:"2px solid white",
                                                                                    cursor:"pointer"
                                                                                    }}
                                                                                    />
                                                                                </IconButton>
                                                                            </div>
                                                                        }
                                                                    >
                                                                        <Avatar alt="profile Image" src={profilePicture}
                                                                            style={{width:"200px", 
                                                                                height:"200px", 
                                                                                maxWidth:"200px",
                                                                                maxHeight:"200px"}}
                                                                        />                                                                       
                                                                    </Badge>
                                                                    </div>
                                                            </Box>
                                                            <Box mb={1} pb={1}>
                                                                <TextField
                                                                    multiline
                                                                    fullWidth
                                                                    label="Name"
                                                                    helperText={`${nameEdit.length}/20`}
                                                                    className={classes.textFieldColors}
                                                                    inputProps={{
                                                                        maxlength: "20",
                                                                    }}
                                                                    value={nameEdit}
                                                                    onChange={handleNameChange}
                                                                />
                                                            </Box>
                                                            <Box mb={1} pb={1}>
                                                                <TextField
                                                                    multiline
                                                                    fullWidth
                                                                    label="Bio"
                                                                    helperText={`${bioEdit.length}/110`}
                                                                    className={classes.textFieldColors}
                                                                    inputProps={{
                                                                        maxlength: "110",
                                                                    }}
                                                                    value={bioEdit}
                                                                    onChange={handleBioChange}
                                                                />
                                                            </Box>
                                                            <Box mb={1} pb={1}>
                                                                <TextField
                                                                    multiline
                                                                    fullWidth
                                                                    label="Sex"
                                                                    helperText={`${sexEdit.length}/6`}
                                                                    className={classes.textFieldColors}
                                                                    inputProps={{
                                                                        maxlength: "6",
                                                                    }}
                                                                    value={sexEdit}
                                                                    onChange={handleSexChange}
                                                                />
                                                            </Box>
                                                            <Box mb={1} pb={1}>
                                                                <TextField
                                                                    multiline
                                                                    fullWidth
                                                                    label="Location"
                                                                    helperText={`${locationEdit.length}/25`}
                                                                    className={classes.textFieldColors}
                                                                    inputProps={{
                                                                        maxlength: "25",
                                                                    }}
                                                                    value={locationEdit}
                                                                    onChange={handleLocationChange}
                                                                />
                                                            </Box>
                                                            <Box mb={1} pb={1}>
                                                                <TextField
                                                                    multiline
                                                                    fullWidth
                                                                    label="Website"
                                                                    helperText={`${websiteEdit.length}/35`}
                                                                    className={classes.textFieldColors}
                                                                    inputProps={{
                                                                        maxlength: "35",
                                                                    }}
                                                                    value={websiteEdit}
                                                                    onChange={handleWebsiteChange}
                                                                />
                                                            </Box>
                                                            <Box mb={1} pb={1}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    
                                                                <KeyboardDatePicker
                                                                    fullWidth 
                                                                    clearable
                                                                    margin="normal"
                                                                    variant="dialog"
                                                                    format="MM/dd/yyyy"
                                                                    placeHolder="01/01/1990"
                                                                    label="Date of Birth"
                                                                    orientation="portrait"
                                                                    value={dobEdit}
                                                                    className={classes.textFieldColors}
                                                                    onChange={handleDobChange}
                                                                    DialogProps={{
                                                                        className: classes.calendarColors
                                                                    }}

                                                                />
                                                                
                                                                </MuiPickersUtilsProvider>
                                                            </Box>
                                                        </div>
                                                    </Box>
                                                    <Divider/>
                                                    <Box
                                                        display="flex"
                                                        alignContent="flex-end"
                                                        alignSelf="flex-end"
                                                        justifyContent="flex-end"
                                                        pb={1} mb={1}
                                                    >
                                                        
                                                        <Button
                                                            className={classes.editProfile}
                                                            onClick={handleModalSave}
                                                        >
                                                            <Typography>
                                                                <Box
                                                                fontSize="0.78vw"
                                                                fontWeight="fontWeightBold"
                                                                fontFamily='Segoe UI Symbol'
                                                                >
                                                                {"Save"}
                                                                </Box>
                                                            </Typography>
                                                        </Button>

                                                    </Box>
                                                </div>
                                            </Fade>

                                        </Modal>
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div style={{border:"1px solid white",width:"100%", height:"100%", maxHeight:"100%"}} >
                            <AntTabs value={currentTab} onChange={handleCurrentTabChange}>
                                <AntTab label="About" {...a11yProps(0)}/>
                                <AntTab label ="Photos" {...a11yProps(1)}/>
                                <AntTab label="Friends" {...a11yProps(2)}/>
                            </AntTabs>
                            <TabPanel value={currentTab} index={0}>
                                <Typography>
                                    <Box fontFamily='Segoe UI Symbol'>
                                        About
                                    </Box>
                                </Typography>
                            </TabPanel>
                            <TabPanel value={currentTab} index={1}>
                                <Box style={{ padding:"0", margin:"0"}} p={0} m={0}>
                                    <div className={classes.gridTileRoot} style={{ padding:"0", margin:"0"}}>
                                        <GridList cellHeight={180} className={classes.gridList} style={{width:'100%', height:"100%"}}>
                                            <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                                                <ListSubheader component="div" style={{paddingLeft:"0", marginLeft:"0"}}>
                                                    <Box>
                                                        <Typography component="div">
                                                            <Box
                                                                fontWeight="fontWeightRegular"
                                                                fontSize="1.5vw"
                                                                fontStyle={bioStyle}
                                                                style={{color:"#000000", wordWrap:"break-word",}}
                                                                p={0} m={0}
                                                                fontFamily='Segoe UI Symbol'
                                                                
                                                            >
                                                                {`March`}
                                                            </Box>
                                                        </Typography>
                                                    </Box> 
                                                </ListSubheader>
                                            </GridListTile>
                                            {userPhotos()}
                                        </GridList>
                                    </div>
                                </Box>
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
                    <div style={{minWidth:'100%', minHeight:'100%'}}>
                                <List>
                                    <ListItem>
                                    <Box>
                                    <TextField
                                        placeholder="Search"
                                        variant="outlined"
                                        size="small"
                                        className={classes.labelWhite}
                                        InputProps={{
                                            style:{
                                                fontFamily: "Segoe UI Symbol",
                                                fontWeight: "bolder",
                                                color:"#ffffff"
                                            },
                                            className:classes.inputColor,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                    >
                                                        <SearchIcon style={{fill:"#00cdac"}}/>
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    </Box>
                                    </ListItem>
                                </List>
                            </div>
                    </Container>
                </Grid>
                </Hidden>
            </Grid>
            </div>
            <Snackbar
                anchorOrigin={{vertical:"bottom", horizontal:"center"}}
                open={editProfileSnackbar}
                autoHideDuration={2000}
                onClose={(event,reason)=>{
                    if(reason === 'clickaway'){
                        return
                    }
                    setEditProfileSnackbar(false)
                }}
            >
                <Alert severity="success">
                    Profile Updated!!
                </Alert>
            </Snackbar>
            <Snackbar 
                anchorOrigin={{vertical: "bottom", horizontal:"center"}}
                open={errorEditProfileSnackBar}
                        onClose={(event, reason)=>{
                        if(reason==='clickaway'){
                            return;
                        }
                        setErrorEditProfileSnackbar(false)
                    }}
                    autoHideDuration={5000}>
                
                <Alert severity="error" onClose={(event, reason)=>{
                    if(reason==='clickaway'){
                        return;
                    }
                    setErrorEditProfileSnackbar(false)
                }}>
                    Something went wrong
                </Alert>
            </Snackbar>
        </Container>
        </div>
    )
}