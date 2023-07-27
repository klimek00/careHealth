import React, { useState, useEffect } from 'react'
import { ReactSession } from 'react-client-session'
import AddVisit from './addVisit'
import VisitsTable from './visitsTable'



export default function WorkerPanelAside() {
    ////WORKER PANEL ASIDE
    const [field, setField] = useState('visitsField')
    const [visits, setVisits] = useState('')
  const handleOptionChange = (e) => {
    if (e.target.value === "getVisits") {
      setField("visitsField")
      getVisits()
    } else if (e.target.value === "addVisit") {
      setField("addField")
      addVisitField()
    } else if (e.target.value === "showPastVisits") {
      setField("pastVisitsField")
      showPastVisits()
    } else if (e.target.value === "addSpecialtyField") {
      setField("addSpecialtyField")
    } else {
      setField("wieleVisitsField")
      
    }
  }

  const addVisitField = () => {
    // TODO...
  }

  async function showPastVisits() {  
    // TODO...
  }

  //get visits data
    async function getVisits() {
      await fetch('/getVisits', {
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
        if (res?.note === 'ok') {
          setVisits(res?.visits)
        }
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
        if (res?.note === "ok") {
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

    function addSpecialty() {
      const specialtyName = document.querySelector('#specialtyInput').value

      try {
        fetch('/addUserSpecialty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: ReactSession.get("username"),
            specialty: specialtyName
          })
        })
        .then(res => {
          if (!res.ok) throw new Error("error within adding specialty")
          return res.json()
        })
        .then (res => {
          if (res.note === 'ok') {
            alert("dodano")
          }
        })
        .catch(error => {
          throw new Error(error)
        })
      } catch(error) {
        console.error(error)
      }

    }

  return (
    <>
      <div className="h-full flex flex-col w-1/12 text-black pt-2 text-center border-r">
        <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="getVisits">Wyswietl/edytuj przyszłe dni</button>
        <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="addVisit">Dodaj wizyte</button>
        <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="addWieleVisits">Dodaj wiele..</button>
        <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="showPastVisits">Wyswietl wszystkie dni</button>
        <button className="p-2 hover:bg-violet-400" onClick={(e) => handleOptionChange(e)} value="addSpecialtyField">Dodaj specjalizacje</button>
      </div>
      <div id="workerContent" className="h-full text-black">
        <div id="visitsField" className={`p-4 flex ${"visitsField" !==field ? "hidden" : 'block'}`}>
          {visits && <VisitsTable visits={visits}/>}
        </div>
        <div id="addField" className={`p-4 flex ${"addField" !==field ? "hidden" : 'block'}`}>
          <AddVisit addVisit={addVisit}/>
        </div>
        <div id="pastVisitsField" className={`p-4 flex ${"pastVisitsField" !==field ? "hidden" : 'block'}`}>
          olding!!!
        </div>
        <div id="wieleVisitsField" className={`p-4 flex ${"wieleVisitsField" !==field ? "hidden" : 'block'}`}>
          in build..
        </div>
        <div id="addSpecialtyField" className={`p-4 flex ${"addSpecialtyField" !==field ? "hidden" : 'block'}`}>
          dodaj specjalizacje uzytkownikowi: <input id="specialtyInput" type="text" className="mt-2 w-36 px-4 py-2 border border-gray-300 rounded-md"/> 
          <button onClick={addSpecialty}>wyslij</button>
        </div>
      </div>
    </>
  )
}