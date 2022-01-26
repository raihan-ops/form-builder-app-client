import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Box, Button, Card, CircularProgress, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Details = () => {
    const parms = useParams()

    const [error, setError] = useState(false);
    const [value, setValue] = useState([])
    const [fullData, setFullData] = useState([])
    const [obKey, setObKey] = useState([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
       
        getData();

    }, [])

    const getData =  async() => {
        setLoading(true);
        try {


            const res = await fetch(`http://localhost:5000/usersEntry/${parms.eid}`)
            const data = await res.json();

            setFullData(data)
            const _value = Object.values(data?.entry);
            setValue(_value);
            const _obKey = Object.getOwnPropertyNames(data?.entry);
            setObKey(_obKey);
            setLoading(false)
            setError(false)




        } catch (error) {
            setLoading(false)
            setError(true)
            console.log("error massage", error);
        }
    }

    return (
        <div>

            {
                loading ? <Box >
                    <CircularProgress size={20} thickness={10} color="warning" sx={{ paddingLeft: 1 }} />
                    <Typography variant='p'>Waitting...</Typography>
                </Box>
                    : <Card sx={{ margin: 10, boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>

                        <h3 style={{ textAlign: "left", backgroundColor: "white", margin: 10, borderBottom: "1px solid gray" }}>{fullData.formName}:</h3>

                        {error ? <Alert severity="error">You are not Added data — check it out!</Alert>
                            : <TableContainer component={Paper} >

                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            {

                                                obKey.map((val, index) => <TableCell
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: 20
                                                    }}
                                                    align="center"
                                                    key={index}
                                                >{val.toUpperCase()}</TableCell>)

                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >



                                            {
                                                value.map((val, index) => <TableCell align="center" key={index}>{val}</TableCell>)
                                            }

                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        }
                    </Card>}

        </div>
    );
};

export default Details;