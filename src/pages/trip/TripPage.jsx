import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import DaysBoard from "./Board/DaysBoard";
import Head from "./Head";
import Comments from "./Comments/Comments";
import Companions from "./Companions";
import Documents from "./Documents/Documents";
import { useTheme } from "@emotion/react";
import { useTripsContext } from "../../hooks/useTripsContext";
import { useState } from "react";


export default function TripPage() {
    const theme = useTheme();
    const { id } = useParams();
    const {tripsList} = useTripsContext();
    const currentTrip = tripsList?.find(trip => trip.id === id);
    
    // TODO: Deal with errors

    // Loading message
    if(!currentTrip) return <Typography>Loading...</Typography>

    return (
        <main style={{'backgroundColor': theme.palette.background}}> 
            {/* HEAD SECTION */}
            <Head trip={currentTrip}/>

            {/* MIDDLE SECTION */}
            <Grid container spacing={3}>

                <Grid item xs={9}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={0}>
                                {/* BOARD */}
                                <DaysBoard trip={currentTrip} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop: '50px'}}>
                            <Paper elevation={0}>
                                {/* TRIP DPOCUMENTS */}
                                <Documents trip={currentTrip} />
                            </Paper>
                        </Grid>
                        {(currentTrip.companions.length > 0) && 
                            <Grid item xs={12} sx={{marginTop: '50px'}}>
                                <Paper elevation={0}>
                                    {/* COMPANIONS */}
                                    <Companions trip={currentTrip} />
                                </Paper>
                            </Grid>
                        }
                    </Grid>
                </Grid>

                <Grid item xs={3}
                    paddingLeft='20px'
                    paddingRight='20px'
                >
                    <Paper elevation={0}>
                        {/* COMMENTS */}
                       <Comments trip={currentTrip}/>
                    </Paper>
                </Grid>
            </Grid>


        </main>
  )
}
