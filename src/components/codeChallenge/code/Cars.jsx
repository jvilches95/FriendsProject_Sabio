import React, { useEffect, useState } from 'react'
import Car from './Car'



function Cars() {

    const [cars,setCars] = useState({carsArray:[
        {
            make: "Kia",
            model: "Sorento",
            year: 2020
        },
        {
            make: "Kia",
            model: "Optima",
            year: 2019
        },
        {
            make: "Tesla",
            model: "Model 3",
            year: 2021
        },
        {
            make: "Honda",
            model: "Civic",
            year: 2019
        },
        {
            make: "Honda",
            model: "Accord",
            year: 2018
        },
        {
            make: "Volkswagen",
            model: "Jetta",
            year: 2021
        },
        {
            make: "Toyota",
            model: "Camry",
            year: 2021
        },
        {
            make: "Ford",
            model: "Mustang",
            year: 2019
        },
        {
            make: "Ford",
            model: "F-150",
            year: 2019
        },
        {
            make: "Toyota",
            model: "Camry",
            year: 2020
        },
        {
            make: "Ford",
            model: "F-150",
            year: 2021
        }
    ], carsCard:[], show:false, value:""} )


  useEffect(()=>{
    setCars((prevState)=>{

        const pastCarsData = {...prevState};
        pastCarsData.carsCard = pastCarsData.carsArray.map(mapCars)

        return pastCarsData
    })
  },[])

  const mapCars = aCar => {
      return(
          <Car
          object={aCar}
          ></Car>
      )
      
  }

  const renderCars = e => {
      e.preventDefault()
      console.log("button working")
      setCars((prevState)=>{
          const pastCars = {...prevState}
            pastCars.show = !pastCars.show
          return pastCars

      })
  }
 
const valueChange = e =>{

    cars.value = e.target.value
setCars((prevState)=>{
const pd = {...prevState}
let filteredCar = pd.carsArray.filter(filteringCars)
pd.carsCard = filteredCar.map(mapCars)
return pd
},[cars.value])
}

  const filteringCars = car => {
      let result = false
console.log("filtering statement" , car.year , cars.value)
      if (car.year === parseInt(cars.value)) {
          console.log("statement is true")
          result = true
      } else {
          console.log("statement is false")
        }

      return result
  }
 
  return (
<React.Fragment>
    <div className='col-4'>

<button
     className=" m-2 btn btn-success" 
     onClick={renderCars}
     >Show Cars</button>

  
  <label>
          Pick your car by year:
          <select value={cars.value} onChange={valueChange}>
            <option value="0">Select Year</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </label>

</div>

<div>
{cars.show && <div className="row"> {cars.carsCard} </div> }
</div>  
</React.Fragment>
  )
}

export default Cars