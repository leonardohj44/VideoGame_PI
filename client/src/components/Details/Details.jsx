import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { resetDetails } from '../../action';
import './Details.css';


export default function Details() {
    
    const dispatch = useDispatch()
    const history = useHistory()
  
    
    let resp = useSelector(state => state.detail) 

    function handleBack(e){
        e.preventDefault()
        dispatch(resetDetails())
        history.push('/home')
    }
    // console.log(props, '------------------ console log de props')

        return (
            <div >{
                resp && resp.platforms && resp.genres ? (
                    <div className="recaja">
                        <div>
                        <button className="backDetails"onClick={ (e) => handleBack(e)}>Back</button>

                        </div>
                        <h2 className="h3_details">Name : {resp.name}</h2>
                        
                        <img className="image" src={resp.img} alt="Not found Img" />
                        
                    
                        <p className="p">Rating: {resp.rating}</p>
                        <p className="p">Genre: {resp.genres !== undefined ?resp.genres.map(g => g.name + (" - ")): "Empty"}</p>
                      
                        <p className='conteinDesc'>Description:{resp.description}</p>
                      
                        <p className="p">Released: {resp.released}</p>
                        {
                             typeof( resp.id) === "string" ?
                             <p className="p">Platforms: {resp.platforms !== undefined ?resp.platforms.map(p => p.split(" ").join(" - ")): "empty"}</p> :
                            <p className="p">Platforms: {resp.platforms !== undefined ?resp.platforms.map(p => p.name + (" - ")): "empty"}</p>
                        }
                   
                    </div>
                    ) : <h1>cargando....</h1>
            
                
            }</div>
        )



}
