import React, { useContext, useEffect } from 'react'
import { Box } from '@mui/material'
import notesContext from '../context/notes/notesContext'
import Main from './Main'
const Home = () => {
    const context = useContext(notesContext)






    return (
        <>

            <Box width='100vw' sx={{ position: 'absolute', top: '11.5vh' }}>
                <Main />
            </Box>
        </>
    )
}

export default Home