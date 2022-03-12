import {
    Paper,
    Grid,
    Typography, InputLabel, Select, MenuItem, FormControl,
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useHttp} from "../../hooks/httpHook";
/*import {NavLink} from 'react-router-dom';*/

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
    input: {
        position: 'absolute',
        opacity: '0',
        top: 0,
        left: 0,
        marginTop: '-20px'
    },
    labelFill: {
        cursor: 'pointer',
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '3em',
        background: '#203285',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    formControl: {
        width: '100%',
        marginBottom: '20px'
    },
    labelFillWrap: {
        padding: '0px 10px'
    },
    textField: {
        marginBottom: '20px',
        '& label': {
            color: 'white'
        },
        '& input': {
            color: 'white'
        }
    },
    confirmButton: {
        background: '#189B0FFF',
        color: 'white',
        marginBottom: '20px',
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: '#1EC412FF'
        },
    }
})

const CreateLot = (props) => {
    const [state, setState] = useState({
        validation: {
            name: '',
            lastBet: '',
            instantPrice: '',
            sellerComment: '',
            lotInfo: '',
            category: 4
        },
        file: {
            fileName: 'Upload file',
            photos: null,
            src: ''
        }

    });

    const handleFileLoad = (event) => {
        const {file} = state;
        file['photos'] = event.target.files[0]
        file['fileName'] = event.target.files[0].name;
        setState({validation: state.validation, file})
    }

    const handleChange = (event) => {
        const {validation} = state;
        validation[event.target.name] = event.target.value;
        setState({validation, file: state.file});
    }

    const onFormSubmit = async () => {
        try {
            debugger;
            await request('/api/lot/create', 'POST', {
                ...state.validation,
                creator: props.id,
                photos: state.file.photos,
                fileName: state.file.fileName
            }).then((resp) => {
                props.setUser(resp.userId, resp.nickname)
            })
        } catch (e) {
        }
    }
    const {loading, request, error} = useHttp();
    useEffect(() => {
    }, [error])
    const {classes} = props;
    const {name, lastBet, instantPrice, sellerComment, lotInfo, category} = state.validation;
    return (
        <ValidatorForm onSubmit={onFormSubmit}>
            {/*   <img src={state.file.photos} alt="#"/>*/}
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.paper}>
                    <Typography align={"center"} variant={"h5"} className={classes.link}>
                        Creating a lot
                    </Typography>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} sm={10} lg={8}>
                            <Grid container justify={"center"}>
                                <Grid item xs={12} sm={8}>
                                    <label htmlFor="inputFile" className={classes.labelFill}>
                                        <Grid container justify={"space-between"}
                                              alignItems={"center"}
                                              style={{height: '100%'}}
                                              className={classes.labelFillWrap}
                                        >
                                            <Typography>{state.file.fileName}</Typography>
                                            <CloudUploadTwoToneIcon fontSize={"large"}/>
                                        </Grid>
                                    </label>
                                    <input value={''}
                                           id='inputFile'
                                           type="file"
                                           className={classes.input}
                                           onChange={handleFileLoad}
                                    />
                                </Grid>
                            </Grid>
                            <TextValidator fullWidth
                                           variant={"outlined"}
                                           label='Name'
                                           className={classes.textField}
                                           onChange={handleChange}
                                           name="name"
                                           value={name}
                                           validators={['minStringLength:2', 'required']}
                                           errorMessages={['Enter at least 2 symbols', 'This field is required']}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel style={{color: 'white'}}>Category</InputLabel>
                                <Select className={classes.select} value={category} style={{color: 'white'}}
                                        onChange={handleChange}
                                        name={'category'}
                                >
                                    <MenuItem value={0}>Electronics</MenuItem>
                                    <MenuItem value={1}>Computers</MenuItem>
                                    <MenuItem value={2}>Arts & Crafts</MenuItem>
                                    <MenuItem value={3}>Сloth & Shoes</MenuItem>
                                    <MenuItem value={4}>Smart Home</MenuItem>
                                    <MenuItem value={5}>Software</MenuItem>
                                    <MenuItem value={6}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextValidator fullWidth
                                           variant={"outlined"}
                                           label='Initial price'
                                           className={classes.textField}
                                           onChange={handleChange}
                                           name="lastBet"
                                           value={lastBet}
                                           validators={['required']}
                                           errorMessages={['This field is required']}
                            />
                            <TextValidator fullWidth
                                           variant={"outlined"}
                                           label='Instant purchase price'
                                           className={classes.textField}
                                           onChange={handleChange}
                                           name="instantPrice"
                                           value={instantPrice}
                                           validators={['required']}
                                           errorMessages={['This field is required']}
                            />
                            <TextValidator fullWidth
                                           variant={"outlined"}
                                           label='Description'
                                           className={classes.textField}
                                           onChange={handleChange}
                                           name="lotInfo"
                                           value={lotInfo}
                            />
                            <TextValidator fullWidth
                                           variant={"outlined"}
                                           label='Comment'
                                           className={classes.textField}
                                           onChange={handleChange}
                                           name="sellerComment"
                                           value={sellerComment}
                            />
                            <Grid container justify={"center"}>
                                <Button variant={"contained"}
                                        type={"submit"}
                                        className={classes.confirmButton}
                                        disabled={loading}
                                        /*onClick={'/'}*/
                                >
                                Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </ValidatorForm>
    )
}

export default withStyles(style)(CreateLot);