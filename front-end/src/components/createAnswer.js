import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function CreateAnswer(props){
    
    const [answerBody, setAnswerBody] = useState("");
    

    const handleSubmit = (e) =>{
        
        
        axios.put('/Answers' , {
            'answerBody' : answerBody,
            'postId' : props.postId
        }).then(res => {
            console.log(res);
        });

        


    }
    

    
    
    return (
        <div>
            <h1>creating da answers</h1>
            <form onSubmit = {handleSubmit}>
                <label>
                    AnswerBody
                    <input 
                    type="text"
                    value = {answerBody}
                    onChange = {e => setAnswerBody(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        
    )
}

