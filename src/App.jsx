import { useEffect, useState } from 'react'
import './App.css'
import { addMovies, getMovies } from '../server/api'
function App() {
  const [addSuccessful,setAddSuccessful] = useState("")
  const [title,setTitle] = useState("")
  const [movies,setMovies] = useState([])
  const [desc,setDesc] = useState("")
useEffect(()=>{
  fetchMovie();
},[])

  const fetchMovie = async()=>{
    try {
     const res = await getMovies()
     setMovies(res.data);     
    } catch (error) {
      console.error("Error in fetch: ",error);
    }
  }
  const handleMovie = async ()=>{
   try {
    await addMovies({title,desc})
    setAddSuccessful("Movie Added Successfully");
    setTitle("");
    setDesc("");
    fetchMovie();
   } catch (error) {
    setAddSuccessful("Error in Adding movie");
    console.error(error.message);
   }
  }
  
  return (
    <>
      <div className="container">
        <h2>Movies List</h2>
        <div className="box">
        <div className="input">
          <label htmlFor="Title">Title:</label>
          <input type="text"
           name="title" 
           className='title'
            placeholder='Enter the title' 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
        </div>
        <div className="input">
          <label htmlFor="desc">Description:</label>
          <input type="text"
           name="desc"
            id="desc"
             className='desc'
              placeholder='Describe about the movie' 
              value={desc}
            onChange={(e)=>setDesc(e.target.value)}/>
        </div>
        </div>
       <div className="btn">
        <button onClick={handleMovie}>Add</button>
        </div>
        
        <p>{addSuccessful}</p>
        <h3>Movies</h3>
        <ul className='list'>
          {movies.map((movie)=>(
            <li key={movie._id}>
          <p><strong>{movie.title}</strong> -- {movie.desc}</p> 
              <button>Edit</button>
              {/* <button>Delete</button> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
