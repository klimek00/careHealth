import {useState} from 'react'
import doctorsData from './data/doctorsData.json'
import SearchBar from './searchBar'
import DisplayDoctors from './displayDoctors'
import RegisterModal from './registerToDoctor-modal'

export default function SearchDoctorsForm({specialty}) {
  const [modalStatus, setModalStatus] = useState(false)
  const [doctorInfo, setDoctorInfo] = useState('')

  //get from doctorsData specialty doctors
  const specialtyDoctors = doctorsData.specjalizacje?.filter(spec => spec.nazwa?.toLowerCase() === specialty)[0]
  // console.log(selectedSpecialtyDoctors)
  
  //triggering modalUpdate will turn on/off modal
  const modalUpdate = () => {
    setModalStatus(!modalStatus)
    // console.log(modalStatus)  
  }

  //get pressed doctor's data, put into state, activate modal
  const doctorPressed = (id) => {
    let pressedDoctorData = specialtyDoctors.lekarze?.find(doctor => doctor.id === id)
    setDoctorInfo(pressedDoctorData)


    if (!!pressedDoctorData) {
      modalUpdate()
    }

  }
  // console.log(specialty)
  /**
   * TODO: dodaj wyszukiwarke
   */
  

  

  return (
  <>
    <div className='border border-neutral-400 shadow shadow-neutral-400 w-1/2 py-2 mt-10 text-black'>
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
            <DisplayDoctors data={specialtyDoctors} doctorPressed={doctorPressed}></DisplayDoctors>
          </div>
        </div>
      </div>
    </div>
    <RegisterModal modalDisplay={modalStatus} modalClose={modalUpdate} specialty={specialty} doctorInfo={doctorInfo}/>
  </>
  )
}