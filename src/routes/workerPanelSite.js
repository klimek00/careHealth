import { ReactSession } from 'react-client-session'
import { useState } from 'react'

import Header from './header'
import Footer from './footer'
import WorkerPanelInfo from './workerPanelInfo'

export default function WorkerPanelSite() {
  const [field, setField] = useState('visitsField')
  //display appropiate site when certain priviliges are met

  //get user data
  const data = ''

  async function showVisits() {
    await fetch('/showVisits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: ReactSession.get("username")
      })
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res)
    })
    .catch(error => console.error(error))

  }

  async function addVisit() {
    const date = document.querySelector('#inputDate').value
    const hour = document.querySelector('#inputHour').value

    await fetch('/addVisit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: ReactSession.get("username"),
        dayDate: date,
        dayHour: hour
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.note === "ok") {
        /**
         * react-alert
         */
        alert("dodano!")
      } else {
        alert("blad!!!")
      }
    })
    .catch(error => console.error(error))
  }

  const addVisitField = () => {

  }

  async function showPastVisits() {

  }

  const handleOptionChange = (e) => {
    if (e.target.value === "showVisits") {
      setField("visitsField")
      showVisits()
    } else if (e.target.value === "addVisit") {
      setField("addField")
      addVisitField()
    } else if (e.target.value === "showPastVisits") {
      setField("pastVisitsField")
      showPastVisits()
    } else {
      setField("wieleVisitsField")
      
    }
  }



  return (
    <>
      <Header></Header>
      <section className="flex w-full text-black">
        <div className='w-full text-center text-2xl'>
          <div className='my-5 mx-10 border-b border-neutral-400 shadow shadow-neutral-400'>
            <div className='max-h-20 py-4 border-b border-neutral-400 shadow shadow-neutral-400'>Zmień swoje dane</div>
            <div className='flex flex-row text-left text-base'>


            <WorkerPanelInfo data={data}/>
            <div className='w-full flex'>
              <div className="h-full flex flex-col w-1/12 text-black pt-2 text-center border-r">
                <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="showVisits">Wyswietl/edytuj przyszłe dni</button>
                <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="addVisit">Dodaj wizyte</button>
                <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="addWieleVisits">Dodaj wiele..</button>
                <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="showPastVisits">Wyswietl wszystkie dni</button>
              </div>

              <div id="workerContent" className="h-full text-black">
                <div id="visitsField" className={`flex ${"visitsField" !==field ? "hidden" : 'block'}`}>
visiting!!
                </div>
                <div id="addField" className={`flex ${"addField" !==field ? "hidden" : 'block'}`}>
addin1!! 

                  <label htmlFor="selectDate">
                    wpisz se date
                    </label>
                    <input id="inputDate" type='date'></input><br/>
                    
                    <label htmlFor="">
                      zaznacz godzine -tutaj scrollable fajne bedzie cynie
                      </label>
                      <input id="inputHour" type="text" className="mt-2 w-36 px-4 py-2 border border-gray-300 rounded-md">
                    </input>

                    <button className="p-2 hover:bg-violet-400" onClick={() => addVisit()}>Dodaj wizytę</button>

                </div>
                <div id="pastVisitsField" className={`flex ${"pastVisitsField" !==field ? "hidden" : 'block'}`}>
olding!!!
                </div>
                <div id="wieleVisitsField" className={`flex ${"wieleVisitsField" !==field ? "hidden" : 'block'}`}>
in build..
                </div>


              </div>

            </div>
          </div>

          </div>
        {/* aside to show specialties of doctors */}
        {
          /**
           * TODO: dla admina: weryfikacja przez username_id i priviliges. po stronie sv, obroń się przed fetcvh
           * wyswietl tabele ktora pokazuje lekarzy: mozesz dodać lekarza, zmienić imie.nazwisko/adres/dodać godziny.
           * czyli na lewo lekarze, na srodku wybrany lekarz z parametrami, jak klikniesz jakikolwiek element to modal który mówi "zmień dane" 
           */
        }
    
        </div>
      </section>
      <Footer/>
    </>
  )
}