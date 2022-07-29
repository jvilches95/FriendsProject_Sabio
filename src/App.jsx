import React, {useState} from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom"
import Home from "./components/home/Home";
import AjaxCalls from "./components/test-ajax-calls/AjaxCalls";
import Friends from "./components/friends/Friends";
import Jobs from "./components/jobs/Jobs";
import TechCompanies from "./components/companies/TechCompanies";
import Events from "./components/events/Events";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import SiteNav from "./components/sitenav/SiteNav";
import FriendForm from "./components/friends/FriendForm";
import Product from "./components/codeChallenge/Product";
import userService from "./services/userServices";
import Cars from "./components/codeChallenge/code/Cars";
import debug from "sabio-debug";


function App() {

  const _logger = debug.extend("App")
  

  const [state, setState] = useState({ firstName: "Unknown", lastName: "User", isLoggedIn: false })

  _logger("Something important somewhere in a function within your component", state)
  
const userLoggedIn = user => {
  console.log("user logged in info:", user)
  setState((prevState)=>{
const currentUser = {...prevState}
currentUser.firstName = user.firstName
currentUser.lastName = user.lastName
currentUser.isLoggedIn = true
return currentUser
  },[])
}

const logOut = () => {
console.log("logOut function in App.jsx")
userService.userLogOut().then(onLogOutSuccess).catch(onLogOutError)
}

const onLogOutSuccess = response => {
console.log(response)
 setState((prevState)=>{
const pastData = {...prevState}
pastData.firstName = "Unknown"
pastData.lastName = "User"
pastData.isLoggedIn = false
return pastData
 })
}

const onLogOutError = error => {
  console.error(error)
}

  return (
    <React.Fragment>
      
     <SiteNav userLogOut={logOut} currentUser={state}/>

        <Routes>

       <Route path="/" element={<Home currentUser={state} />}>
          <Route path="home" element={<Home />}></Route>
         </Route>
         <Route path="/ajaxcalls" element={<AjaxCalls />}></Route> 
        <Route path="/friends" element={<Friends />}></Route>
        <Route path="/friends/:id" element={<FriendForm/>}></Route> 
        
         <Route path="/jobs" element={<Jobs />}></Route> 
        <Route path="/companies" element={<TechCompanies />}></Route> 
         <Route path="/events" element={<Events />}></Route> 
         <Route path="/login" element={<Login userLoggedIn={userLoggedIn}/>}></Route> 
         <Route path="/register" element={<Register />}></Route>
         <Route path="/product" element={<Product />}></Route>
         <Route path="/cars" element={<Cars />}></Route>
      </Routes> 


      <footer className="container">
        <p>&copy; Sabio 2019-2020</p>
      </footer>

    </React.Fragment> 
  );
}

export default App;
