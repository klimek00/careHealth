import doctorsData from './data/doctorsData.json'
import SearchBar from './searchBar'
import DisplayDoctors from './displayDoctors'

export default function SearchDoctorsForm() {
  /**
   * TODO: dodaj obsluge aktualnej specjalizacji
   * TODO: dodaj wyszukiwarke
   * TODO: dodaj max-height i scrollable
   */
  
  //get from selected specialty doctors
  let selectedSpecialty = 'Okulista'
  const selectedSpecialtyDoctors = doctorsData?.specjalizacje?.filter(specialty => specialty?.nazwa === selectedSpecialty)[0]

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
          <div className='flex flex-col form-body w-full border border-slate-400 mt-2'>
            <DisplayDoctors data={selectedSpecialtyDoctors}></DisplayDoctors>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}