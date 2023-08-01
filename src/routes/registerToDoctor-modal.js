import {useState, useEffect} from 'react'
import BetterDatePicker from './calendar/betterDatePicker'

export default function RegisterModal({modalDisplay, modalClose, specialty, doctorInfo}) {  
  //// MODAL
  const divStyle = {
    visibility: modalDisplay ? "visible" : "hidden",
    opacity: modalDisplay ? 1 : 0,
    backgroundColor: "rgb(0, 0, 0, 0.6"
  } 
  let handleModalClose = (e) => {
    e.stopPropagation()
    modalClose()
  }

  //// FETCH NEW VISITS WHEN SELECTED DOCTOR CHANGES
  const [visits, setVisits] = useState('')
  
  useEffect(() => {
    if (doctorInfo) {
      (async() => {
        const fetchedVisits = await getVisits()
        const formattedVisits = visitsToCalendarFormat(fetchedVisits)
        setVisits(formattedVisits)
      })()
    }
  }, [doctorInfo])


  async function getVisits() {
    try {
      let res = await fetch('/getVisits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: doctorInfo.username
        })
      })
      res = await res.json()
      if (res?.note === "ok") {
        return res?.visits
      }

    }
    catch(err) {
      console.error(err)
    }
  }

  function visitsToCalendarFormat(visits) {
    const formattedData = visits.reduce((acc, elem) => {
      const dayDate = dateToCalendarFormat(elem.dayDate)
      const dayHour = elem.dayHour
      
      if (!acc[dayDate]) {
        acc[dayDate] = [dayHour]
      } else {
        acc[dayDate].push(dayHour)
      }
    
      return acc
    }, {})
    
    for (const date in formattedData) {
      formattedData[date].sort();
    }

    return formattedData
  }
  
  function dateToCalendarFormat(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  //// VALIDATE DATA FROM DATABASE
  const [registerDate, setRegisterDate] = useState('')
  if (!doctorInfo) { return (<>error!!!</>) }
  // console.log(doctorInfo)

  
  //validate if doctor for sure is free and in DB
  function userDateSelect ({day, hour}) {
    setRegisterDate({day, hour})
    noRegisterDate(false)
  }

  
  //when user presses register button
  function handleRegisterPress(e) {
    e.stopPropagation()
    //display error if user hasnt selected date
    if (!registerDate) {  
      noRegisterDate(true)
      return
    }

    const currentDate = new Date()
    let targetDate = ''

    //validate date and check if its not in past time
    try {
      const [day, month, year] = registerDate?.day?.split('.')
      const [hours, minutes] = registerDate?.hour?.split(':')
      
      targetDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day), parseInt(hours), parseInt(minutes))
    } catch (error) {
      console.error('error when parsing date: ', error)
      return null
    }

    if (targetDate < currentDate) {
      noRegisterDate(true)
      return null
    } else {
      registerToDoctor()
    }
  }

  //after validation send data to server
  function registerToDoctor() {
    //todo
  }

  function noRegisterDate(empty) {
    document.querySelector('#noDateSelected')?.classList.toggle('invisible', !empty)
  }

  return (
    <div className="h-full fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto w-full transition ease-out duration-300 text-black" onClick={e => handleModalClose(e)} style={divStyle}>
      <div className="mt-24">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-300 rounded-md mx-auto w-1/4 p-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between border-b rounded-t mb-4">
            <h3 className="text-xl font-normal text-gray-900">
              Rejestrowanie do {doctorInfo.username} , <span className='font-bold'>{specialty}</span>
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={e => handleModalClose(e)}>X
            </button>
          </div>
          <form>
            <div className='flex justify-around'>      
              {visits && <BetterDatePicker data={visits} userDateSelect={userDateSelect} styling='' title='Dostępne terminy:'/>}
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