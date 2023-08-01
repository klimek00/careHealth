import photo from './img/photo.png'

//data contains name of specialty and its doctors
export default function DisplayDoctors({doctors, doctorPressed, specialty}) {

  return (
  <>
    {doctors.map((doctor, i) => (
      <div key={i} className='w-full flex p-2 hover:bg-slate-200 border-b border-neutral-400' onClick={() => doctorPressed(doctor._id)}>
        <img src={photo} alt='zdjecie doktora' className='my-auto ml-10 rounded-full w-16 h-16'/>
        <div id='docInfo' className='w-auto ml-10 text-base'>
          <p>{doctor?.username}, {specialty}</p>
          <p>Adres: {doctor?.place}</p>
          <p>cena: <span className='text-orange-600'>{doctor?.price} zł</span></p>
        </div>
      </div>
    ))}
  </>

  )
}