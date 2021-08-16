import './App.css';
import { useState } from "react";
import Loader from './Loader';

function App() 
{
  const [outputMessage, setOutputMessage] = useState("Not Palindrome");
  const [isLoaderVisible, setLoaderVisibility] = useState(false);
  const [date, setDate] = useState();
  let date1;
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let sumOfMonth = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  let sumOfMonthLeapYear = [31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

  //On Clicking Submit button the control would come here
  function handleSubmit()
  {
    setLoaderVisibility(true);
    givePalindrome();
    setTimeout(() => 
    {
      setLoaderVisibility(false);
    }, 3000)
  }

  function givePalindrome()
  {
    date1 = new Date(date);
    checkPalindromeForAllFormats(date1);
  }

  function checkPalindromeForAllFormats(date1)
  {
    let date2 = getDateAsString(date1);
    let month = getMonthAsString(date1);
    let year = getYearAsString(date1);
  
    let ddmmyyyy = date2 + month + year;
    let mmddyyyy = month + date2 + year;
    let yyyymmdd = year + month + date2;

    if(checkPalindrome(ddmmyyyy) || checkPalindrome(mmddyyyy) || checkPalindrome(yyyymmdd))
    {
        const date2 = new Date(date);
        const date3 = new Date(date1);
        const diffTime = Math.abs(date3 - date2);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffDays + " days");
        console.log(date1);
        console.log("Your Birthday is a palindrome");
        if(diffDays === 0)
        {
          setOutputMessage("Wooh ur BirthDay is a Palindrome");
        }
        else{
          setOutputMessage("Awww! Your birthdate is not palindrome. Nearest Palindrome is: " + date1 +". You Missed it by "  + diffDays + " days.");
        }
    }
    else{
      //console.log("lets work on getting the nearest palindrome date");
      getNextDate(date1);
    }
  }

  function calculateDifference(date1, date2)
  {
    let tempDate1 = new Date(date1);
    let tempDate2 = new Date(date2);
  }

  function getNextDate(date1)
  {
    let date2 = date1.getDate();
    let month = date1.getMonth() + 1;
    let year = date1.getFullYear();

    if (month === 2) 
    {
      if (isLeapYear(year))
      {
        if (date2 > 29) 
        {
          date2 = 1;
          month = 3;
        }
        else{
          date2++;
        }
      }
      else {
        if (date2 > 28) 
        {
          date2 = 1;
          month = 3;
        }
        else{
          date2++;
        }
      }
    }
    else {
      if (date2 >= daysInMonth[month - 1]) 
      {
        date2 = 1;
        month++;
      }
      else{
        date2++;
      }
    }
  
    if (month > 12)
    {
      month = 1;
      year++;
    }

    let temp = new Date(month + "-" + date2 + "-" + year);
    checkPalindromeForAllFormats(temp);
  }

  //Function to check leap year
  function isLeapYear(year) {

    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }

  //Function to get date as a string
  function getDateAsString(date1)
  {
    let toReturnDate = "";
    if (date1.getDate() < 10) {
      toReturnDate = '0' + date1.getDate();
    }
    else {
      toReturnDate = date1.getDate().toString();
    }
    return toReturnDate;
  }

  //Function to get month as a string
  function getMonthAsString(date1)
  {
    let toReturnMonth = "";
    if (date1.getMonth() < 10) {
      toReturnMonth = '0' + parseInt(date1.getMonth()) + 1;
    }
    else {
      toReturnMonth = (parseInt(date1.getMonth()) + 1).toString();
    }
    return toReturnMonth;
  }

  //Function to get year as a string
  function getYearAsString(date1)
  {
    let toReturnYear = date1.getFullYear().toString();
    return toReturnYear;
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

  return (
    <div className="App">
      <header className = "app-header">Check if Your Birthday Is Palindrome</header>

      <label for = "description" className = "sub-heading">Enter your birthdate and we will 
      tell you if your birthdate is a palindrome</label>

      <p className = "description">This app checks your birthdate in 4 formats yyyy-mm-dd, dd-mm-yyyy, mm-dd-yy, m-dd-yyyy
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
  );
}

export default App;
