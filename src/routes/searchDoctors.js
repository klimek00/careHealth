import react from 'react'
import Header from './header'
import SpecialtyData from './data/specialtyData'
import SpecialtyAside from './specialtyAside'
import SearchDoctorsForm from './searchDoctorsForm'
import Footer from './footer'

export default function SearchDoctors() {
  // console.log(DoctorsSpecialtyData)

  return (
    <>
      <Header></Header>
      <section className="flex w-full text-white">
        <div className='flex w-full'>
        {/* aside to show specialties of doctors */}
        <SpecialtyAside data={SpecialtyData}></SpecialtyAside>
        <SearchDoctorsForm>

        </SearchDoctorsForm>

        </div>
      </section>
      <Footer/>
    </>
  )
}