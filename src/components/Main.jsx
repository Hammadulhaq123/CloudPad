import React from 'react'
import '../App.css'
import { Stack, Typography, TextField, Box } from '@mui/material'


const Main = () => {
    return (
        <Box width='80vw' height='100vh' sx={{ position: 'absolute', left: '15vw', top: 0 }}>
            <Stack direction='column' spacing={2}>
                <Typography variant='h3' color='#000'>Your Notes</Typography>

            </Stack>
        </Box>
    )
}

export default Main
