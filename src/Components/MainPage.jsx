import {
    Paper,
    Grid,
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import React from "react";
import Button from "@material-ui/core/Button";

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
        backgroundColor: '#189B0FFF',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1EC412FF'
        },
        padding: '10px',
        minWidth: '11em',
    },
    link: {
        textDecoration: 'none',
        margin: '15px auto',
    }
})

const MainPage = props => {
    const {classes} = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.paper}>
                    <Grid container direction={"column"}>
                        <NavLink to={'/findlot'} className={classes.link}>
                            <Button className={classes.dirButton}>Lot search</Button>
                        </NavLink>

                        <NavLink to={'/createlot'} className={classes.link}>
                            <Button className={classes.dirButton}>Creating a lot</Button>
                        </NavLink>

                        <NavLink to={'/mylots'} className={classes.link}>
                            <Button className={classes.dirButton}>My lots</Button>
                        </NavLink>

                        <NavLink to={'/mybets'} className={classes.link}>
                            <Button className={classes.dirButton}>My bets</Button>
                        </NavLink>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(MainPage);