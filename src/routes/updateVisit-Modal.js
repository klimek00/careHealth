import {useState} from 'react'
import { ReactSession } from 'react-client-session'


export default function UpdateVisit({modalDisplay, modalClose}) {
  //// MODAL ////
  const divStyle = {
    visibility: modalDisplay ? "visible" : "hidden",
    opacity: modalDisplay ? 1 : 0,
    backgroundColor: "rgb(0, 0, 0, 0.6"
  } 

  let handleModalClose = (e) => {
    e.stopPropagation()
    modalClose()
  }

  


  let updateData = () => {
    return
  }

  return (
    <div id="updateVisitModal" className="h-full fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto w-full transition ease-out duration-300" onClick={e => handleModalClose(e)} style={divStyle}>
      <div className="mt-24">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-300 rounded-md mx-auto w-1/4" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Aktualizacja wizyty
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={e => handleModalClose(e)}>X
            </button>
          </div>
          <div>
            <form>
              <div className="p-6">
              {/* <div id='inputError' className='font-semibold text-red-700 invisible'>{msgError}</div> */}
              </div>
              <div className="flex items-center px-6 py-4 border-t border-gray-200 rounded-b">
                <button name="registerBtn" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={updateData()}>aaktualizuj dane</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}