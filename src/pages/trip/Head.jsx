import { Box, Grid, Paper, Typography } from "@mui/material";


export default function Head({trip}) {
  return (
    <Box
        sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
        }}
    >

        <Paper
            elevation={0}
            sx={{
                backgroundImage: `url("${trip.pictureUrl}")`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px', 
            }}
            >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: '100%' }}
            >
                <Grid item 
                    sx={{
                        padding: '30px',
                        background: 'white',
                        opacity: 0.9,
                        borderRadius: '5px',
                    }}
                >
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
                </Grid>
            </Grid>
        </Paper>
    </Box>
  )
}
