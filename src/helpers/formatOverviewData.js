

/** This method recieves a list of trips and returns a map
of visited countries and times visited
**/
export const calculateCountryVisits = (trips) => {
    const counter = {};
  
    // Iterate through each trip in the array
    trips.forEach((trip) => {
      const countryISO = trip.ISO;
  
      // If the country already exists in the counter, increase the counter by 1
      if (counter[countryISO]) {
        counter[countryISO] += 1;
      } else {
        // If the country does not exist in the counter, initialize the counter to 1
        counter[countryISO] = 1;
      }
    });
  
    // Convert the counter object into an array of key-value objects.
    const results = Object.keys(counter).map((countryISO) => ({
        id: countryISO,
        value: counter[countryISO],
      }));
  
    return results;

}

/** This method recieves a list of trips and returns
 * the name of the most visited country
**/
export const calculateMostVisitedCountry = (trips) => {
  const countryCounter = {};

  // Iterate through each trip in the array
  trips.forEach((trip) => {
    const country = trip.country;

    // If the country already exists in the counter, increment the count by 1
    if (countryCounter[country]) {
      countryCounter[country]++;
    } else {
      // If the country doesn't exist in the counter, initialize the count to 1
      countryCounter[country] = 1;
    }
  });

  // Convert the counter object into an array of key-value pairs
  const countryCounts = Object.entries(countryCounter);

  // Sort the array in descending order based on the number of visits
  countryCounts.sort((a, b) => b[1] - a[1]);

  // The most visited country will be in the first position of the array
  const mostVisitedCountry = countryCounts[0];

  return mostVisitedCountry[0];

}

/** This method recieves a list of trips and returns
 * the number of different countries visited
**/
export const calculateNumberOfVisitedCountries = (trips) => {
    // Create an empty Set to store unique ISO codes
    const uniqueCountries = new Set();

    // Loop through the travels array and add each ISO code to the Set
    trips.forEach((trip) => {
      if (trip.country) {
        uniqueCountries.add(trip.country);
      }
    });
  
    // Return the size of the Set, which is the number of unique countries visited
    return uniqueCountries.size;
}

/** This method recieves a list of trips and returns
 * the number of traveled days
**/
export const calculateDaysTraveled = (trips) => {
  // Initialize a variable to store the total travel duration
  let totalDuration = 0;

  // Loop through the travel objects and add their travel durations to the total
  trips.forEach((trip) => {
    if (trip.travelDuration) {
      totalDuration += trip.travelDuration;
    }
  });

  return totalDuration;
}

/** This method recieves a list of trips and returns
 * an array of unique photo urls of companions
**/
export const getUniqueCompanions = (trips) => {
  // Initialize an empty Set to store unique companions
  const uniqueCompanions = new Set();

  // Loop through the travel objects
  trips.forEach((trip) => {
    if (trip.companions && Array.isArray(trip.companions)) {
      // If companions field is present and it's an array
      trip.companions.forEach((companion) => {
        if (companion.photoURL) {
          // Create an object with photoURL and displayName
          const uniqueCompanion = {
            id: companion.id,
            photoURL: companion.photoURL,
            displayName: companion.displayName || '', // If displayName is missing, use an empty string
          };
          uniqueCompanions.add(JSON.stringify(uniqueCompanion)); // Convert to JSON to ensure uniqueness
        }
      });
    }
  });

  // Convert the Set back to an array, parse JSON, and return it
  return Array.from(uniqueCompanions).map((companion) => JSON.parse(companion));
}

