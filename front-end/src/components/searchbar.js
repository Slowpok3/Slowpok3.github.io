import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";



export default function SearchBar(){
    let navigate = useNavigate();
    const [answerBody, setAnswerBody] = useState("");
    var link = "/SearchResults/" + answerBody;
    
    const handleSubmit = (e) =>{
        
        e.preventDefault();
        navigate(link);
    }

    

    return (
        <div>
            <h1> Search for a Question! </h1>
            <form onSubmit = {handleSubmit}>
                <label>
                    <input 
                    type="text"
                    value = {answerBody}
                    onChange = {e => setAnswerBody(e.target.value)}
                    />
                </label>

                
                <input type="submit" value="Search" />
                
            </form>
        </div>
        
    )
}