import { useTheme } from "@emotion/react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { tokens } from "../../theme";


export default function CreatePage() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

     // SUBMIT
     const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Form fields
        const email = data.get('email');
        const password = data.get('password');
        const displayName = data.get('displayName');

        
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="displayName"
                            label="Display Name"
                            id="displayName"
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
                            id="description"
                            name="description"
                            label="Descripción"
                            multiline
                            rows={4}
                            defaultValue="En este viaje..."
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
                    
                    </Box>
                </Box>
            </Grid>
        </main>
    )
}
