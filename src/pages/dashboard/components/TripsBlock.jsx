import { Box, Container, Typography } from "@mui/material";
import TripsList from "./TripsList";


export default function TripsBlock({user, title, future, trips}) {
  return (
    <>
        {/* Hero unit */}
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
            {title}
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {future && 
            (<>¡Hola, {user.displayName}! Aquí están todos tus viajes en un solo lugar, listos para ser explorados. Disfruta de la libertad de planificar, soñar y descubrir nuevos destinos. 
            Tu próxima aventura te espera. ¡Empieza a crear recuerdos inolvidables ahora!</>)
          }
          {!future && 
            (<>{user.displayName}, estos son los viajes que ha yas disfrutado. ¡Recuerda todos los grandes momentos!</>)
          }

          </Typography>

        </Container>
      </Box>
      {/*  End Hero unit */}

      {trips && <TripsList trips={trips}/>}
    </>
  )
}
