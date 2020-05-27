import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from "axios"
import {FixedSizeList} from 'react-window'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import {List,ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Divider} from '@material-ui/core'

import CreateIcon from '@material-ui/icons/Create'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import SearchIcon from '@material-ui/icons/Search'
import {Info, Videocam, Call, BorderLeft} from '@material-ui/icons'

import profilePic from "../../assets/images/profileImage.jpg"
import profilePic2 from "../../assets/images/profileImageAnime.jpg"


const useStyles = makeStyles(theme=>({

    gridOne:{
        padding: theme.spacing(1),
        background:'#29323c', 
        height:'100vh'
    },
    gridTwo:{
        padding: theme.spacing(1),
        background:'#29323c', 
        height:'100vh',
        borderLeft: "1px solid white"
    },
    userAvatar:{
        float:"left"
    },
    userAvatarSize:{
        width: theme.spacing(6),
        height: theme.spacing(6),
        '&:hover': {
            backgroundColor: "white",
        }
    },
    messageSeen:{
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    headerOthers:{
        float:"right"
    },
    searchComponent:{
        '& .MuiInputLabel-root':{       
            color: '#ffffff',
        },
        '& label.Mui-focused': {
            color: '#ffffff',
          },

        '& .MuiOutlinedInput-root':{
            '& fieldset':{
                borderColor: "#00cdac !important"

            }
        },
        '&:hover fieldset':{
            borderColor:"#00cdac !important"
        },

        width:"100%" ,
        '& fieldset':{
            borderRadius: "45px",
            border:"1px solid  #00cdac",
        },  
    },
    scrollBar:{
        overflowY:"auto",
        margin:0,
        padding:0,

        '&::-webkit-scrollbar':{
            width:"0.5vw",
            backgroundColor:"#00cdac"
        },
        '&::-webkit-scrollbar-track':{
            background:"#29323c",
            boxShadow:'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb':{
            background: "#00cdac"
        }
    },
    messageList:{
        padding:"0px !important"
    },
    secondaryMessageList:{
        padding:"0px !important",
    },
    moreMessageList:{
        cursor:"pointer"
    }
}))

/*function messageList(props){
    const {index, style} = props;

    return(
        <Box mt={1} mb={2}>
        <ListItem key={index} style={style}>
            <ListItemAvatar>
                <Avatar src={profilePic2}/>
            </ListItemAvatar>
            <ListItemText primary={"Name Name"}/>
            <ListItemSecondaryAction>
                <MoreVertIcon style={{fill:"#00cdac"}}/>
            </ListItemSecondaryAction>
        </ListItem>
        </Box>
    )
}*/

export default function Messages(props){
    const classes = useStyles();
    const history = useHistory();

    const [secondaryAction, setSecondaryAction] = useState(        <Avatar className={classes.messageSeen} src={profilePic}/>
        )

    useEffect(()=>{
        console.log(props.match.params.user)
    })

    function messageListHover(){
        setSecondaryAction(
            <MoreHorizIcon className={classes.moreMessageList} style={{fill:"#00cdac"}}/>
        )
    }

    function messageListNonHover(){
        setSecondaryAction(
        <Avatar className={classes.messageSeen} src={profilePic}/>
        )
    }

    return(
        <Grid container component="main">
            <Grid className={classes.gridOne} item xs={2} sm={3} md={3} lg={3} xl={3}>
                <Box className={classes.userAvatar}>
                    <Avatar className={classes.userAvatarSize} src={profilePic}></Avatar>
                </Box>
                <Hidden xsDown>
                    <Box mb={1.5} className={classes.headerOthers}>
                        <Box display="inline">
                            <IconButton className={classes.userAvatarSize}>
                                <CreateIcon style={{fill:"#00cdac"}}/>
                            </IconButton>
                        </Box>
                        <Box display="inline" style={{paddingLeft:"8px"}}>
                            <IconButton className={classes.userAvatarSize}>
                                <MoreVertIcon style={{fill:"#00cdac"}}/>   
                            </IconButton>
                        </Box>
                    </Box>

                    <Box mb={1.5} width="100%">
                        <TextField
                            fullWidth
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            className={classes.searchComponent}
                            InputProps={{
                                        style:{
                                        fontFamily: "Segoe UI Symbol",
                                        fontWeight: "bolder",
                                        color:"#ffffff",
                                        fontSize:"14px"
                                        },
                                        className:classes.inputColor,
                                        endAdornment:(
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
                    <Box width='100%'>
                        <List>
                            <div onMouseEnter={messageListHover} onMouseLeave={messageListNonHover}>
                            <ListItem className={classes.messageList} >
                                <ListItemAvatar>
                                    <Avatar src={profilePic2}/>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Typography component="div">
                                        <Box
                                            fontWeight="fontWeightBold"
                                            fontSize="1vw"
                                            style={{ 
                                            color:"white",
                                            }}
                                                fontFamily='Segoe UI Symbol'
                                        >
                                            {`Name Nameson`}
                                        </Box>
                                        <Box
                                            fontWeight="fontWeightRegular"
                                            fontSize="0.8vw"
                                            style={{ 
                                            color:"#A4A4A4",
                                            }}
                                                fontFamily='Segoe UI Symbol'
                                        >
                                            {`You: ur mum gae`}
                                        </Box>
                                    </Typography>
                                }/>
                                <ListItemSecondaryAction className={classes.secondaryMessageList}>
                                    {secondaryAction}
                                </ListItemSecondaryAction>
                            </ListItem> 
                            </div>                          
                        </List>
                    </Box>
                </Hidden>
            </Grid>
            <Grid className={classes.gridTwo} item xs={10} sm={9} md={9} lg={9} xl={9}>
                <Box display="flex" flexDirection="row" className={classes.userAvatar}>
                    <Box>
                        <Avatar className={classes.userAvatarSize} src={profilePic2}></Avatar>
                    </Box>
                    <Box ml={2}>
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightBold"
                                fontSize="1vw"
                                style={{ 
                                    color:"white",
                                }}
                                    fontFamily='Segoe UI Symbol'
                                >
                                    {`Name Nameson`}
                            </Box>
                            <Box
                                fontWeight="fontWeightRegular"
                                fontSize="0.8vw"
                                style={{ 
                                    color:"#A4A4A4",
                                }}
                                    fontFamily='Segoe UI Symbol'
                                >
                                    {`Active`}
                            </Box>
                        </Typography>
                    </Box>
                </Box>

                <Box className={classes.headerOthers}>
                    <Box display="inline">
                        <IconButton className={classes.userAvatarSize}>
                            <Call style={{fill:"#00cdac"}}/>
                        </IconButton>
                    </Box>
                    <Box display="inline" style={{paddingLeft:"8px"}}>
                        <IconButton className={classes.userAvatarSize}>
                            <Videocam style={{fill:"#00cdac"}}/>   
                        </IconButton>
                    </Box>
                    <Box display="inline" style={{paddingLeft:"8px"}}>
                        <IconButton className={classes.userAvatarSize}>
                            <Info style={{fill:"#00cdac"}}/>   
                        </IconButton>
                    </Box>
                </Box>

            </Grid>
        </Grid>
    )
}
