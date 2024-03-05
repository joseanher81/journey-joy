import { TripsBlockProps } from "../../../../interfaces";
import { Box, Container, Typography } from "@mui/material";
import TripsList from "./TripsList";

const TripsBlock = (props: TripsBlockProps) => {
  const {user, title, future, trips} = props;

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
          {(future && trips) &&
            (<>¡Hola, {user.displayName}! Aquí están todos tus viajes en un solo lugar, listos para ser explorados. Disfruta de la libertad de planificar, soñar y descubrir nuevos destinos. 
            Tu próxima aventura te espera. ¡Empieza a crear recuerdos inolvidables ahora!</>)
          }
          {(!future && trips) &&
            (<>{user.displayName}, estos son los viajes que ha yas disfrutado. ¡Recuerda todos los grandes momentos!</>)
          }
          {!trips && 
            (<>Aún no tienes ningún viaje a la vista. ¿A qué esperas para crear tu primera aventura?</>)
          }
          </Typography>

        </Container>
      </Box>
      {/*  End Hero unit */}

      {trips && <TripsList trips={trips}/>}
    </>
  )
}

export default TripsBlock;
