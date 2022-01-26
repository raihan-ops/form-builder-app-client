
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



const UserSelectionForm = () => {
    const location = useLocation();
    const value = location.state;
    const [entry,setEntry]=useState({})
    const navigate= useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEntry({...entry, [name]: value});
    }
    const hanldeSubmit = (e) => {
        const userEntry={
            eid:value._id,
            formName:value.formName,
            entry

        }

       


        const procced = window.confirm('Are you want to Submit');
        if(procced){
          fetch('https://cryptic-oasis-47086.herokuapp.com/usersEntry',{
              method:"POST",
              headers:{
               'content-type':'application/json'
              },
              body:JSON.stringify(userEntry)
          })
          
  
          e.target.reset();
        }


        navigate(`/details/${value._id}`)

        e.preventDefault();
    }

    return (
        <div>
           

            <Box style={{margin:40,boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                <Typography variant="h5" component="div" sx={{marginTop:2}}>
                    {value.formName}
                </Typography>
                <form onSubmit={hanldeSubmit}>


                    {value.text && <TextField
                        
                        sx={{ margin: 2,width:'60%' }}
                        id="outlined-basic"
                        label={value.text}
                        name={value.text}
                        type="text"
                        onChange={handleInputChange}
                        variant="outlined" />
                    }
                    <br />
                    {value.number && <TextField
                         sx={{ margin: 2,width:'60%' }}
                        id="outlined-number"
                        label={value.number}
                        name={value.number}
                        type="number"
                        onChange={handleInputChange}

                        InputLabelProps={{
                            shrink: true,
                        }}
                    />}
                    <br />
                    {value.date && <TextField
                        sx={{ margin: 2,width:'60%' }}
                        id="outlined-number"
                        label={value.date}
                        name={value.date}
                        type="date"
                        onChange={handleInputChange}

                        InputLabelProps={{
                            shrink: true,
                        }}
                    />}
                    <br />
                    {value.textArea && <textarea
                        placeholder={value.textArea}
                        style={{width:"60%",height:60}}
                        id="outlined-number"
                        label={value.textArea}

                        name={value.textArea}
                      
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />}

                    <br />
                    <Button
                       sx={{ margin: 2,width:'60%' }}
                        type='submit'
                        variant="contained"
                        color="success"
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default UserSelectionForm;