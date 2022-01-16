import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Display from './components/display';
import Card from './components/card';
import QuestionDisplay from './components/questionDisplay';
import './App.css';
import CreateQuestion from './components/createQuestion';
import SearchDisplay from './components/searchDisplay';
import SearchBar from './components/searchbar';




function App() {
  return (
   
    <div className="App">
   <Router>
      <Routes>
        <Route 
          path = "/"
          element = {
            <div>
              <Display /> 
              <CreateQuestion />
            </div>
            }
          />
        <Route 
          path = "/Question/:id"
          element = {<QuestionDisplay />}
        />
        <Route 
          path = "/SearchResults/:keywords"
          element = {<SearchDisplay />}
        
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
