import {useState} from 'react'

export default function RegisterModal({modalDisplay, modalClose, specialty, doctorInfo}) {
  if (!doctorInfo) { return (<>err</>) }
  const handleChange = () => {}

  const divStyle = {
    visibility: modalDisplay ? "visible" : "hidden",
    opacity: modalDisplay ? 1 : 0,
    backgroundColor: "rgb(0, 0, 0, 0.6"
  } 
  let handleModalClose = (e) => {
    e.stopPropagation()
    modalClose()
  }
  //for date validation and setting value for today
  const date = new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate()
  

  if (!!doctorInfo) {
    console.log(doctorInfo)
  }


  return (
    <div id="loginModal" className="h-full fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto w-full transition ease-out duration-300 text-black" onClick={e => handleModalClose(e)} style={divStyle}>
      <div className="mt-24">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-300 rounded-md mx-auto w-1/2 p-4" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between border-b rounded-t mb-4">
            <h3 className="text-xl font-normal text-gray-900">
              Rejestrowanie do {doctorInfo.imie} {doctorInfo.nazwisko}, <span className='font-bold'>{specialty}</span>
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={e => handleModalClose(e)}>X
            </button>
          </div>
          <div className=''>
            {console.log(date)}
            {/*
            * wtf the hell doesnt min={date} not working?????
            
            */}
            Wybierz dzień: <input type='date' min={date} />

          </div>
          <div className="flex items-center px-6 py-4 border-t border-gray-200 rounded-b">
            <button data-modal-hide="loginModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">rejestruj się</button>
          </div>
        </div>
      </div>
    </div>
  )
}