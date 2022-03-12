import {
    Paper,
    Grid, Typography,
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MyWinsWin from "../MyWins/MyWinsWin";
import {useHttp} from "../../../hooks/httpHook";

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

const MyWins = props => {
    const {classes} = props;
    const {loading, request, error} = useHttp();
    const [lots, setLots] = useState({lots: []})

    useEffect(() => {
        try {
            request('/api/user/finduserwins', 'POST', {
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
                        Lots won
                    </Typography>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} sm={10} lg={8}>
                            {lots.lots.map((lot)=>{
                                return <MyWinsWin name={lot.name} lastBet={lot.lastBet}/>
                            })}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(MyWins);