import {
    Paper,
    Grid,
    TextField,
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";

const style = theme => ({
    paper: {
        margin: '10px 5px',
        padding: '10px 15px',
        backgroundColor: '#2941AB', //268777
        color: 'white',
    },
    loginButton: {
        textDecoration: 'none',
        backgroundColor: '#189B0FFF', //189B0FFF 1EC412FF
        color: 'white',
        '&:hover': {
            backgroundColor: '#1EC412FF'
        },
        fontSize: '16px',
    },
    logo: {
        textDecoration: 'none',
        color: 'white',
    },
    paperWrap: {
        overflow: 'hidden',
        margin: '10px 0px',
        borderRadius: '10px'
    }
})

const Header = props => {
    const {classes} = props;
    const src = 'https://drscdn.500px.org/photo/159533631/m%3D900/v2?sig=7cf1ba4b1c724c55a76368f89392390956904df02907170602d704c8a38403a8'
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.paper}>
                    <Grid container justify={"space-between"} style={{alignItems: 'center'}}>
                        <Grid item xs={4} sm={2} lg={1}>
                            <NavLink to={'/'} className={classes.logo}>
                                <img src={src} alt="logo" style={{maxWidth: '100%'}}/>
                            </NavLink>
                        </Grid>

                        <Grid xl={6} className={classes.paperWrap} >
                                <TextField fullWidth
                                          // variant={"outlined"}
                                           inputProps={{style: {padding: '10px', color: 'white'}}}
                                           placeholder={'Enter the name of the lot'}
                                           className={classes.textField}
                                          // onChange={handleTextChange}
                                           name={'search'}
                                />
                        </Grid>

                        {props.nickname ?
                            <NavLink to='/profile' style={{textDecoration: 'none'}}>
                                {props.nickname}
                            </NavLink>
                            :
                            <NavLink to='/login' style={{textDecoration: 'none'}}>
                                <Button variant={"contained"} className={classes.loginButton}>Login</Button>
                            </NavLink>
                        }
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(Header);