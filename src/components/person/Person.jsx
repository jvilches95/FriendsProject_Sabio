import React from "react";
import  {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import debug from "sabio-debug";


function Person(props) {

  const _logger = debug.extend("Person")

  const onDeleteClicked = (e) => {
    e.preventDefault();

    props.onPersonClicked(props.person);
  }

  const onEditClicked = e => {
    e.preventDefault()
    navigate(`/friends/`+ props.person.id, {state: props.person})
    
  }

  const navigate = useNavigate()


  _logger("Inside of Person", props.person)

  return (

    <div className="col-md-3">
      <div className="card m-3">

        <img
          src={props.person.url}
          className="card-img-top"
          alt="person"
        />

        <div className="card-body">
          <h5 className="card-title">{props.person.slug} </h5>
          <strong>{props.person.headline}</strong>
          <p>{props.person.summary} </p>
          <button
            type="button"
            className="m-1 btn btn-danger"
            onClick={onDeleteClicked}>
              Delete
          </button> 

          <button type="button" 
          
          className="m-1 btn btn-warning"
          onClick={onEditClicked}
           >
            Edit
          </button>
        </div>

      </div>
    </div>
  );
}
 
Person.propTypes = {
  person : PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired

  })
}
export default Person;
