import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import DaysBoard from "./Board/DaysBoard";
import Head from "./Head";
import Comments from "./Comments/Comments";
import Companions from "./Companions";
import Documents from "./Documents/Documents";
import { useTheme } from "@emotion/react";


export default function TripPage() {
    const theme = useTheme();
    const { id } = useParams();
    const { document: trip, error } = useDocument('trips', id);


    // TODO: Deal with error

    // Loading message
    if(!trip) return <Typography>Loading...</Typography>

    return (
        <main style={{'background-color': theme.palette.background}}> 
            {/* HEAD SECTION */}
            <Head trip={trip}/>

            {/* MIDDLE SECTION */}
            <Grid container spacing={3}>

                <Grid item xs={9}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={0}>
                                {/* BOARD */}
                                <DaysBoard trip={trip} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop: '50px'}}>
                            <Paper elevation={0}>
                                {/* TRIP DPOCUMENTS */}
                                <Documents trip={trip} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop: '50px'}}>
                            <Paper elevation={0}>
                                {/* COMPANIONS */}
                                <Companions trip={trip} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={3}
                    paddingLeft='20px'
                    paddingRight='20px'
                >
                    <Paper elevation={0}>
                        {/* COMMENTS */}
                       <Comments trip={trip}/>
                    </Paper>
                </Grid>
            </Grid>


        </main>
  )
}
