import LoginModal from "./login-modal"
import {useState} from 'react'
import { ReactSession } from 'react-client-session'


export default function Header() {
  const [modalStatus, setModalStatus] = useState(false)
  let username = (ReactSession.get('username')) || ''

  const modalUpdate = () => {
    setModalStatus(!modalStatus)
    console.log(modalStatus)  
  }

  

  return (
    <>
      <nav className="opacity-80 sticky top-0 flex items-center justify-between flex-wrap bg-neutral-100 p-4 border-b shadow shadow-neutral-600 z-50">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          {/* <img className="" src={logo} */}
          <span className="font-semibold text-2xl text-neutral-800 mr-2"><a href='/'>CareHealth</a></span>
          {username && (<div className='text-black font-semibold'>Witaj, {username}</div>)}
        </div>
        <div className="w-full flex justify-end lg:flex lg:items-center lg:w-auto">
          <div>
          {username && <button className="inline-block text-lg px-4 py-2 text-white rounded-md bg-violet-600 hover:bg-violet-800 shadow shadow-violet-800" onClick={() => window.location.href='/workerPanelSite'} >Twój panel</button>}
            <button className="inline-block text-lg px-4 py-2 text-white rounded-md bg-violet-600 hover:bg-violet-800 shadow shadow-violet-800" onClick={modalUpdate} >Strefa pracownicza</button>
          </div>
        </div>
      </nav>
      {/* so the opacity wont hit our modal */}
      <LoginModal modalDisplay={modalStatus} modalClose={modalUpdate} />
    </>
  )
}