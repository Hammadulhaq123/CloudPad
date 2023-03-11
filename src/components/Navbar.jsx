import React from 'react'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography, MenuItem, Menu } from '@mui/material'
import { DocumentScanner } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar sx={{ background: '#191a19' }}>
            <Toolbar>
                <IconButton size='large' edge='start' color='primary' aria-label='logo'>
                    <DocumentScanner />
                </IconButton>
                <Typography variant='h5' component='div' color='primary' sx={{ flexGrow: 1 }}><Link to='/'><Button color='warning'>CloudPad</Button></Link></Typography>

                <Stack direction='row' spacing={2}>
                    <Link to='/'><Button variant='contained' color='warning'>Home</Button></Link>
                    <Link to='/about'><Button variant='contained' color='primary'>About</Button></Link>
                </Stack>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
