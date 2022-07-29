import React, {useState} from 'react'
import entityServices from './services/entityServices'
import toastr from 'toastr'

function Product() {

const [product,setProduct] = useState({
    name:"",
    manufacturer: "",
    description: "",
    cost: ""
})

const postEntity = e => {
    console.log("button working", e , product)
entityServices.postEntity(product).then(onPostSuccess).catch(onPostError)
}

const onPostSuccess = response =>{
    console.log(response)
    toastr.success(response.data.item , 'Product Form Created')
}


const onPostError = error =>{
console.error(error)
toastr.error('Try Again')
}


const onFormFieldChange = (event) => {

    const target = event.target;

    const value = target.value;

    const name = target.name;

    setProduct((prevState) => {

      const newFormData = {
       ...prevState
      };

      newFormData[name] = value;

      return newFormData;
    });
  };

  return (

    <div className="container ">
      <h1>Product</h1>

      <form className="row g-3 w-50">

        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input 
          type="text"
          className="form-control" 
           placeholder="Name of Product"
           name = "name"
           value= {product.name} 
           onChange={onFormFieldChange} 
        />
        </div>

        <div className="col-md-6">
          <label className="form-label">Manufacturer</label>
          <input 
          type="text"
          className="form-control" 
           placeholder="Manufacturer"
           name = "manufacturer"
           value={product.manufacturer}
           onChange={onFormFieldChange}
           />
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            name = "description"
            value={product.description}
           onChange={onFormFieldChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cost</label>
          <input
           type="text" 
           className="form-control" 
           placeholder="Cost" 
           name = "cost"
           value={product.cost}
           onChange={onFormFieldChange} 
           />
        </div>

       

        <div className="col-12">
          <button
           type="button"
            className="btn btn-primary"
            onClick = {postEntity}
            >Add</button>
        </div>

      </form>
    </div>
  )
}

export default Product