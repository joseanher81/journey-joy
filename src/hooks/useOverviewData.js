import { calculateCountryVisits, calculateMostVisitedCountry, calculateNumberOfVisitedCountries, calculateDaysTraveled, getUniqueCompanions } from "../helpers/formatOverviewData"

/** This hook calculates the data to display
 * in the Overview Page
**/
export const useOverviewData = (trips) => {

    const mapData = calculateCountryVisits(trips);
    
    const numberOfTrips = trips.length;

    const mostVisitedCountry = calculateMostVisitedCountry(trips);

    const countriesVisited = calculateNumberOfVisitedCountries(trips)

    const daysTraveled = calculateDaysTraveled(trips);

    const companions = getUniqueCompanions(trips);

    return {mapData, numberOfTrips, mostVisitedCountry, countriesVisited, daysTraveled, companions}

}