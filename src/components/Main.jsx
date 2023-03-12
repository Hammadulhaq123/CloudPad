import React from 'react'
import '../App.css'
import { Stack, Typography, TextField, Box } from '@mui/material'


const Main = () => {
    return (
        <Box width='80vw' height='91vh' sx={{ position: 'absolute', left: '20vw', top: '9vh', background: '#191a19' }}>
            <Stack direction='column' spacing={2}>
                <Typography variant='h3' color='primary' my={2}>Your Notes</Typography>
                <form>
                    <TextField variant='filled' color='primary' label='Title' sx={{ background: '#ed6c02', borderRadius: 1, width: '90%', marginBottom: '16px' }} />
                    <TextField variant='filled' color='primary' label='Tag' sx={{ background: '#ed6c02', borderRadius: 1, width: '90%', marginBottom: '16px' }} />
                    <TextField label='Note' variant='filled' color='primary' multiline rows={15} sx={{ background: '#ed6c02', borderRadius: 1, width: '90%' }} />
                </form>

            </Stack>
        </Box>
    )
}

export default Main
