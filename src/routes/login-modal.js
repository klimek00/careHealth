import Input from "./input"
import {useState} from 'react'
import { ReactSession } from 'react-client-session'


export default function LoginModal({modalDisplay, modalClose}) {
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

  //// MESSAGE ERROR - WHAT GOES WRONG
  const [msgError, setMsgError] = useState('hasła')

  let handleBadInput = (showError, msg = '') => {
    setMsgError(msg)
    let input = document.querySelector('#inputError')
    input?.classList.toggle('invisible', !showError)
  }


  //// INPUT VALIDATION
  let validateUsername = (username) => {
    if (username.length < 3) {
      handleBadInput(true, 'Dlugosc username >= 3!') 
      return false
    } else if (username.match(/^[a-zA-Z0-9]+$/) == null) {
      handleBadInput(true, 'Dozwolone znaki to a-Z, 0-9!') 
      return false
    }
    else {
      handleBadInput(false)
      return true
    }
  }

  let validatePassword = (password) => {
    if (password.length < 8) {
      handleBadInput(true, 'Dlugosc hasla >= 8!') 
      return false
    } else if (password.match(/^[a-zA-Z0-9]+$/) == null) {
      handleBadInput(true, 'Dozwolone znaki to a-Z, 0-9!') 
      return false
    }
    else {
      handleBadInput(false)
      return true
    }
  }

  function handleError(error) {
    handleBadInput(true, error.message || "TOTALNIE nieznany błąd, zgłoś");
    console.error('errors via server:', error?.errors || error);
    console.error('error:', error || error);
  }

  async function handleRegisterPress (e) {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const place    = document.querySelector('#place').value
    const contact  = document.querySelector('#contact').value

    //password validation via validateUsername, validatePassword
    //run again just to make sure everything fine
    if (validateUsername(username) && validatePassword(password)) {
      await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          place:    place,
          contact:  contact,
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
          console.log("OK!", response)
          
          //make the login session server-sided
          ReactSession.set("username", response.username)
          console.log("reactsess from register:", ReactSession.get("username"))
          
          
          handleBadInput(true, 'pomyslnie zarejestrowano!')
        } else if (response.note === 'badPasswordLength') {
          handleBadInput(true, 'Dlugosc hasla >= 8!')
        } else {
          const error = new Error('nieznany błąd!');
          error.errors = response?.errors;
          throw error;

          // I HAVE NO ABSOLUTE IDEA WHY THE THING BELOW DOESNT WORK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          // throw new Error('nieznany błąd!', {"errors": response?.errors})
        }
      })
      .catch(handleError)
    }
  }

  async function handleLoginPress() {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    // register validation === login validation
    if (validateUsername(username) && validatePassword(password)) {
      await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      .then((response) => {
        //handle here server errors
        if (response.status >= 500) {
          handleBadInput(true, 'Brak polaczenia z serwerem')
          throw new Error('Brak połączenia z serwerem!!')
        }
        if (!response.ok) {
          const error = new Error('error at logging!');
          error.errors = response?.errors;
          throw error;
        }
        return response?.json()
      })
      .then((response) => {
        if (response.note === 'ok') {
          console.log("OK!")
          // i mean. what can go wrong right?
          ReactSession.set("username", response.username)
          // ReactSession.set("id", response.id)
          
          handleBadInput(true, 'pomyslnie zalogowano!')
        } else {
          const error = new Error('nieznany błąd!');
          error.errors = response?.errors;
          throw error;

          // I HAVE NO ABSOLUTE IDEA WHY THE THING BELOW DOESNT WORK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          // throw new Error('nieznany błąd!', {"errors": response?.errors})
        }
      })
      .catch(handleError)
    }
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
          <div>
            <form>
              <div className="p-6">
                <Input label="Podaj swój login" id='username' onChange={(e) => validateUsername(e.target.value)}/>
                <Input label="Podaj swoje hasło" id='password' onChange={(e) => validatePassword(e.target.value)}/>
                <Input label="Podaj miejsce zamieszkanai" id='place'/>
                <Input label="Podaj nr kontaktowy" id='contact'/>
              <div id='inputError' className='font-semibold text-red-700 invisible'>{msgError}</div>
              </div>
              <div className="flex items-center px-6 py-4 border-t border-gray-200 rounded-b">
                <button name='loginBtn' type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => handleLoginPress()}>Zaloguj się</button>
                <button name="registerBtn" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={(e) => handleRegisterPress(e)}>rejestruj się</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}