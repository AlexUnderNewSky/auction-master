import {
    Paper,
    Grid, Typography,
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import React from "react";
import MyBetsBet from "../MyBets/MyBetsBet";

const style = theme => ({
    paper: {
        margin: '10px 5px',
        padding: '5px',
        backgroundColor: '#2941AB',
        color: 'white',
    },
    dirButton: {
        fontSize: '16px',
        textDecoration: 'none',
        backgroundColor: '#19594f',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1e6b60'
        },
        padding: '10px',
        minWidth: '11em',
    },
    link: {
        textDecoration: 'none',
        margin: '15px auto',
    }
})

const MyBets = props => {
    const {classes} = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.paper}>
                    <Typography align={"center"} variant={"h5"} className={classes.link}>
                        My bets
                    </Typography>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} sm={10} lg={8}>
                            {props.betList.map((id)=> {
                                return <MyBetsBet userId={props.id} lotId={id}/>
                            })}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(MyBets);