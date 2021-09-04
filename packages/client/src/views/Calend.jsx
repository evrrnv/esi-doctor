import React from 'react'
import SideBar from '../components/layout/sideBar'
import '../assets/css/clend.css'
import { useState } from 'react'
import { useEffect } from 'react'
const Calend = () => {
  const [rendezVous, SetRendezVous] = useState({
    date: '4/09/2021',
    rendezVous: [
      {
        appointementSeted: false,
        id: 1,
        timing: {
          from: '8:30',
          to: '8:45'
        },
        student: {
          name: 'abdelkader boussaid',
          class: '3 eme'
        }
      }
    ]
  })
  
  const setIfAppointementAvailble = (rendezVous) => {
    if (!rendezVous.appointementSeted) {
      return <span>rendez vous de {rendezVous.student.name}</span>
    }

    return <button>prendre rendez vous</button>
  }
  return (
    <div className="calend__main main">
      <div className="calend__sidebar">
        <SideBar />
        {console.log('this is rendez vous ', rendezVous)}
      </div>
      <div className="calendar__container">
        <div className="table__container">
          <table className="border__table">
            <thead>
              <tr className="border__table">
                <th className="border__table">Temps</th>
                <th>:15</th>
                <th>:30</th>
                <th>:45</th>
                <th>+1</th>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <td>
                  {' '}
                  <span className="time__col"> 8:00 </span>{' '}
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <span className="time__col"> 9:00 </span>{' '}
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="time__col"> 10:00 </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <span className="time__col"> 11:00 </span>{' '}
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="time__col"> 12:00 </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
                <td>
                  <span> rendex vous </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Calend
