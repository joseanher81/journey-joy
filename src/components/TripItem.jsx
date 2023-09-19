import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FmdGoodOutlined, AccessTimeOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import { formatDistanceToNow, differenceInDays  } from 'date-fns';
import esLocale from 'date-fns/esm/locale/es';


export default function TripItem({trip}) {

    const formattedTimeDistance = formatDistanceToNow(trip.startDate.toDate(), {
        addSuffix: true,
        locale: esLocale
      });
    
    const upperCaseTimeDistance = formattedTimeDistance.charAt(0).toUpperCase() + formattedTimeDistance.slice(1);

    const travelDuration = differenceInDays(trip.endDate.toDate(), trip.startDate.toDate());
  

  return (
    <Grid item xs={12} sm={6} md={4}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
            component="div"
            sx={{
                // 16:9
                pt: '56.25%',
            }}
            image="https://source.unsplash.com/random?wallpapers"
            />
            <CardContent sx={{ flexGrow: 1 }}>

                <Typography gutterBottom variant="h4" component="h2">
                    {trip.title}
                </Typography>

                <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <FmdGoodOutlined color="secondary" fontSize="small" sx={{ marginRight: '10px' }}/> {trip.place}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarMonthOutlined color="secondary" fontSize="small" sx={{ marginRight: '10px' }} /> {upperCaseTimeDistance}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeOutlined color="secondary" fontSize="small" sx={{ marginRight: '10px' }} /> {travelDuration} {travelDuration > 1 ? 'días' : 'día'}
                </Typography>

                <Typography sx={{ marginTop: '10px'}}>
                    {trip.description}
                </Typography>
                
            </CardContent>
        </Card>
    </Grid>
  )
}
