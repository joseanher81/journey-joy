import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import DaysBoard from "./Board/DaysBoard";


export default function TripPage() {

    const { id } = useParams();
    const { document: trip, error } = useDocument('trips', id);


    // TODO: Deal with error

    // Loading message
    if(!trip) return <Typography>Loading...</Typography>
    if(trip) console.log('TRIP', JSON.stringify(trip))

    return (
        <main>

            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm" >
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        {trip.title}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        {trip.description}
                    </Typography>
                </Container>
            </Box>

            {/* BOARD */}
            <DaysBoard trip={trip} />
        </main>
  )
}
