import {
    Paper,
    Grid, Typography,
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import MyLotsLot from "./MyLotsLot";
import {useHttp} from "../../../hooks/httpHook";
import {setUser} from "../../../Redux/profileReducer";

const style = theme => ({
    paper: {
        margin: '10px 5px',
        padding: '5px',
        backgroundColor: '#2941AB',
        color: 'white',
    },
    link: {
        textDecoration: 'none',
        margin: '15px auto',
    },
})

const MyLots = props => {
    const {classes} = props;
    const {loading, request, error} = useHttp();

    const [lots, setLots] = useState({lots: []})

    useEffect(() => {
        try {
            request('/api/user/finduserlots', 'POST', {
                _id: props.id
            }).then((resp) => {
                setLots({lots: resp.lots});
            })
        } catch (e) {
        }
    }, [])

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.paper}>
                    <Typography align={"center"} variant={"h5"} className={classes.link}>
                        My lots
                    </Typography>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} sm={10} lg={8}>
                            {lots.lots.map((lot) => {
                                return <MyLotsLot name={lot.name} lastBet={lot.lastBet}
                                                  lastBetOwner={lot.lastBetOwner}
                                />
                            })}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(MyLots);