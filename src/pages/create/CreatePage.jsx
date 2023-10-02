import { useTheme } from "@emotion/react";
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { timestamp } from '../../firebase/config';
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { loadPlacePicture } from "../../helpers/loadPlacePicture";
import { differenceInDays } from "date-fns";
import { createActivityDays } from "../../helpers/formatActivities";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {useSnackBarContext} from '../../hooks/useSnackBarContext';

export default function CreatePage() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const { addDocument, response } = useFirestore('trips');
    const {documents: companionsOptions, error} = useCollection('users');
    const { findISObyPlace } = useGeolocation();
    const [formError, setFormError] = useState(null);
    const {showSnack} = useSnackBarContext();

    // Dates state
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(()=> {
        console.log('ENDDATE', endDate)
    }, [endDate])
    // Companions selection
    const [selectedCompanions, setSelectedCompanions] = useState([]);

    const handleSelectCompanionsChange = (event, newValue) => {
      setSelectedCompanions(newValue);
    };

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

        // Get image for place
        const pictureUrl = await loadPlacePicture(place);
       
        // Calc travel days
        const travelDuration = differenceInDays(new Date(endDate), new Date(startDate)) + 1; // Need to add 1 to include starting and ending day
        
        // Get country ISO (needed for map representation)
        const ISO = await findISObyPlace(place);

        // Document to be saved
        const trip = {
            title,
            place,
            pictureUrl,
            description,
            travelDuration,
            ISO,
            createdBy: user.uid,
            companions: selectedCompanions.map( companion => companion.id),
            days: createActivityDays(travelDuration),
            startDate: timestamp.fromDate(new Date(startDate)),
            endDate: timestamp.fromDate(new Date(endDate))
        }

        // Save project in Firestore
        await addDocument(trip);
        
        if(!response.error) {
            navigate('/');
            showSnack('New trip created!');
        }
        
    };
    // END SUBMIT

    // Not continue until companions list is loaded
    if(!companionsOptions) return;

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
        
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: "40%" }}>
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
                    

                        <Box sx={{display: "flex", justifyContent: "space-between"}}>

                            <DesktopDatePicker 
                                required
                                label="Fecha de inicio"
                                format="DD/MM/YYYY"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                sx={{
                                    '& label.Mui-focused': {
                                    color: colors.greenAccent[400],
                                    },
                                    '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.greenAccent[400],
                                    },
                                    },
                                    'marginTop': '16px',
                                    'marginBottom': '8px'
                                }}
                            />      

                            <DesktopDatePicker 
                                required
                                label="Fecha de finalización"
                                format="DD/MM/YYYY"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                sx={{
                                    '& label.Mui-focused': {
                                    color: colors.greenAccent[400],
                                    },
                                    '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.greenAccent[400],
                                    },
                                    },
                                    'marginTop': '16px',
                                    'marginBottom': '8px'
                                }}
                            />
                        </Box>           
                       
                        

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

                        <Autocomplete
                            multiple
                            id="companions"
                            name="companions"
                            options={companionsOptions.filter(c => c.id !== user.uid)}
                            getOptionLabel={(companion) => companion.displayName} 
                            value={selectedCompanions}
                            onChange={handleSelectCompanionsChange}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                variant="outlined"
                                label="Selecciona compañeros"
                                placeholder="Selecciona compañeros"
                                />
                            )}
                            sx={{
                                    '& label.Mui-focused': {
                                    color: colors.greenAccent[400],
                                    },
                                    '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.greenAccent[400],
                                    },
                                    },
                                    'marginTop': '16px',
                                    'marginBottom': '8px'
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
