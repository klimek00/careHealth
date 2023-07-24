import { ReactSession } from 'react-client-session'
import React, { useState, useEffect } from 'react'

import Header from './header'
import Footer from './footer'
import WorkerPanelInfo from './workerPanelInfo'
import WorkerPanelAside from './workerPanelAside'

export default function WorkerPanelSite() {
  //prevent displaying data when user not logged in
  if (!ReactSession?.get("username") || ReactSession?.get("username") ===  '') document.location.href='/'
  
  //// SET/GET DATA FROM SERVER
  const [workerData, setWorkerData] = useState('')
  //display appropiate site when certain priviliges are met

  //get user info when user is logged
  useEffect(() => {
    getData()
  }, [ReactSession?.get("username")])


  // TODO: validate with session ID on server side
  async function getData() {
    await fetch('/getWorkerData', {
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
      setWorkerData(res.user)
    })
    .catch((error) => {
      console.error(error)
    })

  }

  return (
    <>
      <Header></Header>
      <section className="flex w-full text-black">
        <div className='w-full text-center text-2xl'>
          <div className='my-5 mx-10 border-b border-neutral-400 shadow shadow-neutral-400'>
            <div className='max-h-20 py-4 border-b border-neutral-400 shadow shadow-neutral-400'>Zmień swoje dane</div>
            <div className='flex flex-row text-left text-base'>
            {
              /**
               * TODO: jako admin masz mozliwosc klikniecia w glowne informacje (inny napis) ktory wyswietli liste lekarzy.
               */
            }
            <WorkerPanelInfo worker={workerData}/>

            <div className='w-full flex'>
              <WorkerPanelAside/>
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