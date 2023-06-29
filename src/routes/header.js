import LoginModal from "./login-modal"
import {useState} from 'react'

export default function Header() {
  const [modalStatus, setModalStatus] = useState(false)
  const modalUpdate = () => {
    setModalStatus(!modalStatus)
    console.log(modalStatus)  
  }

  

  return (
    <>
      <nav className="opacity-80 sticky top-0 flex items-center justify-between flex-wrap bg-neutral-100 p-4 border-b shadow shadow-neutral-600">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          {/* <img className="" src={logo} */}
          <span className="font-semibold text-2xl text-neutral-800"><a href='/'>CareHealth</a></span>
        </div>
        <div className="w-full flex justify-end lg:flex lg:items-center lg:w-auto">
          <div>
            <button className="inline-block text-lg px-4 py-2 text-white rounded-md bg-violet-600 hover:bg-violet-800 shadow shadow-violet-800" onClick={modalUpdate} >Strefa pracownicza</button>
          </div>
        </div>
      </nav>
      {/* so the opacity wont hit our modal */}
      <LoginModal modalDisplay={modalStatus} modalClose={modalUpdate} />
    </>
  )
}