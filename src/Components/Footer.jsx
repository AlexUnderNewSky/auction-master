import {
    Paper,
    Grid,
    Typography,
    IconButton
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import React from "react";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const style = theme => ({
    paper: {
        margin: '10px 5px',
        padding: '5px 15px',
        backgroundColor: '#2941AB', //7344BB
        color: 'white',
    },
    loginButton: {
        textDecoration: 'none',
        backgroundColor: '#189B0FFF',
        color: 'white',
        '&:hover':{
            backgroundColor: '#1EC412FF'
        }
    },
})

const Footer = props => {
    const {classes} = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.paper}>
                    <Grid container justify={"space-between"} style={{alignItems: 'center'}}>
                        <Typography>Copyright ©2022</Typography>
                        <Typography>developed by Serhii Sosnitskij</Typography>
                        <Typography>Back to top
                            <IconButton size={"small"}><ArrowUpwardIcon/></IconButton>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(Footer);