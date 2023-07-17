import {useEffect, useState, useRef} from 'react'
import Header from './header'
import SpecialtyAside from './specialtyAside'
import SearchDoctorsForm from './searchDoctorsForm'
import Footer from './footer'

export default function SearchDoctorsSite() {
  // we use two different variables, specialty and specialtyElemenent for its uses:
  //  specialty - contains string of specialty for displaying doctors: getAttribute('name').toLowerCase()  
  //  specialtyElement - contains element of specialty which user selects 
  // TODO: add styling on default item
  // const [specialty, setSpecialty] = useState('okulista')

  const [specialtyElement, setSpecialtyElement] = useState('')
  const [specialty, setSpecialty] = useState('okulista')
  const prevSpecialtyElement = useRef('')

  const chooseSpecialty = (e) => {
    setSpecialty(e.target?.getAttribute('name').toLowerCase())
    setSpecialtyElement(e.target)
  }

  useEffect(() => {
    // remove style of selected item if it's already selected
    //make sure prevSpecialtyElement isnt empty object 
    if (!specialtyElement || !specialtyElement.getAttribute('name')) {
      return;
    }
  
    if (prevSpecialtyElement.current && prevSpecialtyElement.current.getAttribute('name')) {
      prevSpecialtyElement.current.classList.remove('bg-violet-400');
    }
  
    specialtyElement.classList.add('bg-violet-400');
    prevSpecialtyElement.current = specialtyElement;
  }, [specialtyElement])


  return (
    <>
      <Header></Header>
      <section className="flex w-full text-white">
        <div className='flex w-full'>
        {/* aside to show specialties of doctors */}
        <SpecialtyAside chooseSpecialty={chooseSpecialty} selectedSpecialty={specialty}></SpecialtyAside>
        {specialty && <SearchDoctorsForm specialty={specialty}>

        </SearchDoctorsForm>}

        </div>
      </section>
      <Footer/>
    </>
  )
}