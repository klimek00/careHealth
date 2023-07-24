import {React, useState}  from 'react'
import UpdateVisit from './updateVisit-Modal'

export default function VisitsTable({ visits }) {
  //// MODAL
  const [modalStatus, setModalStatus] = useState(false)
  const modalUpdate = () => {
    setModalStatus(!modalStatus)
  }


  const handleVisitClick = (visit) => {
    modalUpdate()
    stuff(visit)
  }

  const stuff = (visit) => {
    console.log(visit)
  }

  return (
    <>
    <table id="visitsTable" className="border border-neutral-400 shadow shadow-neutral-400">
      <thead id="visitsHead" className="bg-violet-400 text-white text-semibold">
        <tr>
          <th className="py-1 px-2">Data wizyty</th>
          <th className="py-1 px-2">Godzina wizyty</th>
          <th className="py-1 px-2">Zajęte?</th>
          <th className="py-1 px-2">Imie pacjenta</th>
        </tr>
      </thead>
      <tbody id="visitsBody">
        {visits.map((visit) => {
          const datePart = visit?.dayDate.split('T')[0]
          return (
            <tr
              key={visit?._id}
              className="border-b border-neutral-400 cursor-pointer"
              onClick={() => handleVisitClick(visit)}
            >
              <td className="py-1 px-2">{datePart}</td>
              <td className="py-1 px-2">{visit?.dayHour}</td>
              <td className="py-1 px-2">
                <input type="checkbox" disabled checked={visit?.occupied} />
              </td>
              <td className="py-1 px-2">{visit?.patient || 'Brak pacjenta'}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <UpdateVisit modalDisplay={modalStatus} modalClose={modalUpdate}/>
    </>
  )
}

