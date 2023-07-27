import Input from "./input"
import React, {useState, useEffect} from 'react'
import { ReactSession } from 'react-client-session'


export default function UpdateInfo({modalDisplay, modalClose, toChange, field, worker}) {
  const [value, setValue] = useState('')
  const [msgError, setMsgError] = useState('')
  
  //// MAPPING WHICH IITEM TO UPDATE
  const fieldToProperty = {
    workerName: 'username',
    workerPlace: 'place',
    workerContact: 'contact',
    workerPrice: 'price',
  }

  const fieldToHeader = {
    workerName: 'imie i nazwisko',
    workerPlace: 'miejsce wizyty',
    workerContact: 'kontakt',
    workerPrice: 'cena/wizyte',
  }

  //// MODAL UPDATE
  const divStyle = {
    visibility: modalDisplay ? "visible" : "hidden",
    opacity: modalDisplay ? 1 : 0,
    backgroundColor: "rgb(0, 0, 0, 0.6"
  } 

  let handleModalClose = (e) => {
    e.stopPropagation()
    modalClose()
  }

  //// BAD INPUT/ERROR
  let showError = (showError, msg = '') => {
    setMsgError(msg)
    let input = document.querySelector('#inputError')
    input?.classList.toggle('invisible', !showError)
  }

  //// HANDLE/UPDATE INFO
  async function updateInfo() {
    if (value === "" || value === 0) {
      showError(true, "wprowadzono niewlasciwe dane!")
      return
    }

    if (fieldToProperty[field] === "price") {
      try {
        setValue(parseFloat(value))
        if (isNaN(value) || value === 0) {
          showError(true, "wprowadzono zla liczbe!")
          return
        }
      }catch(error) {
        console.log(error)
        return
      }
    }
    await fetch('/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: ReactSession.get("username"),
        field: fieldToProperty[field],
        value: value
      })
    })
    .then((response) => {
      //handle here server errors
      if (response.status >= 500) {
        throw new Error('Brak połączenia z serwerem!!')
      }
      return response?.json()
    })
    .then((response) => {
      if (response.note === 'ok') {
        console.log("OK!")
        // i mean. what can go wrong right?
        alert(`zmieniono na ${value}`)
        document.location.reload()
      } else {
        const error = new Error('nieznany błąd!');
        error.errors = response?.errors;
        throw error;

        // I HAVE NO ABSOLUTE IDEA WHY THE THING BELOW DOESNT WORK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        // throw new Error('nieznany błąd!', {"errors": response?.errors})
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  let handleChange = (e) => {
    setValue(e.target.value)
  }


  useEffect(() => {
    if (!field) return
    
    const propertyName = fieldToProperty[field]
    const propertyHeader = fieldToHeader[field]
    document.querySelector('#updateInfoInput').value = worker[propertyName] || 'err'
    document.querySelector('#updateInfoHeader').textContent = propertyHeader || 'err'

  }, [field])
  //// 

  return (
    <div className="h-full fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto w-full transition ease-out duration-300" onClick={e => handleModalClose(e)} style={divStyle}>
      <div className="mt-24">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-300 rounded-md mx-auto w-1/4" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
            Aktualizowanie danych: <span id='updateInfoHeader'></span>
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={e => handleModalClose(e)}>X
            </button>
          </div>
          <div>
            <form>
              <div className="p-6">
                <Input onChange={handleChange} label={toChange} id='updateInfoInput'/>
                {field === "workerPrice" && "zł"}
              <div id='inputError' className='font-semibold text-red-700 invisible'>{msgError}</div>
              </div>
              <div className="flex items-center px-6 py-4 border-t border-gray-200 rounded-b">
                <button name='loginBtn' type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => updateInfo()}>aktualizuj dane</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}