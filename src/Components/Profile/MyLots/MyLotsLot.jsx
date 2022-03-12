import {
    Paper,
    Grid, Typography,
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {useHttp} from "../../../hooks/httpHook";

let elev = 5;

const style = theme => ({
    lotPaper: {
        padding: '2px',
        marginBottom: '20px',
        background: '#189B0FFF',
        transition: 'all .5s',
        '&:hover': {
            transform: 'scale(1.2)',
        }
    },
    photo: {
        maxWidth: '41%',
    },
    lotText: {
        width: '100%'
    }
})

const MyLotsLot = (props) => {

    const [state, setState] = useState({
        elev: 5,
        lastBetOwner: '',
        didBet: false
    })

    const onMouseOver = () => {
        setState({...state, elev: 15})
    }
    const onMouseOut = () => {
        setState({...state, elev: 5})
    }

    const {loading, request, error} = useHttp();

    useEffect(() => {
        if (props.lastBetOwner !== '') {
            try {
                request('/api/user/getuserdata', 'POST', {
                    userId: props.lastBetOwner
                }).then((resp) => {
                    debugger;
                    setState({...state, lastBetOwner: resp.user.nickname, didBet: true})
                })
            } catch (e) {
            }
        }
    }, [request])

    const {classes} = props;
    const {elev} = state;
    const src = 'https://drscdn.500px.org/photo/159533631/m%3D900/v2?sig=7cf1ba4b1c724c55a76368f89392390956904df02907170602d704c8a38403a8'
    return (
        <NavLink to={'/lot/:1'} style={{textDecoration: 'none'}}>
            <Paper className={classes.lotPaper}
                   elevation={elev}
                   onMouseOver={onMouseOver}
                   onMouseOut={onMouseOut}
            >
                <Grid container justify={"space-between"}>
                    <Grid item xs={4}>
                        <Grid container alignItems={"center"} justify={"space-between"} style={{height: '100%', color: 'white'}}>
                            <img src={src} alt="Photo" className={classes.photo}/>
                            <Grid item xs={7}>
                                <Typography align={"center"}>
                                    {props.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {state.didBet ?
                        <Grid item xs={4}>
                            <Grid container alignItems={"center"} style={{height: '100%', color: 'white'}}>
                                <Typography align={"center"} className={classes.lotText}>
                                    The last bet
                                </Typography>
                                <Typography align={"center"} className={classes.lotText}>
                                    {`${props.lastBet}₴`}
                                </Typography>
                            </Grid>
                        </Grid> : ''}
                    {state.didBet ?
                        <Grid item xs={4}>
                            <Grid container alignItems={"center"} style={{height: '100%', color: 'white'}}>
                                <Typography align={"center"} className={classes.lotText}>
                                    The owner of the last bet
                                </Typography>
                                <Typography align={"center"} className={classes.lotText}>
                                    {state.lastBetOwner}
                                </Typography>
                            </Grid>
                        </Grid>
                        :
                        <Grid item>
                            <Grid container style={{height: '100%'}} alignItems={"center"} alignContent={"center"}>
                                <Typography align={"center"} className={classes.lotText}>
                                    No bets were placed
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Paper>
        </NavLink>
    )
}


export default withStyles(style)(MyLotsLot);