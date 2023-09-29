
const API_KEY = 'c766b85992434d6fbf25169259702261';


export const useGeolocation = () => {

    const findISObyPlace = async(place) => {
        try {

            const res = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${API_KEY}&no_annotations=1`;
        
            
            const response = await fetch(res);
            const data = await response.json();
        
            if (data.results.length > 0) {
              const result = data.results[0];
              const countryCode = result.components['ISO_3166-1_alpha-3']; // Código ISO del país
              return countryCode;
            } else {
              throw new Error('No se pudo obtener información de ubicación.');
            }
          } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            throw error;
          }
    } 

    return {findISObyPlace}
}
