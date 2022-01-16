import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import CreateAnswer from './createAnswer';
import { render } from '@testing-library/react';
import AnswerCard from './answerCard';
import styles from './styling/questionPageStyles.module.css';

export default function AnswerDisplay(props){
    const [answers, setAnswers] = useState({});
    const [load, setLoad] = useState(1);
    const [didLoad, setDidLoad] = useState(false);

    useEffect( () => {
        axios.get("/Answers", {params :{postId : props.postId }}).then(res => {
            setAnswers(res);
            setDidLoad(true);
        }).then(
            console.log(answers)
        )
    } , [load]);

    
    
    
    

    const handleClick = () => {
        setLoad(load + 1);
    }

    if (!didLoad){
        return (<h1>Loading...</h1>)
    }else{

        var array = [];

        for (var i=0; i<answers.data.length; i++){
        
        var answerBody = answers.data[i].answerBody;
        console.log(answerBody);
        array.push(<AnswerCard answerBody = {answerBody} />);


    }
        return(


            
            <div>
                {array}
                <button onClick = {handleClick}>reload</button>
                
            </div>
            
        ) 
    }

    
}