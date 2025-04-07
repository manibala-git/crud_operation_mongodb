import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND;



export const getMovies = async()=>{
    return await axios.get(API_URL);
};

export const addMovies = async (movie) => {
  return await axios.post(API_URL, movie);
};

export const deleteMovies = async(id)=>{
  return await axios.delete(`${API_URL}${id}`);
}

export const updateMovies = async(id,updateMovies)=>{
  return await axios.put(`${API_URL}${id}`,updateMovies);
}