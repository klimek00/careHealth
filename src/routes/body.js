import { Link } from 'react-router-dom'

export default function Body() {
  /**
   * przycisk dostepnosci czyli powiekszenie czcionki itd
   */
  return (
    <>
    <section className="flex w-full text-white">
      <section className="w-1/2 bg-gradient-to-r from-violet-800 to-violet-500 py-16">
        <div className="mx-auto flex justify-center items-center">
          <div className="text-center">
            <h1 className="font-extrabold text-4xl" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)"}}>Wierzymy w zdrowie.</h1>
            <p className="text-2xl mt-2 opacity-80">Pozwól nam to pokazać.</p>
          </div>
        </div>
      </section>

      <section className="w-1/2 registration-section py-16">
        <div className="mx-auto flex justify-center items-center">
            <Link to='/searchDoctors'>
          <div className="text-center flex justify-center flex-col">
            <button className="registration-title text-lg font-semibold mb-4 text-black">Znajdź swojego lekarza, bądź</button>
            <button className="registration-description text-3xl text-black">Zarejestruj się do nas już teraz!</button>
          </div>
            </Link>
        </div>
      </section>
    </section>
  </>
  )
}