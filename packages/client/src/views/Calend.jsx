import SideBar from '../components/layout/sideBar'
import '../assets/css/clend.css'
import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui'
import { useState } from 'react'
const Calend = () => {
  const [state, setState] = useState({
    data: [
      {
        title: 'Website Re-Design Plan',
        startDate: new Date(2018, 5, 25, 9, 35),
        endDate: new Date(2018, 5, 25, 11, 30),
        id: 0,
        location: 'Room 1'
      },
      {
        title: 'Book Flights to San Fran for Sales Trip',
        startDate: new Date(2018, 5, 25, 12, 11),
        endDate: new Date(2018, 5, 25, 13, 0),
        id: 1,
        location: 'Room 1'
      }
      // {
      //   title: 'Install New Router in Dev Room',
      //   startDate: new Date(2018, 5, 25, 14, 30),
      //   endDate: new Date(2018, 5, 25, 15, 35),
      //   id: 2,
      //   location: 'Room 2'
      // },
      // {
      //   title: 'Approve Personal Computer Upgrade Plan',
      //   startDate: new Date(2018, 5, 26, 10, 0),
      //   endDate: new Date(2018, 5, 26, 11, 0),
      //   id: 3,
      //   location: 'Room 2'
      // },
      // {
      //   title: 'Final Budget Review',
      //   startDate: new Date(2018, 5, 26, 12, 0),
      //   endDate: new Date(2018, 5, 26, 13, 35),
      //   id: 4,
      //   location: 'Room 2'
      // },
      // {
      //   title: 'New Brochures',
      //   startDate: new Date(2018, 5, 26, 14, 30),
      //   endDate: new Date(2018, 5, 26, 15, 45),
      //   id: 5,
      //   location: 'Room 2'
      // },
      // {
      //   title: 'Install New Database',
      //   startDate: new Date(2018, 5, 27, 9, 45),
      //   endDate: new Date(2018, 5, 27, 11, 15),
      //   id: 6,
      //   location: 'Room 1'
      // },
      // {
      //   title: 'Approve New Online Marketing Strategy',
      //   startDate: new Date(2018, 5, 27, 12, 0),
      //   endDate: new Date(2018, 5, 27, 14, 0),
      //   id: 7,
      //   location: 'Room 3'
      // },
      // {
      //   title: 'Upgrade Personal Computers',
      //   startDate: new Date(2018, 5, 27, 15, 15),
      //   endDate: new Date(2018, 5, 27, 16, 30),
      //   id: 8,
      //   location: 'Room 3'
      // }
    ],
    currentDate: '2018-05-25',

    addedAppointment: {},
    appointmentChanges: {},
    editingAppointment: undefined
  })
  const currentDate = '2018-06-27'
  const schedulerData = [
    {
      startDate: '2018-11-01T09:45',
      endDate: '2018-11-01T11:00',
      title: 'Meeting'
    },
    {
      startDate: '2018-11-01T12:00',
      endDate: '2018-11-01T13:30',
      title: 'Go to a gym'
    }
  ]
  return (
    <div className="calend__main">
      {/* {console.log(state.data)}
      <div>
        <SideBar />
      </div>
      <div className="schedular__container"> */}
        <Paper>
          <Scheduler data={state.data}>
            <ViewState defaultCurrentDate={currentDate} />
            <WeekView startDayHour={9} endDayHour={19} />
            <Appointments />
            <AllDayPanel />
          </Scheduler>
        </Paper>
      {/* </div> */}
    </div>
  )
}

export default Calend
