import React from 'react'
import { useState, useEffect } from 'react'
import friendServices from '../../services/friendServices'
import Person from '../person/Person'
import  {useNavigate} from "react-router-dom"
import "rc-pagination/assets/index.css"
import locale from "rc-pagination/lib/locale/en_US"
import Pagination from 'rc-pagination'
import debug from "sabio-debug";


function Friends() {

  const _logger = debug.extend("Friends")

  const [friends,setFriends] = useState({friendsArray:[], friendsCard:[], bool:false , searchFriends:"", currentPage: 1})

  _logger("Something important somewhere in a function within your component", friends)

  const mapFriend = friend => {
    return (


      <Person 
      person= {friend}
      key={friend.id}
      onPersonClicked={deleteFriend}
      ></Person>

    )
  }

useEffect(()=>{
  friendServices.getFriend().then(onGetFriendSuccess).catch(onGetFriendError)
}, []);

const onGetFriendSuccess = response => {

  let friendsArray = response.data.item.pagedItems

  setFriends((prevState)=>{
    const pastFriends = {...prevState};
    pastFriends.friendsArray = friendsArray
    pastFriends.friendsCard = friendsArray.map(mapFriend)
    return pastFriends
    
  })
  
}

const onGetFriendError = error => {
  console.error(error)
}

const renderFriends = e => {
  e.preventDefault()
  setFriends((prevState)=>{
    const pastFriends= {...prevState};
    pastFriends.bool = !pastFriends.bool
    
  return pastFriends
    })
}

const deleteFriend = (person) => {

  const targetedId = person.id

  friendServices.deleteFriend(targetedId).then(onDeleteFriendSuccess).catch(onDeleteFriendError)

}

const onDeleteFriendSuccess = (id) => {
  
  setFriends((prevState)=> {

    const pastFriends = {...prevState};


    const idOf = pastFriends.friendsArray.findIndex((friend) => {

        let result = false

        if (friend.id === id) {
          result = true
        }

        return result
    });

    if (idOf >= 0){
     pastFriends.friendsArray.splice(idOf,1)
    }

    pastFriends.friendsCard = pastFriends.friendsArray.map(mapFriend)

    return pastFriends
  });
}

const onDeleteFriendError = error => {
  console.error(error)
}

const navigate = useNavigate();

const addFriend = (e) => {
e.preventDefault()
navigate('/friends/new', {state:null})
  
}

const searchFriends = e => {
  e.preventDefault()

  friendServices.queryFriends(friends.searchFriends).then(onSearchSuccess).catch(onSearchError)
}

const onSearchSuccess = response => {
  console.log("onSearch success", response.data.item.pagedItems)
 const searchedFriend = response.data.item.pagedItems

  setFriends((prevState)=>{
    const pastFriends = {...prevState};
    pastFriends.friendsArray = searchedFriend
    pastFriends.friendsCard = searchedFriend.map(mapFriend)
    return pastFriends
    
  })
  
}

const onSearchError = error => {
  console.error(error)
}

const onFormFieldChange = (event) => {

  const target = event.target;

  const value = target.value;

  const name = target.name;

  setFriends((prevState) => {

    const newFormData = {
     ...prevState
    };


    newFormData[name] = value;

    return newFormData;
  });
};

const onChange = page => {
  setFriends((prevState)=>{
const pastData = {...prevState}
pastData.currentPage = page
return pastData
  })
}
  return (
    
    <div>
      
    <h1 className="m-2">Friends Page</h1>
    

    <button className=" m-2 btn btn-primary" onClick={renderFriends}>Render Friends List</button>
    
    <button
     className=" m-2 btn btn-warning" 
     onClick={addFriend}
     >Add Friend</button>


  <form className="col-2 m-2">

  <div>
          
          <input 
          type="text"
          className="form-control" 
           placeholder="Search by Friend's info"
           name = "searchFriends"
           value= {friends.searchFriends} 
           onChange={onFormFieldChange} 
        />
  </div>
 </form>
<button className="m-2 btn btn-info" 
onClick={searchFriends}>Search</button>


<Pagination 
onChange={onChange}
current={friends.currentPage}
total={friends.friendsCard.length}
locale={locale}
pageSize={1}/>


{friends.bool && <div className="row"> {friends.friendsCard[friends.currentPage-1]}  </div> }

</div>
    
  )
}



export default Friends


