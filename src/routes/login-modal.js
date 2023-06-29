import Input from "./input"

export default function LoginModal({modalDisplay, modalClose}) {
  const divStyle = {
    visibility: modalDisplay ? "visible" : "hidden",
    opacity: modalDisplay ? 1 : 0,
    backgroundColor: "rgb(0, 0, 0, 0.6"
  } 

  let handleModalClose = (e) => {
    e.stopPropagation()
    modalClose()
  }

  return (
    <div id="loginModal" className="h-full fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto w-full transition ease-out duration-300" onClick={e => handleModalClose(e)} style={divStyle}>
      <div className="mt-24">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-300 rounded-md mx-auto w-1/4" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Logowanie pracownika
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={e => handleModalClose(e)}>X
            {/* <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
            </button>
          </div>
          <div className="p-6">
            <Input label="Podaj swój login"/>
            <Input label="Podaj swoje hasło"/>
          </div>
          <div className="flex items-center px-6 py-4 border-t border-gray-200 rounded-b">
            <button data-modal-hide="loginModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Zaloguj się</button>
          </div>
        </div>
      </div>
    </div>
  )
}