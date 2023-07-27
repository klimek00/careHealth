import React, {useState} from 'react'
import { ReactSession } from 'react-client-session'

// ({modalDisplay, modalClose}) 
export default class UpdateVisit extends React.Component {
  constructor(props) {
    super(props)

    
    //// MODAL styling //// 
    this.state = {
      divStyle: this.calcDivStyle(props.modalDisplay),
      msgError: 'fail'
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.modalDisplay !== this.props.modalDisplay) {
      const newDivStyle = this.calcDivStyle(this.props.modalDisplay)
      this.setState({ divStyle: newDivStyle })
    }
  }

  //calculate style for modalDisplay update
  calcDivStyle = (modalDisplay) => {
    return {
      visibility: modalDisplay ? "visible" : "hidden",
      opacity: modalDisplay ? 1 : 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    }
  }

  handleModalClose = (e) => {
    e.stopPropagation()

    this.props.modalClose()
  }


  updateVisit = () => {
    return
  }
  
  deleteVisit = () => {
    console.log(this.props.username)
    try {
      fetch('/deleteVisit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          visitId: this.props.visit._id,
          username: this.props.username,
        })
      })
      .then( 
        res => {
          if (!res.ok) throw new Error("Bad server response")
          return res.json()
        }
      )
      .then(res => {
        if (res.note === 'ok')
          console.log(res)
          alert('pomyslnie usunieto!')
        })
      .catch(error => {throw new Error(error)})
    } catch(error) {
      console.error(error)
      throw error
    }
  }

  render() {
    return (
    <div id="updateVisitModal" className="h-full fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto w-full transition ease-out duration-300" onClick={e => this.handleModalClose(e)} style={this.state.divStyle}>
      <div className="mt-24">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-300 rounded-md mx-auto w-1/4" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              {/* we want only dd-mm-yyyy from date, thus the split */}
              Aktualizacja wizyty: {this.props.visit.dayDate.split('T')[0] || '---'}, {this.props.visit.dayHour}
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={e => this.handleModalClose(e)}>X
            </button>
          </div>
          <div>
            <form>
              <div className="p-6">
              <div id='inputError' className='font-semibold text-red-700 invisible'>{this.state.msgError}</div>
              </div>
              <div className="flex items-center px-6 py-4 border-t border-gray-200 rounded-b">
                <button name="registerBtn" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={this.updateData}>aaktualizuj wizyte</button>
                <button name="registerBtn" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={this.deleteVisit}>usun vizyte</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  }
}