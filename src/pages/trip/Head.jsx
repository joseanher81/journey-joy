import { useTheme } from "@emotion/react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { tokens } from "../../theme";


export default function Head({trip}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

  return (
    <Box
        sx={{
            bgcolor: 'background.paper',
            pb: 6,
        }}
    >

        <Paper
            elevation={0}
            sx={{
                backgroundImage: `url("${trip.pictureUrl}")`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '450px', 
                borderRadius: 0
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
                        color="#212121"
                        gutterBottom
                    >
                        {trip.title}
                    </Typography>
                    <Typography variant="h5" align="center" color="#7D7D7D" paragraph>
                        {trip.description}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    </Box>
  )
}
