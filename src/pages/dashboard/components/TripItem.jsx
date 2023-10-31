import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FmdGoodOutlined, AccessTimeOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import { formatDistanceToNow, differenceInDays  } from 'date-fns';
import esLocale from 'date-fns/esm/locale/es';
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";


export default function TripItem({trip}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    const formattedTimeDistance = formatDistanceToNow(trip.startDate.toDate(), {
        addSuffix: true,
        locale: esLocale
      });
    
    const upperCaseTimeDistance = formattedTimeDistance.charAt(0).toUpperCase() + formattedTimeDistance.slice(1);
  

  return (
    <Grid item xs={12} sm={6} md={4} onClick={() => navigate(`/trips/${trip.id}`)}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.primary[400], cursor: 'pointer' }}
        >
            <CardMedia
            component="div"
            sx={{
                // 16:9
                pt: '56.25%',
            }}
            image={trip.pictureUrl}
            />
            <CardContent sx={{ flexGrow: 1 }}>

                <Typography gutterBottom variant="h4" component="h2" fontWeight="bold">
                    {trip.title}
                </Typography>

                <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <FmdGoodOutlined color="secondary" fontSize="small" sx={{ marginRight: '10px' }}/> {trip.place}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarMonthOutlined color="secondary" fontSize="small" sx={{ marginRight: '10px' }} /> {upperCaseTimeDistance}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeOutlined color="secondary" fontSize="small" sx={{ marginRight: '10px' }} /> {trip.travelDuration} {trip.travelDuration > 1 ? 'días' : 'día'}
                </Typography>

                <Typography sx={{ marginTop: '10px'}} variant="body2" component="div">
                    {trip.description}
                </Typography>
                
            </CardContent>
        </Card>
    </Grid>
  )
}
