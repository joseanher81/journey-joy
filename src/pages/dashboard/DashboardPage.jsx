import { Box, Button, Container, Stack, Typography } from "@mui/material";
import TripsList from "../../components/TripsList";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";


export default function DashboardPage() {
  const {user} = useAuthContext();
  const {documents,error} = useCollection('trips', null, 'startDate');


  return (
    <main>
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
            Mis viajes
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
          ¡Hola, {user.displayName}! Aquí están todos tus viajes en un solo lugar, listos para ser explorados. Disfruta de la libertad de planificar, soñar y descubrir nuevos destinos. 
          Tu próxima aventura te espera. ¡Empieza a crear recuerdos inolvidables ahora! 
          </Typography>

        </Container>
      </Box>
      {/*  End Hero unit */}

      {documents && <TripsList trips={documents}/>}
    </main>
  )
}
