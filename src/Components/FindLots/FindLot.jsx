import {
    Paper,
    Grid,
    TextField,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import Lot from './Lot'
import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/httpHook";

const style = theme => ({
    paper: {
        margin: '0px 5px',
        padding: '15px 10px',
        backgroundColor: '#2941AB',
        color: 'white',
        height: '100%',
    },
    formControl: {
        width: '100%',
        marginBottom: '20px'
    },
    filterElement: {
        marginBottom: '20px',
    },
    textField: {
        color: 'white',
        '& input': {
            color: 'white'
        }
    },
    select: {
        color: 'white'
    },
    confirmButton: {
        margin: '10px 0px',
        backgroundColor: '#189B0FFF',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1EC412FF'
        }
    },
    paperWrap: {
        overflow: 'hidden',
        margin: '10px 0px',
        borderRadius: '10px'
    }
})

const FindLot = props => {
    const [time, setTime] = useState({
        rerenderTime: false
    })
    const [filter, setFilter] = useState({
        filters: {
            timeLeft: -1,
            category: -1,
            instantLow: '',
            instantHigh: '',
            lastBetLow: '',
            lastBetHigh: '',
            search: ''
        }
    })
    const {loading, request} = useHttp();
    const lots = props.lots ? Object.entries(props.lots) : null;

    const timerSet = () => {
        const timer = setTimeout(() => {
            setTime({rerenderTime: !time.rerenderTime})
        }, 1000);
    }

    const handleChange = (event) => {
        const {filters} = filter;
        filters[event.target.name] = event.target.value;
        setFilter({filters});
    }
    const handleTextChange = async (event) => {
        const {filters} = filter;
        filters[event.target.name] = event.target.value;
        setFilter({filters});
        await updateLots();
    }

    const updateLots = async () => {
        try {
            await request('/api/lot/findall', 'POST', {...filter}).then((resp) => {
                props.setLots(resp.lots);
            })
        } catch (e) {
        }
    }

    const submitFilters = async () => {
        await updateLots();
    }

    useEffect(async () => {
        await updateLots();
        timerSet();
    }, [request])

    const {classes} = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12} lg={4} xl={3} className={classes.paperWrap}>
                        <Paper elevation={5} className={classes.paper}>
                            <Typography align={"center"}
                                        variant={"h5"}
                                        className={classes.filterElement}
                            >
                                Search by
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <InputLabel style={{color: 'white'}}>Category</InputLabel>
                                <Select className={classes.select} value={filter.filters.category}
                                        onChange={handleChange}
                                        name={'category'}>
                                    <MenuItem value={-1}>All</MenuItem>
                                    <MenuItem value={0}>Electronics</MenuItem>
                                    <MenuItem value={1}>Computers</MenuItem>
                                    <MenuItem value={2}>Arts & Crafts</MenuItem>
                                    <MenuItem value={3}>Сloth & Shoes</MenuItem>
                                    <MenuItem value={4}>Smart Home</MenuItem>
                                    <MenuItem value={5}>Software</MenuItem>
                                    <MenuItem value={6}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid className={classes.filterElement}>
                                <Typography variant={"h6"} align={"center"}>Instant purchase price</Typography>
                                <Typography align={"center"} style={{lineHeight: '2em'}}>
                                    From
                                    <TextField variant={"outlined"}
                                               style={{maxWidth: '35%', margin: '0px 5px'}}
                                               inputProps={{style: {padding: '10px'}}}
                                               className={classes.textField}
                                               onChange={handleChange}
                                               name={'instantLow'}
                                    />
                                    to
                                    <TextField variant={"outlined"}
                                               style={{maxWidth: '35%', margin: '0px 5px'}}
                                               inputProps={{style: {padding: '10px'}}}
                                               className={classes.textField}
                                               onChange={handleChange}
                                               name={'instantHigh'}
                                    />
                                </Typography>
                            </Grid>
                            <FormControl className={classes.formControl}>
                                <InputLabel style={{color: 'white'}}>Time left</InputLabel>
                                <Select className={classes.select} value={filter.filters.timeLeft}
                                        onChange={handleChange}
                                        name={'timeLeft'}>
                                    <MenuItem value={-1}>All</MenuItem>
                                    <MenuItem value={1}>Less than an hour</MenuItem>
                                    <MenuItem value={2}>Less than a day</MenuItem>
                                    <MenuItem value={3}>Less than 3 days</MenuItem>
                                    <MenuItem value={4}>More than a day</MenuItem>
                                    <MenuItem value={5}>More than 3 days</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid className={classes.filterElement}>
                                <Typography variant={"h6"} align={"center"}>The amount of the last bet</Typography>
                                <Typography align={"center"} style={{lineHeight: '2em'}}>
                                    From
                                    <TextField variant={"outlined"}
                                               style={{maxWidth: '35%', margin: '0px 5px'}}
                                               inputProps={{style: {padding: '10px'}}}
                                               className={classes.textField}
                                               onChange={handleChange}
                                               name={'lastBetLow'}
                                    />
                                    to
                                    <TextField variant={"outlined"}
                                               style={{maxWidth: '35%', margin: '0px 5px'}}
                                               inputProps={{style: {padding: '10px'}}}
                                               className={classes.textField}
                                               onChange={handleChange}
                                               name={'lastBetHigh'}
                                    />
                                </Typography>
                            </Grid>
                            <Grid container justify={"center"}>
                                <Button className={classes.confirmButton}
                                        variant={"contained"}
                                        onClick={submitFilters}
                                >
                                    Confirm
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={8} xl={9} className={classes.paperWrap}>
                        <Paper elevation={5} className={classes.paper}>
                            <TextField fullWidth
                                       variant={"outlined"}
                                       inputProps={{style: {padding: '10px'}}}
                                       placeholder={'Enter the name of the lot'}
                                       className={classes.textField}
                                       onChange={handleTextChange}
                                       name={'search'}
                            />
                            <Grid container>
                                {lots ? lots.map((lot) => {
                                    return <Lot name={lot[1].name}
                                                lastBet={lot[1].lastBet}
                                                date={lot[1].date}
                                                id={lot[1]._id}
                                    />
                                }) : ''}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(FindLot);