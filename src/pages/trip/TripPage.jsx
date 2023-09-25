import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import DaysBoard from "./Board/DaysBoard";
import Head from "./Head";


export default function TripPage() {

    const { id } = useParams();
    const { document: trip, error } = useDocument('trips', id);


    // TODO: Deal with error

    // Loading message
    if(!trip) return <Typography>Loading...</Typography>
    if(trip) console.log('TRIP', JSON.stringify(trip))

    return (
        <main>
            {/* HEAD SECTION */}
            <Head trip={trip}/>

            {/* MIDDLE SECTION */}
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Paper elevation={3}>
                    <Typography variant="h6">Test</Typography>
                    {/* BOARD */}
                        <DaysBoard trip={trip} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper elevation={3}>
                    {/* COMMENTS */}
                    <Typography variant="h6">Test 2</Typography>
                    </Paper>
                </Grid>
            </Grid>

            
        </main>
  )
}
