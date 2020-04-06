import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from "axios"

import { makeStyles } from '@material-ui/core/styles'



const useStyles = makeStyles(theme=>({

}))

export default function Messages(props){
    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        console.log(props.match.params.user)
    })

    return(
        <h3>Message component</h3>
    )
}
