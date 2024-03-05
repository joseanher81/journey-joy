import { Trip, TripsListProps } from "../../../../interfaces";
import { Container, Grid } from "@mui/material";
import TripItem from "./TripItem";

const TripsList = ({trips}: TripsListProps) => {

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
            {trips.map((trip: Trip) => (
                <TripItem trip={trip} key={trip.id}/>
            ))}
            </Grid>
        </Container>
  )
}

export default TripsList;