import React, { Component, useState } from 'react';
import styles from './styling/questionPageStyles.module.css';
export default function AnswerCard(props){
    return (
        <div className={styles.answerStyle}>
            <h1> {props.answerBody} </h1>
        </div>
        
    );
}