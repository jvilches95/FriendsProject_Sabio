import React, { useState } from 'react'
import userService from '../../services/userServices';
import toastr from 'toastr';

function Register() {

  const [state,setState] = useState(
    {firstName:"",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "",
  })

  const onFormFieldChange = (event) => {

    const target = event.target;

    const value = target.value;

    const name = target.name;

    setState((prevState) => {

      const newFormData = {
        ...prevState,
      };

      newFormData[name] = value;

      return newFormData;
    });
  };

  const registerUser = e => {
    console.log("data being passed", state, e.currentTarget);
    userService.userRegister(state).then(onRegisterSuccess).catch(onRegisterError)
  }

  const onRegisterSuccess = response => {
    console.log(response)
    toastr.success('You are now a registered User', 'Registration Success!')
  }

  const onRegisterError = response => {
    console.log(response)
    toastr.error('Please enter the correct fields','Registration Failed!')
  }

  return (
    
    <div className="container ">
      <h1>Register Form</h1>

      <form className="row g-3 w-50">

        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input 
          type="text"
          className="form-control" 
           placeholder="First name"
           name = "firstName"
           value={state.firstName}
           onChange={onFormFieldChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input 
          type="text"
          className="form-control" 
           placeholder="Last name"
           name = "lastName"
           value={state.lastName}
           onChange={onFormFieldChange}/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@email.com"
            name = "email"
           value={state.email}
           onChange={onFormFieldChange}
          />
        </div>
        
        <div className="col-md-6">
          <label className="form-label">ID</label>
          <input
           type="text" 
           className="form-control" 
           placeholder="ID Number" 
           name = "tenantId"
           value={state.tenantId}
           onChange={onFormFieldChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input 
          type="password" 
          className="form-control" 
          name = "password"
          value={state.password}
          onChange={onFormFieldChange}/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Confirm Password</label>
          <input 
          type="password" 
          className="form-control"
          name = "passwordConfirm"
           value={state.passwordConfirm}
           onChange={onFormFieldChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Profile URL</label>
          <input
           type="text" 
           className="form-control" 
           placeholder="Avatar URL" 
           name = "avatarUrl"
           value={state.avatarUrl}
           onChange={onFormFieldChange} />
        </div>

        <div className="col-12">
          <button
           type="button"
            className="btn btn-primary"
            onClick = {registerUser}>Register</button>
        </div>

      </form>
    </div>
    
  );
}

export default Register