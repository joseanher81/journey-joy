import { Container, Grid } from "@mui/material";
import TripItem from "./TripItem";



export default function TripsList({trips}) {

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
            {trips.map((trip) => (
                <TripItem trip={trip} key={trip.id}/>
            ))}
            </Grid>
        </Container>
  )
}
