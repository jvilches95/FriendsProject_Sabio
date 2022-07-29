import React from 'react'

function Home(props) {

  
  return (
    
        <div className="row p-3">
        <h1>{props.currentUser.firstName +" "+ props.currentUser.lastName}'s Home</h1>
        </div>
        
    
  )
}

export default Home