import { Container,Box, TextField, Typography,IconButton, Snackbar,Alert } from "@mui/material"
import { Key,AccountCircle, Fingerprint } from "@mui/icons-material"
import axios from "axios"

import React, {useState} from "react"

function Login(){

    // State untuk menampilkan SnackBar
    const [openSb, setOpenSb] = useState(false)

    const handleClose = (event, reason) => {
        setOpenSb(false);
    };

    // state untuk message SB
    const [messageSb, setMessageSb] = useState('')

    // state untuk menampug email dan password
    const [credential, setCredential] = useState ({
        email:'',
        password:''
    })

    
    // function to handle input change
    const inputChangeCredential = (event) => {
        setCredential({...credential,[event.target.name]:event.target.value})
    }

    // configurasi untuk axios
    const axiosConfig = {
        onDownloadProgress: (event) => {
            // handleOpenBd()
        }
    }

    // Function to handle submit event
    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:8080/api/auth/signin',
        credential,
        axiosConfig)
        .then(response => {
            console.log(response)
            // setResponseData(setResponeDataFunction(response.data.email,response.data.token,response.data.roles,response.data.id))
            // handleCloseBd()
        })
        .catch(error => {
            
            console.log(error)
            if (error.response.status == 401){
                setMessageSb(error.response.data.message)
                setOpenSb(true)
            }
            
        });

        console.log(credential.email)
    }



    return(
        <>
            <Container component="form" onSubmit={handleSubmit} maxWidth="xs" sx={{boxShadow:3, pl:20, pr:20, pt:2, pb:4, mt:10}}>

                <Typography sx={{fontSize:25}}>
                    Gansys
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField fullWidth 
                    name="email" 
                    id="email" 
                    label="email" 
                    variant="standard"
                    onChange={inputChangeCredential} />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mt:2}}>
                    <Key sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField fullWidth 
                    name="password" 
                    id="password" 
                    label="password" 
                    variant="standard"
                    type="password"
                    onChange={inputChangeCredential} />
                </Box>

                <Box justifyContent="center" sx={{ display: 'flex', alignItems: 'flex-end', mt:2}}>
                    <IconButton type="" aria-label="fingerprint" color="success" sx={{mt:2}}>
                        <Fingerprint />
                    </IconButton>
                </Box>
                
            </Container>

            <Snackbar
                open={openSb}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="error">{messageSb}</Alert>
            </Snackbar>
        </>
    )
}

export default Login