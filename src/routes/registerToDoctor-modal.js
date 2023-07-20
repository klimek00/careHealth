import {useState} from 'react'
import BetterDatePicker from './calendar/betterDatePicker'

export default function RegisterModal({modalDisplay, modalClose, specialty, doctorInfo}) {
  //today converted for min/value
  const [registerDate, setRegisterDate] = useState('')
  if (!doctorInfo) { return (<>err</>) }
  console.log(doctorInfo)

  const divStyle = {
    visibility: modalDisplay ? "visible" : "hidden",
    opacity: modalDisplay ? 1 : 0,
    backgroundColor: "rgb(0, 0, 0, 0.6"
  } 
  let handleModalClose = (e) => {
    e.stopPropagation()
    modalClose()
  }

  // if (!!doctorInfo) {
  //   console.log(doctorInfo)
  // }

  //validate if doctor for sure is free and in DB
  //validate if date isnt before today
  function userDateSelect ({day, hour}) {
    setRegisterDate({day, hour})
    noRegisterDate(false)
  }

  
  function handleRegisterPress(e) {
    e.stopPropagation()
    //display error if user hasnt selected date
    if (!registerDate) {  
      noRegisterDate(true)
    }

    const currentDate = new Date()
    let targetDate = ''

    //validate date and check if its not in past time
    try {
      const [day, month, year] = registerDate?.day?.split('.')
      const [hours, minutes, seconds] = registerDate?.hour?.split(':')
      
      targetDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds))
    } catch (error) {
      console.error('error whne parsing date: ', error)
      return null
    }

    if (targetDate < currentDate) {
      noRegisterDate(true)
      return null
    } else {
      console.log('works')


    }
  }

  function noRegisterDate(empty) {
    document.querySelector('#noDateSelected')?.classList.toggle('invisible', !empty)
  }

  return (
    <div id="registerModal" className="h-full fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto w-full transition ease-out duration-300 text-black" onClick={e => handleModalClose(e)} style={divStyle}>
      <div className="mt-24">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-300 rounded-md mx-auto w-1/4 p-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between border-b rounded-t mb-4">
            <h3 className="text-xl font-normal text-gray-900">
              Rejestrowanie do {doctorInfo.imie} {doctorInfo.nazwisko}, <span className='font-bold'>{specialty}</span>
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={e => handleModalClose(e)}>X
            </button>
          </div>
          <form>
            <div className='flex justify-around'>      
              <BetterDatePicker data={doctorInfo.hasOwnProperty('terminy') && doctorInfo.terminy} userDateSelect={userDateSelect} styling='' title='Dostępne terminy:'/>
            </div>
            <div id='noDateSelected' className='font-semibold text-red-700 invisible'>Brak daty! Proszę wybierz odpowiednią.</div>
            <div className="flex items-center px-6 py-4 border-t border-gray-200 rounded-b">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={(e) => handleRegisterPress(e)}>rejestruj się</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}