import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Button, Container } from '@mui/material';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 10,


}));

const CreateForm = () => {
    const [textBool, setTextBool] = useState(false);
    const [numberBool, setNumberBool] = useState(false);
    const [dateBool, setDateBool] = useState(false);
    const [textAreaBool, settextArea] = useState(false);
    const [success, setSuccess] = useState(false);

    const [data, setData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const hanldeSubmit = (e) => {
        const procced = window.confirm('Are you want to Submit');
        if (procced) {
            fetch('https://cryptic-oasis-47086.herokuapp.com/users', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            setSuccess(true);
            e.target.reset();
        }
        e.preventDefault()
    }
    return (
        <div>
            <h1>Create Your Own Form</h1>

            {success && <Alert  severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
            </Alert>}

                 <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Container>
                                <Typography variant="h5" component="div">
                                    Form
                                </Typography>
                                <form onSubmit={hanldeSubmit}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Form Name"
                                        name="formName"
                                        onChange={handleInputChange}
                                        variant="outlined" />
                                    <br />
                                    {textBool && <TextField
                                        sx={{ margin: 2 }}
                                        id="outlined-basic"
                                        label="Text"
                                        name="text"
                                        onChange={handleInputChange}
                                        variant="outlined" />
                                    }
                                    <br />
                                    {numberBool && <TextField
                                        sx={{ margin: 2 }}
                                        id="outlined-number"
                                        label="Number"
                                        name="number"
                                        onChange={handleInputChange}

                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />}
                                    <br />
                                    {dateBool && <TextField
                                        sx={{ margin: 2 }}
                                        id="outlined-number"
                                        label="Date"
                                        name="date"
                                        onChange={handleInputChange}

                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />}
                                    <br />
                                    {textAreaBool && <TextField
                                        sx={{ margin: 2 }}
                                        id="outlined-number"
                                        label="TextArea"

                                        name="textArea"
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />}

                                    <br />
                                    <Button
                                        sx={{ margin: 1 }}
                                        type='submit'
                                        variant="contained"
                                        color="success"
                                    >
                                       Generate
                                    </Button>
                                </form>
                            </Container>

                        </Grid>
                        <Grid item xs={4}>
                            <Container>
                                <Typography variant="h5" component="div">
                                    Select Your Field
                                </Typography>
                          
                             <div style={{display:"flex",flexDirection:"column",margin:25}}>  
                                <Button
                                    sx={{ margin: 1 }}
                                    onClick={() => {
                                        if (textBool === false) {
                                            setTextBool(true)
                                        }
                                        else {
                                            setTextBool(false)
                                        }
                                    }}
                                    variant="contained"
                                    color="success"
                                >
                                    Text Field
                                </Button>
                             
                                <Button
                                    sx={{ margin: 1 }}
                                    onClick={() => {
                                        if (numberBool === false) {
                                            setNumberBool(true)
                                        }
                                        else {
                                            setNumberBool(false)
                                        }
                                    }}
                                    variant="contained"
                                    color="success"
                                >
                                    Number Field
                                </Button>
                              
                                <Button
                                    sx={{ margin: 1 }}
                                    onClick={() => {
                                        if (dateBool === false) {
                                            setDateBool(true)
                                        }
                                        else {
                                            setDateBool(false)
                                        }
                                    }}
                                    variant="contained"
                                    color="success"
                                >
                                    Date field
                                </Button>
                               
                                <Button
                                    sx={{ margin: 1 }}
                                    onClick={() => {
                                        if (textAreaBool === false) {
                                            settextArea(true)
                                        }
                                        else {
                                            settextArea(false)
                                        }

                                    }}
                                    variant="contained"
                                    color="success"
                                >
                                    Text Area Field
                                </Button>
                                </div>

                            </Container>
                        </Grid>

                    </Grid>
                </Box>

        </div>
    );
};

export default CreateForm;