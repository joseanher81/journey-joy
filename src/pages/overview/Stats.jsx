import { useTheme } from '@emotion/react';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { tokens } from '../../theme';

export default function Stats({countriesVisited, daysTraveled, mostVisitedCountry, numberOfTrips, companions}) {


  return (
    <>
        {/* Upper row */}
        <Grid container spacing={2}>
            {/* First column */}
            <Grid item xs={12} md={4}>
                <Paper elevation={0} style={{ padding: '10vh', textAlign: 'center' }}>
                    <Typography variant="h2">Number of trips</Typography>
                    <Typography variant="h1"  mt={'30px'} color="secondary" fontWeight="bold">{numberOfTrips}</Typography>
                </Paper>
            </Grid>

            {/* Second column */}
            <Grid item xs={12} md={4}>
                <Paper elevation={0} style={{ padding: '10vh', textAlign: 'center' }}>
                    <Typography variant="h2">Most visited country</Typography>
                    <Typography variant="h1"  mt={'30px'} color="secondary" fontWeight="bold">{mostVisitedCountry}</Typography>
                </Paper>
            </Grid>

            {/* Third Column */}
            <Grid item xs={12} md={4}>
                <Paper elevation={0} style={{ padding: '10vh', textAlign: 'center' }}>
                    <Typography variant="h2">Countries visited</Typography>
                    <Typography variant="h1" mt={'30px'} color="secondary" fontWeight="bold">{countriesVisited}</Typography>
                </Paper>
            </Grid>
        </Grid>

        {/* Lower row */}
        <Grid container spacing={2}>
            {/* First Column */}
            <Grid item xs={12} md={6}>
                <Paper elevation={0} style={{ padding: '10vh', textAlign: 'center' }}>
                    <Typography variant="h2">Traveling days</Typography>
                    <Typography variant="h1" mt={'30px'} color="secondary" fontWeight="bold">{daysTraveled}</Typography>
                </Paper>
            </Grid>

            {/* Second column */}
            <Grid item xs={12} md={6}>
                <Paper elevation={0} style={{ padding: '10vh', textAlign: 'center' }}>
                    <Typography variant="h2">Companions</Typography>
                    {!companions && <Typography variant="h1"  mt={'30px'} color="secondary" fontWeight="bold">You traveled on your own!</Typography>}

                    {companions && (
                        <Grid container spacing={2} sx={{marginTop: '10px', justifyContent: 'center'}} >
                            {companions.map((companion, index) => (
                                <Grid item xs={2} key={index}>
                                    <Grid container direction="column" alignItems="center">
                                        <Avatar alt={companion.displayName} src={companion.photoURL} sx={{ width: 100, height: 100 }} />
                                        <Typography variant="subtitle1" align="center">
                                            {companion.displayName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                </Paper>
            </Grid>

        </Grid>
    </>
  )
}
