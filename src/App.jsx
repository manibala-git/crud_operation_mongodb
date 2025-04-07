import { useEffect, useState } from 'react'
import './App.css'
import { addMovies, deleteMovies, getMovies, updateMovies } from '../server/api'
function App() {
  const [addSuccessful,setAddSuccessful] = useState("")
  const [title,setTitle] = useState("")
  const [movies,setMovies] = useState([])
  const [desc,setDesc] = useState("")
  const [editID,setEditId] = useState(null)
  const [btnText,editBtnText] = useState(false);
useEffect(()=>{
  fetchMovie();
},[])
useEffect(() => {
  if (addSuccessful) {
    const timer = setTimeout(() => setAddSuccessful(""), 3000);
    return () => clearTimeout(timer);
  }
}, [addSuccessful]);

  const fetchMovie = async()=>{
    try {
     const res = await getMovies()
     setMovies(res.data.reverse()
    );     
    } catch (error) {
      console.error("Error in fetch: ",error);
    }
  }
  const handleMovie = async ()=>{
    if (!title.trim() || !desc.trim()) {
      setAddSuccessful("Please enter both title and description");
      return;
    }
    
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


  const removeData = async(id)=>{
    try {
      await deleteMovies(id);
      fetchMovie();
      setAddSuccessful("Movie Deleted Successfully")
    } catch (error) {
      console.error(error.message);
    }
  }
  const handleEdit = (movie)=>{
    setTitle(movie.title);
    setDesc(movie.desc);
    setEditId(movie._id);
    editBtnText(true);
  }
    const updateData = async()=>{
    try {
      await updateMovies(editID,{title,desc});
      setAddSuccessful("Movie Updated Successfully");
      setTitle("");
      setDesc("");
      editBtnText(false);
      fetchMovie();
    } catch (error) {
      setAddSuccessful("Error in updation")
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
       <button onClick={btnText? updateData: handleMovie}>{btnText? "Update" : "Add"}</button>
        </div>
        
        <p>{addSuccessful}</p>
        <h3>Movies</h3>
        <ul className='list'>
          {movies.map((movie)=>(
            <li key={movie._id}>
          <p><strong>{movie.title}</strong> -- {movie.desc}</p> 
              <button className='btnedit' onClick={()=>handleEdit(movie)} >Edit</button>
              <button className='btndelete' onClick={()=>removeData(movie._id)} >Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
