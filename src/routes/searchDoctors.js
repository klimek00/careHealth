import react, {useState} from 'react'
import Header from './header'
import SpecialtyData from './data/specialtyData'
import SpecialtyAside from './specialtyAside'
import SearchDoctorsForm from './searchDoctorsForm'
import Footer from './footer'

export default function SearchDoctors() {
  // we use two different variables, specialty and specialtyElemenent for its uses:
  //  specialty - contains string of specialty for displaying doctors: getAttribute('name').toLowerCase()  
  //  specialtyElement - contains element of specialty which user selects 
  const [specialty, setSpecialty] = useState('okulista')
  const [specialtyElement, setSpecialtyElement] = useState('')

  const chooseSpecialty = (e) => {
    // remove style of selected item if it's already selected
    if (specialtyElement) {
      specialtyElement.classList?.remove('bg-violet-400')
    }

    setSpecialty(e.target?.getAttribute('name').toLowerCase())
    setSpecialtyElement(e.target)
    // we have to use e.target because of react's 'lag'
    e.target?.classList.add('bg-violet-400')
  }

  return (
    <>
      <Header></Header>
      <section className="flex w-full text-white">
        <div className='flex w-full'>
        {/* aside to show specialties of doctors */}
        <SpecialtyAside data={SpecialtyData} chooseSpecialty={chooseSpecialty}></SpecialtyAside>
        <SearchDoctorsForm specialty={(specialty)}>

        </SearchDoctorsForm>

        </div>
      </section>
      <Footer/>
    </>
  )
}