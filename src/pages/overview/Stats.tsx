import { useTheme } from "@mui/material/styles"; 
import { StatsProps } from '../../../interfaces';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';

const Stats = (props: StatsProps) => {
    const theme = useTheme();
    const {countriesVisited, daysTraveled, mostVisitedCountry, numberOfTrips, companions} = props;
    const {user} = useAuthContext();

    return (
        <>
            {/* Upper row */}
            <Grid container spacing={2}  style={{  backgroundColor: theme.palette.background.paper, marginTop: '0px' }}>
                {/* First column */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} style={{ padding: '5vh', textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h2">Número de viajes</Typography>
                        <Typography variant="h1"  mt={'30px'} color="secondary" fontWeight="bold">{numberOfTrips}</Typography>
                    </Paper>
                </Grid>

                {/* Second column */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} style={{ padding: '5vh', textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h2">País más visitado</Typography>
                        <Typography variant="h1"  mt={'30px'} color="secondary" fontWeight="bold">{mostVisitedCountry}</Typography>
                    </Paper>
                </Grid>

                {/* Third Column */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} style={{ padding: '5vh', textAlign: 'center', backgroundColor: theme.palette.background.paper}}>
                        <Typography variant="h2">Paises visitados</Typography>
                        <Typography variant="h1" mt={'30px'} color="secondary" fontWeight="bold">{countriesVisited}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Lower row */}
            <Grid container spacing={2} style={{  backgroundColor: theme.palette.background.paper }} >
                {/* First Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={0} style={{ padding: '5vh', textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h2">Días viajados</Typography>
                        <Typography variant="h1" mt={'30px'} color="secondary" fontWeight="bold">{daysTraveled}</Typography>
                    </Paper>
                </Grid>

                {/* Second column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={0} style={{ padding: '5vh', textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h2">Acompañantes</Typography>
                        {!companions && <Typography variant="h1"  mt={'30px'} color="secondary" fontWeight="bold">You traveled on your own!</Typography>}

                        {companions && (
                            <Grid container spacing={2} sx={{marginTop: '0', justifyContent: 'center' }}>
                                {companions.map((companion, index) => (
                                    user.uid !== companion.id && (
                                        <Grid item xs={2} key={index}>
                                            <Grid container direction="column" alignItems="center">
                                                <Avatar alt={companion.displayName} src={companion.photoURL} sx={{ width: 80, height: 80 }} />
                                                <Typography variant="subtitle1" align="center">
                                                    {companion.displayName}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    )
                                ))}
                            </Grid>
                        )}

                    </Paper>
                </Grid>

            </Grid>
        </>
    )
}

export default Stats;