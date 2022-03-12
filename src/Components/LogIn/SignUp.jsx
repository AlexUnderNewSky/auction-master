import {
    Paper,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useHttp} from '../../hooks/httpHook';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {NavLink} from "react-router-dom";

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
        margin: '10px 0px',
        backgroundColor: '#189B0FFF',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1EC412FF'
        }
    }
})

const SignUp = props => {
    const {classes} = props;

    const [form, setForm] = useState({
        validation: {
            name: '',
            sName: '',
            password: '',
            nickname: '',
            email: ''
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
            await request('/api/auth/register', 'POST', {...form.validation}).then((resp)=>{
                props.setUser(resp.user)
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
                        Registration
                    </Typography>
                    <Grid container justify={"center"}>
                        <Grid item xs={12} sm={8} lg={7}>
                            <Typography align={"center"}>Name</Typography>
                            <TextValidator variant={"outlined"}
                                           fullWidth
                                           onChange={handleChange}
                                           name={'name'}
                                           value={form.validation.name}
                                           inputProps={{style: {padding: '10px', color: 'white'}}}
                                           className={classes.textField}
                                           placeholder='Enter your name'
                                           validators={['minStringLength:2', 'required']}
                                           errorMessages={['Enter at least 2 symbols', 'This field is required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7}>
                            <Typography align={"center"}>Second name</Typography>
                            <TextValidator variant={"outlined"}
                                           fullWidth
                                           onChange={handleChange}
                                           name={'sName'}
                                           value={form.validation.sName}
                                           inputProps={{style: {padding: '10px', color: 'white'}}}
                                           className={classes.textField}
                                           placeholder='Enter your second name'
                                           validators={['minStringLength:2', 'required']}
                                           errorMessages={['Enter at least 2 symbols', 'This field is required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7}>
                            <Typography align={"center"}>Nickname</Typography>
                            <TextValidator variant={"outlined"}
                                           fullWidth
                                           onChange={handleChange}
                                           name={'nickname'}
                                           value={form.validation.nickname}
                                           inputProps={{style: {padding: '10px', color: 'white'}}}
                                           className={classes.textField}
                                           placeholder='Enter your nickname'
                                           validators={['required']}
                                           errorMessages={['This field is required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7}>
                            <Typography align={"center"}>Password</Typography>
                            <TextValidator variant={"outlined"}
                                           fullWidth
                                           onChange={handleChange}
                                           name={'password'}
                                           value={form.validation.password}
                                           inputProps={{
                                               style: {padding: '10px', color: 'white'},
                                               type: 'password'
                                           }}
                                           className={classes.textField}
                                           placeholder='Enter your password'
                                           validators={['minStringLength:6', 'required']}
                                           errorMessages={['Enter at least 6 symbols', 'This field is required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7}>
                            <Typography align={"center"}>Email</Typography>
                            <TextValidator variant={"outlined"}
                                           fullWidth
                                           onChange={handleChange}
                                           name={'email'}
                                           value={form.validation.email}
                                           inputProps={{
                                               style: {padding: '10px', color: 'white'},
                                           }}
                                           className={classes.textField}
                                           placeholder='Enter your e-mail'
                                           validators={['isEmail', 'required']}
                                           errorMessages={['This is not an email', 'This field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"}>
                        <Grid item>
                            <Button className={classes.confirmButton}
                                    variant={"contained"}
                                    disabled={loading}
                                    type={"submit"}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Typography style={{marginBottom: '10px'}}>
                            {"Already have an account? "}
                            <NavLink style={{color: 'white'}}
                                     to="/login"
                            >
                                Log in
                            </NavLink>
                            {" to your account! "}
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </ValidatorForm>
    )
}

export default withStyles(style)(SignUp);