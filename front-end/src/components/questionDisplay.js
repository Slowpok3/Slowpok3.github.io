import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import CreateAnswer from './createAnswer';
import AnswerDisplay from './answerDisplay';
import styles from './styling/questionPageStyles.module.css';

export default function QuestionDisplay(){
    const {id} = useParams();
    const [page, setPage] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const tryApi = () => {
        setPage(page + 1);
    }
    const [questionDatas, setQuestionDatas] = useState({});
    useEffect(()=> {
        axios.get('/Questions/1', {params: {postId: id}}).then(res => {
            setQuestionDatas(res);
            setLoaded(true);
            
        }).catch(err =>{
            console.log(err);
          })
        
        
        
    }, []);

    if (!loaded){
        return (<h1>loading</h1>)
    }else{
        
        return (
            <div className={styles.pageStyle}>

                <a href = "/"><button>Back</button></a>
                <div className={styles.questionData}>
                    
                    <h1>{questionDatas.data[0].postTitle}</h1>
                    <h3>{questionDatas.data[0].postBody}</h3>
                    <h4>posted by {questionDatas.data[0].userName}</h4>
                    <h4>Class: {questionDatas.data[0].className}</h4>
                    {/* <button onClick = {tryApi}>reload</button> */}
                </div>
                <div className={styles.answeringStyle}>
                    <CreateAnswer postId = {id}></CreateAnswer>
                    <AnswerDisplay postId = {id} />
                </div>
               
            </div>

            
        )
    }
    
}


