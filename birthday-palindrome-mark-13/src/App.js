import './App.css';
import { useState } from "react";
import Loader from './Loader';

function App() 
{
  const [outputMessage, setOutputMessage] = useState("Not Palindrome");
  const [isLoaderVisible, setLoaderVisibility] = useState(false);
  const [date, setDate] = useState(null);
  let date1;
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //On Clicking Submit button the control would come here
  function handleSubmit()
  {
    setLoaderVisibility(true);
    console.log(date);
    if(date === null)
    {
      setOutputMessage("Pls Enter the Date");
    }
    else{
      givePalindrome();
    }
     
    setTimeout(() => 
    {
      setLoaderVisibility(false);
    }, 1500)
  }

  function givePalindrome()
  {
    date1 = new Date(date);
    let dateInStr = getDateAsString(date1);
    let dateInAllFormats = getDatesInAllFormat(dateInStr);
    let isPalindrome = false;
    //console.log(dateInAllFormats);
    for (let i = 0; i < dateInAllFormats.length; i++)
    {
      if(checkPalindrome(dateInAllFormats[i]))
      {
        //console.log("Yes")
        isPalindrome = true;
        break;
      }
    }
    if(isPalindrome)
    {
      setOutputMessage("Woh Your Birthdate is Palindrome");
    }
    else{
      let nextDate = getNextPalindromeDate(date1);
      //console.log(nextDate);
      setOutputMessage("Next Date is: " + nextDate[1].day + "-" + (parseInt(nextDate[1].month + 1)) + "-" + nextDate[1].year + " You Missed it by: " + nextDate[0] + " Days");
      console.log();
    }
  }

  function getDateAsString(date)
  {
    //console.log(date.getDate())
    var dateInStr = {day: '', month: '', year: ''};
    if(parseInt(date.getDate()) < 10){
      dateInStr.day = '0' + date.getDate();
    }
    else {
      dateInStr.day = date.getDate().toString();
    }
    
    if(parseInt(date.getMonth() + 1) < 10){
      dateInStr.month = '0' + parseInt(date.getMonth() + 1);
    }
    else {
      dateInStr.month = parseInt(date.getMonth() + 1).toString();
    }
    
    dateInStr.year = date.getFullYear().toString();
    return dateInStr;
  }

  function getDatesInAllFormat(dateinStr)
  {
    let dateInAllFormats = ["", "", "", "", "", ""];
    if(dateinStr != null)
    {  
      dateInAllFormats[0] = dateinStr.day + dateinStr.month + dateinStr.year;
      dateInAllFormats[1] = dateinStr.month + dateinStr.day + dateinStr.year;
      dateInAllFormats[2] = dateinStr.year + dateinStr.month + dateinStr.day;
      dateInAllFormats[3] = dateinStr.day + dateinStr.month + dateinStr.year.slice(2, 4);
      dateInAllFormats[4] = dateinStr.month + dateinStr.day + dateinStr.year.slice(2, 4);
      dateInAllFormats[5] = dateinStr.year.slice(2, 4) + dateinStr.month + dateinStr.day;
    }
    return dateInAllFormats;
  }

  //Function to check palindrome
  function checkPalindrome(dateAsString)
  {
    let start = 0;
    let end = parseInt(dateAsString.length) - 1;
    let flag = 1;
    while(start < end)
    {
      if(dateAsString[start] === dateAsString[end])
      {
        start++;
        end--;
      }
      else{
        flag = 0;
        break;
      }
    }
    if(flag === 1)
    {
      return true;
    }
    else{
      return false;
    }
  }

  function isLeapYear(year) {

    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }
  
  function getNextDate(date) {
    var day = parseInt(date.getDate()) + 1;
    var month = parseInt(date.getMonth());
    console.log(month)
    var year = parseInt(date.getFullYear());
    
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 1) {
      if (isLeapYear(year)) {
        if (parseInt(day) > 29) {
          day = 1;
          month = 2;
        }
      }
      else {
        if (parseInt(day) > 28) {
          day = 1;
          month = 2;
        }
      }
    }
    else {
      if (parseInt(day) > daysInMonth[month]) {
        //console.log(day + ">" + daysInMonth[month-1]);
        day = 1;
        month++;
        
      }
    }
  
    if (parseInt(month) > 11) {
      month = 0;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  
  function getNextPalindromeDate(date) {
  
    //console.log(date);
    var nextDate = getNextDate(date);
    let date1 = new Date(nextDate.year, nextDate.month, nextDate.day);
    console.log(nextDate)
    //console.log(date1);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = getDateAsString(date1);
      let dateInAllFormats= getDatesInAllFormat(dateStr);
      let isPalindrome = false;
      for (let i = 0; i < dateInAllFormats.length; i++)
      {
        if(checkPalindrome(dateInAllFormats[i]))
        {
          //console.log("Yes")
          isPalindrome = true;
          return [ctr, nextDate];
        }
        //console.log(dateInAllFormats[i]);
      }
      nextDate = getNextDate(date1);
      date1 = new Date(nextDate.year, nextDate.month, nextDate.day);
      console.log(nextDate);
    }
  }

  return (
    <div className="App">
      <div className = "container">
      <header className = "app-header">Check if Your Birthday Is Palindrome</header>

      <label for = "description" className = "sub-heading">Enter your birthdate and we will 
      tell you if your birthdate is a palindrome</label>

      <p className = "description">This app checks your birthdate in 3 formats yyyy-mm-dd, dd-mm-yyyy, mm-dd-yy
e.g. if your birthdate is 01 Aug 1995, then app will check for 19950801, 01081995, 080195, 1081995</p>

      <input type = "date" className = "input" onChange = {(e) => setDate(e.target.value)}></input>
      <button className = "button" onClick = {() => handleSubmit()}>Check</button>

      {isLoaderVisible && <Loader/>}
      
      {!isLoaderVisible && 
        <div className = "output">
          {outputMessage}  
        </div>
      }
      </div>
    </div>
  );
}

export default App;
