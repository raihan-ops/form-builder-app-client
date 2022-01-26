import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, InputBase, TablePagination, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';






const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        getData()

    }, [])

    const getData = async () => {
        setLoading(true);
        try {

            const res = await fetch('https://cryptic-oasis-47086.herokuapp.com/users')
            const _value = await res.json();
            setData(_value);
            setLoading(false);

        } catch (error) {

            console.log(error);
        }
    }
    // for searching
    const handleSearch = () => {

        if (search.length !== 0) {

            const newList = data.filter((val) => {
                return Object.values(val)
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase());

            })
            setSearchList(newList);

        }
        else {
            setSearchList(data);

        }

    }


    // for pgination

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    // navigate other pages
    const handleClick = (value) => {
        navigate("/userSelect", { state: value })
    }

    const handleReport = (id) => {
        navigate(`/details/${id}`)
    }
    return (
        <div >
            <h1>Wellcome to Form Builder App</h1>

            {
                loading ? <Box >
                    <CircularProgress size={20} thickness={10} color="warning" sx={{ paddingLeft: 1 }} />
                    <Typography variant='p'>Waitting...</Typography>
                </Box>
                    : <div style={{ margin: 20, boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }} >


                        <TableContainer component={Paper} >
                            <h3 style={{ textAlign: "left", backgroundColor: "white", margin: 10 }}>Form List :</h3>
                            <Box style={{ paddingTop: 20 }}>
                                <InputBase
                                    sx={{
                                        ml: 1,
                                        flex: 1,
                                        border: 1,
                                        padding: 1,
                                        borderRadius: 5

                                    }}
                                    onBlur={(e) => setSearch(e.target.value)}
                                    placeholder="Search your Name"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <Button
                                    sx={{ margin: 1 }}
                                    variant="contained"
                                    onClick={handleSearch}
                                    color="success"
                                >
                                    Search
                                </Button>
                            </Box>

                          

                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }}>Serial No</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }} align="left">Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }} align="right">Action</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(searchList < 1 ? data : searchList).map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                onClick={() => handleClick(row)}
                                                component="th"
                                                scope="row"
                                                sx={{ cursor: 'pointer', color: 'blue' }}
                                            >

                                                {row.formName}
                                            </TableCell>
                                            <TableCell
                                                align="right">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleReport(row._id)}
                                                    color="success"
                                                >
                                                    Report
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    }



                                </TableBody>

                            </Table>
                            <TablePagination

                                rowsPerPageOptions={[4, 6, 8]}
                                component="div"
                                count={data.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>}
        </div>
    );
};

export default Home;