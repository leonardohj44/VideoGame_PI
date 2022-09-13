import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { getByName } from "../../action";
import Styles from "./SearchBar.module.css"


export default function SearchBar() {
    const dispatch= useDispatch()
    const [name, setName]= useState("")
    

    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)
        
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getByName(name))
        setName("")
        
    }

    return(
        <div className={Styles.search}>
            <form action="">
            <input 
                type="text" 
                placeholder="Search Game" 
                onChange = {(e) => handleInput(e)}
            />
            <button type="Submit" onClick={(e) => handleSubmit(e)} >Search</button>
            </form>
        </div>
    )
}