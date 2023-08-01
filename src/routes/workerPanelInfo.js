import React, {useState} from 'react'
import photo from './img/photo.png'
import UpdateInfo from './updateInfo-modal'

export default function WorkerPanelInfo({worker}) {
  //// MODAL
  const [modalStatus, setModalStatus] = useState(false)
  const modalUpdate = () => {
    setModalStatus(!modalStatus)
  }

  //// MODAL CONTENT
  const [field, setField] = useState('')


  const handleVisitClick = (e) => {
    modalUpdate()
    setPressedElem(e.target)
  }

  const setPressedElem = (e) => {
    if (!e.getAttribute("name") && e.getAttribute("name") === '') {
      return
    }
    setField(e.getAttribute("name"))
  }

  
  // console.log(worker)

  //// DEF. STYLES FOR ELEMENTS
  const workerItemLabelStyle = `pt-1 font-semibold text-neutral-600 workerItemLabel basis-64`
  const workerItemBoxStyle = `ml-6 flex p-2 hover:bg-neutral-100 text-black border-b border-neutral-300 cursor-pointer`
  const workerItemContentStyle = `w-72 workerItemContent text-lg`
  const arrowItemStyle = `text-neutral-500 text-xl font-semibold mx-8 float-right`

  return (
    <>
      <div className='workerItemLabel grid grid-flow-row grid-cols-1 grid-row-6 border-r border-neutral-400'>
        <div className='text-center my-1 text-lg font-medium'>
          Główne informacje
        </div>
        <div className={`workerImg ${workerItemBoxStyle}`}>
        <div className={workerItemLabelStyle}>
          <img src={photo} alt='zdjecie doktora' className='workerImg my-auto ml-10 rounded-full w-16 h-16'/> 
        </div>
            <div className='my-auto'>edit me!</div>
        </div>
        <div className={workerItemBoxStyle} onClick={handleVisitClick}>
          <div className={workerItemLabelStyle} >
            Imie i nazwisko
          </div>  
          <div name='workerName' className={workerItemContentStyle}>
            {worker.username}
          </div>
          <div className={arrowItemStyle}>
            &gt;
          </div>
        </div>

        <div name='workerPlace' className={workerItemBoxStyle} onClick={handleVisitClick}>
        <div name='workerPlace' className={workerItemLabelStyle}>
            Miejsce wizyty
          </div>
          <div name='workerPlace' className={workerItemContentStyle}>
          {worker.place}
          </div>
          <div className={arrowItemStyle}>
            &gt;
          </div>
        </div>
        <div className={workerItemBoxStyle} onClick={handleVisitClick}>
        <div className={workerItemLabelStyle}>
            Nr kontaktowy/email:
          </div>
          <div name='workerContact' className={workerItemContentStyle} onClick={handleVisitClick}>
          {worker.contact && worker.contact.map((e, i) => {
            return (
              <p name='workerContact' key={i}>
                {e}
              </p>
            )
          }
          )}
          </div>
          <div className={arrowItemStyle}>
            &gt;
          </div>
        </div>
        <div className={workerItemBoxStyle} onClick={handleVisitClick}>
        <div className={workerItemLabelStyle}>
            Ustalona cena/wizyta:
          </div>
          <div name='workerPrice' className={workerItemContentStyle}>
            {worker.price || 100} zł
          </div>
          <div className={arrowItemStyle}>
            &gt;
          </div>
        </div>
      </div>
      <UpdateInfo modalDisplay={modalStatus} modalClose={modalUpdate} worker={worker} field={field}/>
    </>
  )
}