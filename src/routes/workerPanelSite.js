import {useState} from 'react'
import Header from './header'
import Footer from './footer'

export default function WorkerPanelSite() {

  return (
    <>
      <Header></Header>
      <section className="flex w-full text-white">
        <div className='flex w-full'>
        {/* aside to show specialties of doctors */}
        {
          /**
           * wyswietl tabele ktora pokazuje lekarzy: mozesz dodać lekarza, zmienić imie.nazwisko/adres/dodać godziny.
           * czyli na lewo lekarze, na srodku wybrany lekarz z parametrami, jak klikniesz jakikolwiek element to modal który mówi "zmień dane" 
           */
        }
        <table>
          xd
        </table>
        </div>
      </section>
      <Footer/>
    </>
  )
}