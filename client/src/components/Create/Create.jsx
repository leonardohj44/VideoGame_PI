import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, getGenres } from '../../action'
import {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Styles from './Create.module.css'

function validate(form){
    let error ={};
    if(!form.name){
        error.name = "name is required";
    } else if (!form.description){
        error.description = "description is required";
    } else if (!form.released){
        error.released = "released is required";
    } else if (!form.platforms){
        error.platforms = "description is required";
    }
    return error;
}

export default function Create() {
    const dispatch = useDispatch();
    const allPlatforms=['PlayStation', 'Pc','Xbox','Nintendo','SEGA','Android','3DO','Atari','Linux','iOS','Commodore','Apple Macintosh'];
    const allGenres= useSelector((state) => state.stateGenres);
    const [created, setCreated] = useState(false)
    const [error, setError] = useState({})
    const [form, setForm] = useState({
        name:"",
        description:"",
        released:"",
        genres:[],
        platforms:[],
        img:"",
        rating:""
        
    })

    const history= useHistory() 
 
    function handleChange(e){
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
            
        })
        setError(validate({
            ...form,
            [e.target.name]: e.target.value,
            [e.target.description]: e.target.value,
            [e.target.released]: e.target.value
        }))
        
    }
    function handleGenre(e){
        e.preventDefault()
        setForm({
            ...form,
            genres: [...form.genres, e.target.value]
        })
    }
    function handlePlatforms(e){
        e.preventDefault()
        setForm({
            ...form,
            platforms: [...form.platforms, e.target.value]
            
        })
        setError(validate({
            ...form,
            [e.target.platforms]: e.target.value
        }))
      
    }

    function handleSubmit(e){
        e.preventDefault()
        axios.post('http://localhost:3001/videogame', form)
        .then( r => {

            dispatch(getGames())
            // alert("The Game is created")
            setForm({});
            setCreated(true);
            
        }).catch(e => {
            console.log(e)
        })
    }

    function handleAcept(e){
        e.preventDefault()
        history.push('/home')
    }
 //  console.log(form, "----------- console form")
    return (
        <div className={Styles.caja}>
            {
                !created ?(
                <div > 
                    <h1 className={Styles.titlecre}>CREATE YOUR GAME</h1>
                    <Link to={'/home'}>
                     <button className={Styles.buttonCreate}>H o m e</button>
                    </Link>
                    <div className={Styles.cuadrado}>
                    <form className={Styles.form}>
                        <label className={Styles.label}>Name:</label>
                        <input className={Styles.input}
                            type="text" 
                            name="name"
                            value={form.name}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {error.name &&(
                            <p className={Styles.error}>{error.name}</p>
                        )}
                        <label htmlFor="description" className={Styles.label}>Description:</label>
                        <textarea className={Styles.textArea}
                            name="description" 
                            id="" 
                            cols="30" 
                            rows="7"
                            value={form.description}
                            onChange={(e) => handleChange(e)}
                            required
                        ></textarea>
                        {error.description &&(
                            <p className={Styles.error}>{error.description}</p>
                        )}
        
                        <label htmlFor="Released date:"  className={Styles.label}>Released date:</label>
                        <input className={Styles.input}
                        type="date" 
                        name="released"
                        value={form.released}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                        {error.released &&(
                            <p className={Styles.error}>{error.released}</p>
                        )}
                        <label  className={Styles.label}>Rating:</label>
                        <select onChange={(e) => handleChange(e)}
                            className={Styles.input}
                            name="rating" 
                            id="rating" 
                            value={form.rating}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label  className={Styles.label}>Genres:
                            <select className={Styles.input} onChange={e => handleGenre(e)} name="genres" id="genres" >
                            <option name="genre" value=""> - - - - - - - </option>
                                {
                                    allGenres?.map( g => (
                                        <option value={g.id}>{g.name}</option>
                                        
                                    ))
                                }
                            </select>
                            </label>
                                
                            <label  className={Styles.label}>Platforms: 
                                <select className={Styles.input} onChange={(e) => handlePlatforms(e)} name="platforms" id="platforms"  required>
                                    <option name="platforms" value=""> - - - - - - - </option>
                                    {
                                        allPlatforms.map( p => (
                                            <option value={p}>{p}</option>
                                            
                                            ))
                                        }
                                  
                                </select>
                            </label>
                                {error.platforms &&(
                                     <p className={Styles.error}>{error.platforms}</p>
                                    )}
                            <label htmlFor="image" className={Styles.label}>Image: </label>
                            <input className={Styles.input}
                            type="text"
                            name="img"
                            id="image"
                            onChange={(e) => handleChange(e)}
                            value={form.img}
                            />
                    </form>
                    </div> 
                    <div className={Styles.preButton}>
                        <button onClick={e => handleSubmit(e)} className={Styles.buttonCreate} type="submit">CREATE</button>
                    </div>                   
                </div>
            ) : (
                <div className={Styles.alerthome}>
                <div className={Styles.alert}>
                    <p >
                    Your Video Game has been created succesfull!!!
                    </p>
                    <button onClick={(e) => handleAcept(e)}> Accept</button>
                </div>
                </div>
            )
            }
        </div>
    )
}
