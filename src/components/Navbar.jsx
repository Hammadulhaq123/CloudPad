import React, { useEffect } from 'react'
import { AppBar, Button, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { DocumentScanner } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();

    useEffect(() => {

    }, [location]);
    return (
        <AppBar sx={{ height: '9vh', background: '#191a19' }}>
            <Toolbar>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <IconButton size='large' edge='start' color='primary' aria-label='logo'>
                        <DocumentScanner />
                    </IconButton>
                    <Typography variant='h5' component='div' color='primary' sx={{ flexGrow: 1 }}><Link to='/' ><Button color='warning' >CloudPad</Button></Link></Typography>
                </Box>

                <Stack direction='row' spacing={2} sx={{ marginLeft: 'auto' }}>
                    <Link to='/'><Button variant={`${location.pathname === "/" ? "contained" : "outlined"}`} size='small' color='warning'>Home</Button></Link>
                    <Link to='/about'><Button variant={`${location.pathname === "/about" ? "contained" : "outlined"}`} size='small' color='primary'>About</Button></Link>
                </Stack>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
