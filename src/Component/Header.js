import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"  >
                <Toolbar >
                  
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Form Builder App
                    </Typography>


                    

                   
                    <Link  to="/" style={{textDecoration:"none"}} >

                        <p style={{marginRight:10,color:"white",fontWeight:"bold"}} >Home</p>
                    </Link>

                    <Link  to="/form" style={{textDecoration:"none"}} >

                        <p style={{marginRight:10,color:"white",fontWeight:"bold"}} >Generate Form</p>
                    </Link>               
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;