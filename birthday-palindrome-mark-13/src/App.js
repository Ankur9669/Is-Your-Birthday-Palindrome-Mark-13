import './App.css';
import { useState } from "react";
import Loader from './Loader';

function App() 
{
  const [outputMessage, setOutputMessage] = useState("Not Palindrome");
  return (
    <div className="App">
      <header className = "app-header">Check if Your Birthday Is Palindrome</header>

      <label for = "description" className = "sub-heading">Enter your birthdate and we will 
      tell you if your birthdate is a palindrome</label>

      <p className = "description">This app checks your birthdate in 4 formats yyyy-mm-dd, dd-mm-yyyy, mm-dd-yy, m-dd-yyyy
e.g. if your birthdate is 01 Aug 1995, then app will check for 19950801, 01081995, 080195, 1081995</p>

      <input type = "date" className = "input"></input>
      <button className = "button">Check</button>

      <div className = "output">
        {outputMessage}
      </div>
    </div>
  );
}

export default App;
