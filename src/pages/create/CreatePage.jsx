import { useTheme } from "@emotion/react";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { tokens } from "../../theme";
import { useState } from "react";
import { timestamp } from '../../firebase/config';
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";


export default function CreatePage() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { addDocument, response } = useFirestore('trips');
    const [formError, setFormError] = useState(null);

    // Dates state
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null); // Reset errors

        // Get form data
        const data = new FormData(e.currentTarget);

        // Form fields
        const title = data.get('title');
        const place = data.get('place');
        const description = data.get('description');

        // A few checks
        if(!title) {
            setFormError('Please add a title for your travel');
            return;
        }

        if(!place) {
            setFormError('Please add a place for your travel');
            return;
        }

        if(!title) {
            setFormError('Please add a brief description of your travel');
            return;
        }

        if(!startDate || !endDate) {
            setFormError('Start date and End date must be valid');
            return;
        }

        // Document to be saved
        const trip = {
            title,
            place,
            description,
            startDate: timestamp.fromDate(new Date(startDate)),
            endDate: timestamp.fromDate(new Date(endDate))
        }

        // Save project in Firestore
        await addDocument(trip);
        if(!response.error) navigate('/');

        
    };

    return (
        <main>
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
            >
                <Container maxWidth="sm">
                    <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
                    Nuevo viaje
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    ¡La próxima gran aventura está a punto de comenzar! En esta página, puedes dar forma a tus próximos recuerdos de viaje. 
                    Completa el formulario y crea el viaje de tus sueños. 
                    </Typography>

                </Container>
            </Box>

            {/* Formulario */}
            
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
        
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Título"
                            type="text"
                            name="title"
                            autoFocus
                            sx={{
                                '& label.Mui-focused': {
                                    color: colors.greenAccent[400] ,
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.greenAccent[400],
                                    },
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="place"
                            label="Lugar / Ciudad"
                            type="text"
                            id="place"
                            sx={{
                                '& label.Mui-focused': {
                                    color: colors.greenAccent[400] ,
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.greenAccent[400],
                                    },
                                },
                            }}
                        />
                    


                            <DatePicker
                                required
                                label="Fecha de inicio"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                inputFormat="dd/MM/yyyy"
                                sx={{
                                    '& label.Mui-focused': {
                                    color: colors.greenAccent[400],
                                    },
                                    '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.greenAccent[400],
                                    },
                                    },
                                    'marginTop': '16px'
                                }}
                            />
       
                            <DatePicker
                                required
                                label="Fecha de finalización"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                inputFormat="dd/MM/yyyy"
                                sx={{
                                    '& label.Mui-focused': {
                                    color: colors.greenAccent[400],
                                    },
                                    '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.greenAccent[400],
                                    },
                                    },
                                    'marginTop': '16px'
                                }}
                            /> 
            
                       
                        

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            name="description"
                            label="Descripción"
                            multiline
                            rows={4}
                            sx={{
                                '& label.Mui-focused': {
                                    color: colors.greenAccent[400] ,
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.greenAccent[400],
                                    },
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                        >
                            Crear viaje
                        </Button>
                        
                        {formError && <Typography variant="h5" align="center" color="error" paragraph>{formError}</Typography>}
                        
                    </Box>
                </Box>
            </Grid>
        </main>
    )
}
