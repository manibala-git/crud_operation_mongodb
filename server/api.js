import axios from "axios";
const API_URL = "https://api-practice-qb70.onrender.com/movies/";


export const getMovies = async()=>{
    return await axios.get(API_URL);
};

export const addMovies = async (movie) => {
  return await axios.post(API_URL, movie);
};
