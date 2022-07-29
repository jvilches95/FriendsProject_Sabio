import { useState } from "react"
import React from 'react'
import userService from "../../services/userServices";
import toastr from "toastr";

function Login(props) {

  const [state,setState] = useState({
    email:"",
    tenantId:"",
    password: ""
  })

  const onFormFieldChange = (event) => {

    const target = event.target;

    const value = target.value;

    const name = target.name;

    setState((prevState) => {
      
      const newData = {
        ...prevState,
      };

      newData[name] = value;

      return newData;
    });
  };

  const loginRequest = e => {
    console.log("login is clicked", e.currentTarget)
    userService.userLogin(state).then(onLoginSuccess).catch(onLoginError)
    }

  const onLoginSuccess = () => {
      toastr.success('You are now logged in', 'Login Success!')
      userService.getCurrentUser().then(onCurrentUserSuccess).catch(onCurrentUserError)
    }
  
  const onLoginError = response => {
      console.log(response)
      toastr.error('Enter your creditials','Login Failed')
    }

  const onCurrentUserSuccess = response => {
    const userId = response.data.item.id
    userService.getUser(userId).then(onGetUserSuccess).catch(onGetUserError)
  }

  const onCurrentUserError = error => {
    console.error(error)
  }

  const onGetUserSuccess = response => {
    const user = response.data.item
    props.userLoggedIn(user)
  }

  const onGetUserError = error => {
    console.error(error)
  }

  return (
    <div className="container">
    <h1>Login</h1>
    <form className="row w-25 g-3">

      <div className="col-12">
        <label className="form-label">Email</label>
        <input 
        type="text" 
        className="form-control"
        placeholder="Enter Email Here"
        name = "email"
        value={state.email} 
        onChange={onFormFieldChange}/>
      </div>

      <div className="col-12">
        <label className="form-label">ID</label>
        <input 
        type="text" 
        className="form-control"
        placeholder="Enter ID"
        name="tenantId"
        value={state.tenantId}
        onChange={onFormFieldChange}/>
      </div>

      <div className="col-12">
        <label className="form-label">Password</label>
        <input
        type="password" 
        className="form-control"
        name="password"
        value={state.password}
        onChange={onFormFieldChange} />
      </div>

      <div className="col-12">
          <button type="button" 
          className="btn btn-primary"
          onClick={loginRequest}>Login</button>
      </div>

      </form>
      </div>
  )
}

export default Login