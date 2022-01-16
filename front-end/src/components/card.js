import React from 'react';
import styles from './styling/cardStyle.module.css';

class Card extends React.Component{
    constructor(props){
      super(props);
      
    }
  
    
  
    render(){
      var textTitle = this.props.postTitle;
      var textBody = this.props.postBody;
      var userName = this.props.userName;
  
      return(
        
  
        <div className= {styles.questioncard}>
          <div className= {styles.questionCardContent}>
            <h1 >{textTitle}</h1>
            <h2 >{textBody}</h2>
            <h2> user name: {userName}</h2>
          </div>
        </div>
        
      );
    }
      
      
  }

  export default Card;