import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";


export default function TripPage() {

    const { id } = useParams();
    const { document, error } = useDocument('trips', id);


    // TODO: Deal with error

    // Loading message
    if(!document) return <Typography>Loading...</Typography>

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
                        {document.title}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        {document.description}
                    </Typography>
                </Container>
            </Box>


        </main>
  )
}
