import {
    Paper,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/httpHook";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const style = theme => ({
    paper: {
        margin: '10px 5px',
        padding: '5px',
        backgroundColor: '#2941AB',
        color: 'white',
    },
    textField: {
        margin: '10px 0px',
    },
    confirmButton: {
        margin: '15px 0px',
        backgroundColor: '#189B0FFF',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1EC412FF'
        }
    }
})

const LogIn = props => {
    const {classes} = props;

    const [form, setForm] = useState({
        validation: {
            password: '',
            nickname: '',
        }
    })

    const handleChange = (event) => {
        const {validation} = form;
        validation[event.target.name] = event.target.value;
        setForm({validation});
    }

    const {loading, request, error} = useHttp();

    const load = async () => {
        try {
            await request('/api/auth/login', 'POST', {...form.validation}).then((resp)=>{
                debugger;
                props.setUser(resp._doc)
            })
        } catch (e) {
        }
    }

    useEffect(() => {}, [error])

    return (
        <ValidatorForm onSubmit={load}>
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.paper}>
                    <Typography align={"center"}
                                variant={"h4"}
                                style={{marginBottom: '5%'}}
                    >
                        Logging in
                    </Typography>
                    <Grid container justify={"center"}>

                        <Grid item xs={12} sm={8} lg={7}>
                            <Typography align={"center"}>Nickname</Typography>
                            <TextValidator variant={"outlined"}
                                           fullWidth
                                           inputProps={{style: {padding: '10px', color: 'white'}}}
                                           className={classes.textField}
                                           placeholder='Enter your nickname'
                                           value={form.validation.nickname}
                                           name={'nickname'}
                                           onChange={handleChange}
                                           validators={['minStringLength:2', 'required']}
                                           errorMessages={['Enter at least 2 symbols', 'This field is required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7}>
                            <Typography align={"center"}>Password</Typography>
                            <TextValidator variant={"outlined"}
                                           fullWidth
                                           inputProps={{
                                               style: {padding: '10px', color: 'white'},
                                               type: 'password'
                                           }}
                                           className={classes.textField}
                                           placeholder='Enter your password'
                                           value={form.validation.password}
                                           name={'password'}
                                           onChange={handleChange}
                                           validators={['minStringLength:6', 'required']}
                                           errorMessages={['Enter at least 6 symbols', 'This field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Typography align={"center"} color={"error"}>{error || ''}</Typography>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item>
                            <Button className={classes.confirmButton}
                                    variant={"contained"}
                                    type={"submit"}
                                    disabled={loading}
                            >
                                LogIn
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Typography style={{marginBottom: '10px'}}>
                            {"Don't have an account? "}
                            <NavLink style={{color: 'white'}}
                                     to="/signup"
                            >
                                Register now!
                            </NavLink>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </ValidatorForm>
    )
}

export default withStyles(style)(LogIn);