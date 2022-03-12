import {
    Grid,
    Typography,
    Paper
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import React from "react";

const style = theme => ({
    paper: {
        margin: '10px 5px',
        backgroundColor: '#189B0FFF',
        color: 'white',
        overflow: 'hidden',
    },
    photo: {
        maxWidth: '100%',
        cursor: 'pointer'
    }
})

const Lot = props => {
    let data = Date.parse(props.date)+604800000;
    const month = new Date(data).getMonth();
    let days = new Date(data).getDate();
    const hours = new Date(data).getHours();
    const minutes = new Date(data).getMinutes();
    const seconds = new Date(data).getSeconds();
    const now = Date.now();


    if(month > new Date(now).getMonth()){
        const daysInMonth = 33 - new Date(new Date(now).getFullYear(), new Date(now).getMonth(), 33).getDate();
        days += daysInMonth;
    }

    let daysLeft = days - new Date(now).getDate();
    let hoursLeft = hours - new Date(now).getHours();
    let minutesLeft = minutes - new Date(now).getMinutes();
    let secondsLeft = seconds - new Date(now).getSeconds();

    if(secondsLeft < 0){
        secondsLeft = 60 - secondsLeft*(-1);
        minutesLeft -= 1;
    }
    if(minutesLeft < 0){
        minutesLeft = 60 - minutesLeft*(-1);
        hoursLeft -= 1
    }
    if(hoursLeft<0){
        hoursLeft = 24 - hoursLeft*(-1);
        daysLeft -= 1;
    }

    const fr = new FileReader();

    fr.onload = function() {
        debugger;
        return fr.result
    };

    fr.onerror = function() {
        console.log("error: " + fr.error);
    };

    const timeLeft = `${daysLeft*24+hoursLeft}:${minutesLeft}:${secondsLeft}`;

    const src = 'https://drscdn.500px.org/photo/159533631/m%3D900/v2?sig=7cf1ba4b1c724c55a76368f89392390956904df02907170602d704c8a38403a8'
    const {classes} = props;
    return (
            <Grid item xs={6} sm={4} lg={3} xl={2}>
                <Paper className={classes.paper}>
                    <Grid container justify={"center"} direction={"column"}>
                        <NavLink align={'center'} to={`/lot/${props.id}`}>
                            <img src={src} alt="Photo" className={classes.photo}/>
                        </NavLink>
                        <Typography align={"center"}>{props.name}</Typography>
                        <Typography align={"center"}>{props.lastBet}</Typography>
                        <Typography align={"center"}>{timeLeft}</Typography>
                    </Grid>
                </Paper>
            </Grid>
    )
}

export default withStyles(style)(Lot);