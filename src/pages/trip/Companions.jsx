import { Avatar, Box, Grid, Typography } from "@mui/material";


export default function Companions({trip}) {
   
    return (
  
        <Box>
            <Typography variant="h2" sx={{marginLeft: '50px'}}>Companions</Typography>

            <Grid container spacing={2} sx={{margin: '0 40px 40px'}}>
            {trip.companions.map((companion, index) => (
                <Grid item xs={1} key={index}>
                    <Grid container direction="column" alignItems="center">
                        <Avatar alt={companion.displayName} src={companion.photoURL} sx={{ width: 100, height: 100 }} />
                        <Typography variant="subtitle1" align="center">
                            {companion.displayName}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
            </Grid>
        </Box>
  )
}
