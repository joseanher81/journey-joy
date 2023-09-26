import { Box, Button, Container, Stack, Typography } from "@mui/material";
import TripsList from "../../components/TripsList";
import { useCollection, useCollectionComplexQuery } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";


export default function DashboardPage({searchQuery, setSearchQuery}) {
  const {user} = useAuthContext();
  const queryConfig = [
    {field: 'createdBy', operator: '==', value: user.uid},
    {field: 'companions', operator: 'array-contains', value: user.uid}
  ];
  const {documents,error} = useCollection('trips', queryConfig, 'startDate');
  const [trips, setTrips] = useState(null);

  // Clean search query on first time (MAYBE THIS COULD BE SOLVED IN A BETTER WAY)
  useEffect(()=> {
    setSearchQuery('');
  }, []);

  // Update trip list according to search on topbar
  useEffect(() => {
    if(documents) {
      let filtered = documents.filter(doc => {
        return doc.title.toLowerCase().includes(searchQuery) || doc.place.toLowerCase().includes(searchQuery)
      });
      setTrips(filtered);
    }
  }, [searchQuery, documents]);



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

      {trips && <TripsList trips={trips}/>}
    </main>
  )
}
