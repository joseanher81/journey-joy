
const accessKey = 'xegX5EHunCBgMPECfTRcPZls4n-gUyymqpQG5CGZGlg';


export const loadPlacePicture = async(place) => {

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${place}&client_id=${accessKey}`);
        
        
        if (!response.ok) {
          throw new Error('Unsplash API error');
        }
    
        const data = await response.json();
        const photo = data.results[0]; // First image from results
        const photoUrl = photo.urls.regular; // Photo url

        return photoUrl;
    } catch (error) {
        console.error(error);
    }
}

