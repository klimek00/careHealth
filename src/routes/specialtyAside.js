import react from 'react'
import arrow from './img/arrow.png'


// specjalizacje - we receive array of objects containing specialty's name and description
export default function SpecialtyAside({data: {specjalizacje}, chooseSpecialty}) {

  /**
   * TODO: przy kliknieciu na specyfikacje zatrzymaj bgcolor aby uzytkownik wiedzial co wybral
   * + domyslne po wejsciu
   */
  return (
    <>
    <section className='flex flex-row w-1/4 mt-10 text-black '>
      <div className='z-10 h-auto w-36 flex flex-col bg-neutral-100 shadow shadow-neutral-400'>
        {specjalizacje.map((specialty, i) => (
          <div name={specialty.nazwa} className='w-full py-2 px-4 text-sm hover:bg-violet-400 hover:text-white cursor-pointer' key={i} title={specialty.opis} onClick={(e) => chooseSpecialty(e)}>{specialty.nazwa}</div>
        ))}
      </div>
      <div className='z-0 flex w-36 text-black text-xl font-semibold font-center flex flex-col text-right'>
          Wybierz dział!
          <img className='h-72 w-36' src={arrow} alt='strzalka na lewo'/>

        </div>
    </section>
    </>
  )
}