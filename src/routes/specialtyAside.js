import {useState, useEffect} from 'react'
import arrow from './img/arrow.png'


// specjalizacje - we receive array of objects containing specialty's name and description
export default function SpecialtyAside({chooseSpecialty, selectedSpecialty}) {
  /**
   * set specialty in localStorage
   */

  const [specialties, setSpecialties] = useState([{}])
  
    useEffect(() => {
      fetch("/api?data=specialtyData")
      .then( 
        res => res.json()
      ).then( 
        data => {
          setSpecialties(data.specjalizacje)
        })
      }, [])

  /**
   * ternary inside for loading default specialty
   */
  return (
    <>
    <section id='specialtiesAside' className='flex flex-row w-1/4 mt-10 text-black '>
      <div id='specialtiesNames' className='z-10 h-auto w-36 flex flex-col bg-neutral-100 shadow shadow-neutral-400'>
        {typeof specialties === 'undefined' ? (
          <p>Wczytywanie danych..</p>
        ) : specialties?.map((specialty, i) => (
            <div key={i} name={specialty.nazwa} className={`w-full  py-2 px-4 text-sm ${selectedSpecialty === "okulista" && i===0 ? 'bg-violet-400 hover:text-white' : 'hover:bg-violet-400 hover:text-white'} cursor-pointer`} title={specialty.opis} onClick={(e) => chooseSpecialty(e)}>
              {specialty.nazwa}
            </div>
          ))
        }
      </div>
      <div className='z-0 flex w-36 text-black text-xl font-semibold font-center flex flex-col text-right'>
          Wybierz dział!
          <img className='h-72 w-36' src={arrow} alt='strzalka na lewo'/>

        </div>
    </section>
    </>
  )
}