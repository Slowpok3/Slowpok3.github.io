import React from 'react';
import axios from 'axios';
import Card from './card';
import CreateQuestion from './createQuestion';
import styles from './styling/questionDisplayStyle.module.css';
import { useParams } from 'react-router';
import {  useState, useRef } from 'react';
import { useEffect } from 'react';

export default function SearchDisplay(){
    const {keywords} = useParams();
    const [page, setPage] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const tryApi = () => {
        setPage(page + 1);
    }
    
    
    
    
    const [questions, setQuestions] = useState([]);
    useEffect(()=>{
        axios.get("/Questions/1", {params:{ postTitle: keywords }})
        .then(res=>{
            setQuestions(res);
            if (questions.length == 0)
                setLoaded(true);
            
        }).then(console.log(questions))
        .catch(err =>{
            console.log(err);
        })
    },[loaded])
    
    const getCardArray = () => {
        var array = [];
    
        for (var i = 0; i< (questions.data.length); i++){
          var postTitle = (questions.data[i].postTitle);
          var postBody = (questions.data[i].postBody);
          var userName = (questions.data[i].userName);
          var postId = questions.data[i].postId;
  
          const link = "./Question/"+postId
          
          array.push( <a href ={link} className={styles.content}> <Card postTitle = {postTitle} postBody = {postBody} userName= {userName}  > </Card> </a>);
        }
    
        
        console.log(array);
        
        return array
      }
    if (!loaded){
        return(<h1>loading...</h1>)
    }else{
        return (
            <div>
                <h1>{keywords}</h1>
                <button onClick = {tryApi}>reload</button>
                {getCardArray()}
               
            </div>
        );
    }
    
}