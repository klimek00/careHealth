import {React}  from 'react'

export default function AddVisit({addVisit}) {

  return (
    <>
    <div>
      <label htmlFor="selectDate">
        wpisz se date
      </label>
      <input id="inputDate" type='date'></input><br/>
      
      <label htmlFor="">
        zaznacz godzine -tutaj scrollable fajne bedzie cynie
      </label>
      <input id="inputHour" type="text" className="mt-2 w-36 px-4 py-2 border border-gray-300 rounded-md"/>
      <button className="p-2 hover:bg-violet-400" onClick={() => addVisit()}>Dodaj wizytę</button>
    </div> 
    </>
  )
}

