import React from 'react';
import axios from 'axios';
import styles from './styling/createQuestionStyle.module.css'

class CreateQuestion extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        postTitleValue: '',
        postBodyValue: '',
        userNameValue: '',
        classValue: ''
      };
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleBodyChange = this.handleBodyChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleClassChange = this.handleClassChange.bind(this);
      
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleTitleChange(event) {
      this.setState({postTitleValue: event.target.value});
    }
  
    handleBodyChange(event) {
      this.setState({postBodyValue: event.target.value});
    }
  
    handleNameChange(event) {
      this.setState({userNameValue: event.target.value});
    }
  
    handleClassChange(event) {
      this.setState({classValue: event.target.value});
    }
  
  
  
    handleSubmit(event) {
      console.log(this.state.postTitleValue);
  
      axios.put('Questions/0',  {
        'postTitle': this.state.postTitleValue,
        'postBody' : this.state.postBodyValue,
        'userName' : this.state.userNameValue,
        'className' : this.state.classValue,
  
      })
      .then(res => {
        console.log(res);
      })
      .catch(err =>{
        console.log(err);
      })
  
  
      alert('A name was submitted: ' + this.state.postTitleValue);
      //event.preventDefault();
    }
  
    render() {
      return (
        <div className= {styles.createQuestion}>

        
          <form onSubmit={this.handleSubmit} >
            <label>Ask a Question: </label>

            <label>
              Post Title:
              <input type="text" value={this.state.postTitleValue} onChange={this.handleTitleChange} />
            </label>
    
            <label>
              Post Body:
              <input type="text" value={this.state.postBodyValue} onChange={this.handleBodyChange} />
            </label>
    
    
            <label>
              User Name:
              <input type="text" value={this.state.userNameValue} onChange={this.handleNameChange} />
            </label>
    
    
            <label>
              Class:
              <input type="text" value={this.state.classValue} onChange={this.handleClassChange} />
            </label>
    
    
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  export default CreateQuestion;