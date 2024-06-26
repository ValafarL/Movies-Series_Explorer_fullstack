import axios from "axios"
const KEY = process.env.REACT_APP_API_KEY

export const getAllMedia = async (setUserMediaList, token)=>{
    try {
      const response = await axios.get(`http://localhost:5000/api/media`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      )
      const mediaList = response.data
      setUserMediaList(mediaList)
    } catch (error) {
      console.log(error)
    }
  }

  async function getMedia(url){
    try {
      const {data} = await axios.get(url)
      return data
    } catch (error) {
      console.log(error)
    }
  }

export const loadMedia = async (userMediaList, setMylist) => {
  const promisesMyList = userMediaList.map(async (media) => {
      if(media.isAddToMyList === true){
        try {
          const mediaTMDB = await getMedia(`https://api.themoviedb.org/3/${media.typeMovieOrTv}/${media.media_TMDB_ID}?api_key=${KEY}`);
          return {
            ...mediaTMDB,
            type:media.typeMovieOrTv
          };
        } catch (error) {
          console.log(error)
        }
      }
    });
    const myList = await Promise.all(promisesMyList);
    const validMyList = myList.filter(item => item !== undefined);
    setMylist(validMyList)
  };

  export const getFavorites = async(userMediaList, setFavorites) => {
    const promisesMyList = userMediaList.map(async (media) => {
        if(media.isAddToFavorites === true){
          try {
            const mediaTMDB = await getMedia(`https://api.themoviedb.org/3/${media.typeMovieOrTv}/${media.media_TMDB_ID}?api_key=${KEY}`);
            return {
              ...mediaTMDB,
              type:media.typeMovieOrTv
            };
          } catch (error) {
            console.log(error)
          }
        }
      });
      const myList = await Promise.all(promisesMyList);
      const validMyList = myList.filter(item => item !== undefined);
      setFavorites(validMyList)
    };