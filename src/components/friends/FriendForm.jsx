import React, {useState, useEffect} from 'react'
import friendServices from '../../services/friendServices';
import {useLocation} from 'react-router-dom'
// import toastr from 'toastr';

function FriendForm() {

const info = useLocation()

const selectedPersonData = info.state

const [formData,setFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "Active",
    primaryImage: ""
})

const onFormFieldChange = (event) => {

    const target = event.target;

    const value = target.value;

    const name = target.name;

    setFormData((prevState) => {
      
      const newFormData = {
       ...prevState
      };

      newFormData[name] = value;

      return newFormData;
    });
  };

const submitButton = e => {
      e.preventDefault()

      if (info.state !== null) {
        friendServices.editFriend(info.state.id , formData).then(onEditSuccess).catch(onEditError)
      } else {friendServices.addFriend(formData).then(onAddSuccess).catch(onAddError)}
}

const onAddSuccess = response => {
    console.log(response)
}
const onAddError = error => {
     console.error(error)
 }

useEffect(()=>{
 
  if (info.state !== null ) {

    setFormData((prevState)=>{
      const updateForm = {...prevState}
      updateForm.slug = selectedPersonData.slug
      updateForm.title = selectedPersonData.title
      updateForm.bio = selectedPersonData.bio
      updateForm.summary = selectedPersonData.summary
      updateForm.headline = selectedPersonData.headline
      updateForm.primaryImage = selectedPersonData.url
      return updateForm
   })

  }  
  
},[])

const onEditSuccess = response => {
  console.log(response)
}

const onEditError = error => {
  
  console.err(error)
}

  return (

<div className="container ">
      <h1>Add/Edit Friend</h1>

      <form className="row g-3 w-50">

        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input 
          type="text"
          className="form-control" 
           placeholder="Full Name"
           name = "slug"
           value= {formData.slug} 
           onChange={onFormFieldChange} 
        />
        </div>

        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input 
          type="text"
          className="form-control" 
           placeholder="Title"
           name = "title"
           value={formData.title}
           onChange={onFormFieldChange}
           />
        </div>

        <div className="col-md-6">
          <label className="form-label">Bio</label>
          <input
            type="email"
            className="form-control"
            placeholder="Bio"
            name = "bio"
            value={formData.bio}
           onChange={onFormFieldChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Headline</label>
          <input
           type="text" 
           className="form-control" 
           placeholder="Headline" 
           name = "headline"
           value={formData.headline}
           onChange={onFormFieldChange} 
           />
        </div>

        <div className="col-12">
          <label className="form-label">Summary</label>
          <input
           type="text" 
           className="form-control" 
           placeholder="Summary" 
           name = "summary"
           value={formData.summary}
           onChange={onFormFieldChange} 
           />
        </div>
        
        <div className="col-12">
          <label className="form-label">Profile URL</label>
          <input
           type="text" 
           className="form-control" 
           placeholder="Profile URL" 
           name = "primaryImage"
           value={formData.primaryImage}
           onChange={onFormFieldChange} 
           />
        </div>

        <div className="col-12">
          <button
           type="button"
            className="btn btn-primary"
            onClick = {submitButton}
            >Submit</button>
        </div>

      </form>
    </div>

  )
}

export default FriendForm
