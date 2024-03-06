import { useTheme } from "@mui/material/styles"; 
import { Box } from "@mui/material";
import GeoMap from "./map/GeoMap";
import { useTripsContext } from "../../hooks/useTripsContext";
import Stats from "./Stats";
import { useOverviewData } from "../../hooks/useOverviewData";


const OverviewPage = () => {
    const theme = useTheme();
    const {tripsList} = useTripsContext();
    const {mapData, countriesVisited, daysTraveled, mostVisitedCountry, numberOfTrips, companions} = useOverviewData(tripsList);


    return (
        <main style={{'backgroundColor': theme.palette.background.default}}> 

            <Box
                height="75vh"
                borderBottom={`1px solid rgba(0, 0, 0, 0.12)`}
            >
                <GeoMap mapData={mapData}/>
            </Box>
            <Box
                height="75vh"
            >
                <Stats 
                    countriesVisited={countriesVisited}
                    daysTraveled={daysTraveled}
                    mostVisitedCountry={mostVisitedCountry}
                    numberOfTrips={numberOfTrips}
                    companions={companions}
                />
            </Box>
        </main>
    )
}

export default OverviewPage;
