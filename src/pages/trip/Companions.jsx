import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";


export default function Companions({trip}) {
    const {user} = useAuthContext();
   
    return (
  
        <Box>
            <Typography variant="h2" sx={{marginLeft: '50px'}}>Acompañantes</Typography>

            <Grid container spacing={2} sx={{margin: '0 40px 40px'}}>
            {trip.companions.map((companion, index) => 
                user.uid !== companion.id && 
                (
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
