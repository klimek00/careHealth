import {useEffect, useState} from 'react'
import SearchBar from './searchBar'
import DisplayDoctors from './displayDoctors'
import RegisterModal from './registerToDoctor-modal'

export default function SearchDoctorsForm({specialty}) {
  const [doctorsData, setDoctorsData] = useState([{}])
  const [modalStatus, setModalStatus] = useState(false)
  const [doctorInfo, setDoctorInfo] = useState('')

  //fetch doctors data
  useEffect(() => {
    try {
      fetch("/api?data=doctorsData")
      .then( 
        res => {
          if (!res.ok) throw new Error('blad przy pobieraniu')
          return res.json()
        }
      )
      .then( 
        res => {
          setDoctorsData(res.data)
        })
      .catch(error => {throw new Error(error)})
    } catch(error) {
      console.error(error)
      throw error
    }
    
  }, [])

  //triggering modalUpdate will turn on/off modal
  const modalUpdate = () => {
    setModalStatus(!modalStatus)
  }

  //get pressed doctor's data, put into state, activate modal
  const doctorPressed = (id) => {
    let pressedDoctorData = specialtyDoctors?.find(doctor => doctor._id === id)  
    setDoctorInfo(pressedDoctorData)
    
    if (!!pressedDoctorData) {
      modalUpdate()
    }
  }
  
  //get doctors from chosen specialty 
  // move it more react-readable (useeffect in on document loaded and on change of specialty)
  if (specialty) {
    var specialtyDoctors = doctorsData.filter(doctor => {
      return doctor.specialty?.some(spec => {
        return spec.toLowerCase() === specialty.toLowerCase()
      }) 
    })
  }

  // console.log('speicalty:', specialty, 'specialDoctors:', specialtyDoctors)

  return (
  <>
    <div className='border border-neutral-400 shadow shadow-neutral-400 w-1/2 min-w-[36em] py-2 mt-10 text-black'>
      <div id='form' className='w-full flex'>
        <div className='w-full px-4'>
          <div id='form-header' className='h-10 flex border-b border-neutral-400'>
            <div className='w-1/4 text-lg text-center'>
              <span className='inline-block align-middle'>Znajdź lekarza</span>
            </div>
            <div id='choosen-spec' className='w-3/4'>
              <SearchBar/>
            </div>
          </div>
          <div className='h-96 flex flex-col form-body w-full border border-slate-400 mt-2 overflow-auto'>
          {typeof specialtyDoctors === 'undefined' ? (
            <p>Wczytywanie danych..</p>
          ) : <DisplayDoctors doctors={specialtyDoctors} doctorPressed={doctorPressed} specialty={specialty}></DisplayDoctors> }
          </div>
        </div>
      </div>
    </div>
    <RegisterModal modalDisplay={modalStatus} modalClose={modalUpdate} specialty={specialty} doctorInfo={doctorInfo}/>
  </>
  )
}