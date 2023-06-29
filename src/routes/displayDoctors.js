import photo from './img/photo.png'

//data contains name of specialty and its doctors
export default function DisplayDoctors({data: {nazwa, lekarze}}) {
  return (
  <>
    {lekarze.map((lekarz, i) => (
      <div key={i} className='w-full flex p-2 hover:bg-slate-200'>
        <img src={photo} className='my-auto ml-10 rounded-full w-16 h-16'/>
        <div id='docInfo' className='w-full ml-10 text-base'>
          <p>{lekarz.imie} {lekarz.nazwisko}, {nazwa}</p>
          <p>Adres: {lekarz.adres}</p>
          <p>cena: <span className='text-orange-600'>{lekarz.cena} zł</span></p>
        </div>
      </div>
    ))}
  </>

  )
}