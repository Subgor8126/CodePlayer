import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
    params: {
      maxResults: 50
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options)
    // Maybe the axios.get() gets an object with various parameters
    // inside and there is must be a key called "data" in there.
    // Because remember, in array destructuring, assigning variables to values is
    // based on the position of the elements in the array, but in object
    // destructuring, it is based on the the name of the variable which may
    // correspond to a key in the object. Which means that maybe there is a value
    // in that object that we want, which has the key "data", hence we write it as
    // { data } so that we access the correct key, based on this variable name (which is "data").
    // Basically, the variable name and the key name should be the same.
    // We can actually use a different variable name, but we have to reference the key name first.
    // For example, if we have to call the data value by the name 'videoData', we would have to type
    // { data: videoData }
    // Now, we can refer to the data variable as videoData. 
    return data;
}