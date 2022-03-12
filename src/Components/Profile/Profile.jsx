import {
    Paper,
    Grid,
    Button,
    Typography
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/httpHook";
import {setUser} from "../../Redux/profileReducer";

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
        width: '180px',
        height: '60px',
    },
    link: {
        textDecoration: 'none',
        margin: '15px auto',
    },
    confirmButton: {
        fontSize: '16px',
        marginLeft: '20px',
        backgroundColor: '#189B0FFF',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1EC412FF'
        },
        padding: '5px 10px',
    },
    changeBlock: {
        margin: '20px 0px'
    },
    textField: {
        color: 'white',
        padding: '10px'
    }
})

const Profile = props => {

    const {loading, request, error} = useHttp();

    useEffect(() => {
        try {
            request('/api/user/getuserdata', 'POST', {
                userId: props.user._id
            }).then((resp) => {
                setUser(resp.user);
            })
        } catch (e) {
        }
    },[request])

    const [userInfo, setUserInfo] = useState({
        user: {
            nickname: props.user.nickname,
            email: props.user.email,
            curPassword: '',
            password: '',
            repPassword: ''
        }
    })
    const [errorMessage, setErrorMessage] = useState({
        error: {
            message: '',
            color: ''
        }
    })

    ValidatorForm.addValidationRule('eqPasswords', (value) => {
        if (value !== userInfo.user.password) {
            return false;
        }
        return true;
    });

    const handleChange = (event) => {
        const {user} = userInfo;
        user[event.target.name] = event.target.value;
        setUserInfo({user});
    }

    const handleNickSubmit = async () => {
        try {
            await request('/api/user/changenickname', 'POST', {
                nickname: userInfo.user.nickname,
                userId: props.user.userId
            }).then((resp) => {
                const {error} = errorMessage;
                error['message'] = resp.message ? resp.message : resp.error;
                error['color'] = resp.message ? 'inherit' : 'error'
                setErrorMessage({error})
            })
        } catch (e) {
        }
    }
    const handleEmailSubmit = async () => {
        try {
            await request('/api/user/changemail', 'POST', {
                email: userInfo.user.email,
                userId: props.user.userId
            }).then((resp) => {
                const {error} = errorMessage;
                error['message'] = resp.message ? resp.message : resp.error;
                error['color'] = resp.message ? 'inherit' : 'error'
                setErrorMessage({error})
            })
        } catch (e) {
        }
    }
    const handlePasswordSubmit = async () => {
        try {
            await request('/api/user/changepassword', 'POST', {
                password: userInfo.user.password,
                curPassword: userInfo.user.curPassword,
                userId: props.user.userId
            }).then((resp) => {
                const {error} = errorMessage;
                error['message'] = resp.message ? resp.message : resp.error;
                error['color'] = resp.message ? 'inherit' : 'error'
                setErrorMessage({error})
            })
        } catch (e) {
        }
    }

    const {classes} = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.paper}>
                    <Typography align={"center"} variant={"h5"} className={classes.link}>
                        Account
                    </Typography>

                    <ValidatorForm onSubmit={handleNickSubmit}>
                        <Grid container justify={"center"} alignItems={"center"} className={classes.changeBlock}>
                            <Grid item xs={10} sm={8} lg={6}>
                                <TextValidator variant={"outlined"}
                                               fullWidth
                                               inputProps={{className: classes.textField}}
                                               value={userInfo.user.nickname}
                                               onChange={handleChange}
                                               name={'nickname'}
                                               placeholder='Enter your nickname'
                                               validators={['required']}
                                               errorMessages={['This field is required']}

                                />

                            </Grid>
                            <Button type={"submit"} variant={"contained"}
                                    className={classes.confirmButton}>Change</Button>
                        </Grid>
                    </ValidatorForm>

                    <ValidatorForm onSubmit={handleEmailSubmit}>
                        <Grid container justify={"center"} alignItems={"center"} className={classes.changeBlock}>
                            <Grid item xs={10} sm={8} lg={6}>
                                <TextValidator variant={"outlined"}
                                               fullWidth
                                               inputProps={{className: classes.textField}}
                                               value={userInfo.user.email}
                                               onChange={handleChange}
                                               name={'email'}
                                               placeholder='Enter your email'
                                               validators={['isEmail', 'required']}
                                               errorMessages={['Not the right format', 'This field is required']}
                                />
                            </Grid>
                            <Button type={"submit"} variant={"contained"}
                                    className={classes.confirmButton}>Change</Button>
                        </Grid>
                    </ValidatorForm>

                    <ValidatorForm onSubmit={handlePasswordSubmit}>
                        <Grid container justify={"center"} alignItems={"center"} className={classes.changeBlock}>
                            <Grid item xs={10} sm={8} lg={6}>
                                <TextValidator variant={"outlined"}
                                               style={{marginBottom: '20px'}}
                                               fullWidth
                                               inputProps={{className: classes.textField, type: 'password'}}
                                               value={userInfo.user.curPassword}
                                               onChange={handleChange}
                                               name={'curPassword'}
                                               placeholder='Enter your password'
                                               validators={['minStringLength:6', 'required']}
                                               errorMessages={['Enter at least 6 symbols', 'This field is required']}
                                />
                                <TextValidator variant={"outlined"}
                                               style={{marginBottom: '20px'}}
                                               fullWidth
                                               inputProps={{className: classes.textField, type: 'password'}}
                                               value={userInfo.user.password}
                                               onChange={handleChange}
                                               name={'password'}
                                               placeholder='Enter a new password'
                                               validators={['minStringLength:6', 'required']}
                                               errorMessages={['Enter at least 6 symbols', 'This field is required']}
                                />
                                <TextValidator variant={"outlined"}
                                               fullWidth
                                               inputProps={{className: classes.textField, type: 'password'}}
                                               value={userInfo.user.repPassword}
                                               onChange={handleChange}
                                               name={'repPassword'}
                                               placeholder='Repeat password'
                                               validators={['eqPasswords']}
                                               errorMessages={['Passwords do not match']}
                                />
                            </Grid>
                            <Button type={"submit"} variant={"contained"}
                                    className={classes.confirmButton}>Change</Button>
                        </Grid>
                        <Typography align={"center"} variant={"body1"} color={errorMessage.error.color}
                                    className={classes.link}>
                            {errorMessage.error.message}
                        </Typography>
                    </ValidatorForm>

                    <Grid container direction={"column"}>
                        <NavLink to={'/mylots'} className={classes.link}>
                            <Button variant={"contained"} className={classes.dirButton}>My lots</Button>
                        </NavLink>

                        <NavLink to={'/mybets'} className={classes.link}>
                            <Button variant={"contained"} className={classes.dirButton}>My bets</Button>
                        </NavLink>

                        <NavLink to={'/mywins'} className={classes.link}>
                            <Button variant={"contained"} className={classes.dirButton}>Lots won</Button>
                        </NavLink>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(Profile);