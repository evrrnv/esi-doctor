import SideBar from '../components/layout/sideBar'
import '../assets/css/clend.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collecRdvAction, TypeRdvAction } from '../redux/actions'
import AddIcon from '@material-ui/icons/Add'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import ChoisirRendezVous from './choisirRendezVous'
import RendezVousCollectif from './rendezVousCollectif'
import Paper from '@material-ui/core/Paper'
import Loading from '../components/shared/loading'
import {
  ViewState,
  EditingState,
  IntegratedEditing
} from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
  ViewSwitcher,
  Toolbar,
  DayView,
  TodayButton,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui'
import moment from 'moment'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { GET_STUDENT_ALL_INFOS } from '../operations/queries/GET_RENDEZVOUS_INFOS'

const Calend = () => {
  const currentDate = moment().format('YYYY-MM-DD')

  const {
    loading,
    error,
    data
    // }
  } = useQuery(GET_STUDENT_ALL_INFOS)

  const [studentsAccount, setStudentsAccount] = useState([])
  // const [dateDebutIndiv, setDateDebutIndiv] = useState([])
  // const [TempsDebutIndiv, setTempsDebutIndiv] = useState([])

  const [state, setState] = useState({
    data: [],

    addedAppointment: {},
    appointmentChanges: {},
    editingAppointment: undefined
  })
  useEffect(() => {
    if (!error && !loading) {
      const {
        allUserAccounts: { nodes }
      } = data
      setStudentsAccount(nodes)
    }
  })

  const messages = {
    moreInformationLabel: ''
  }
  const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
      return null
    }
    return <AppointmentForm.TextEditor {...props} />
  }

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const PatientInfo = { appointmentData }
    const onFirstNameFieldChange = (nextValue) => {
      onFieldChange({
        PatienInfo: nextValue
      })
    }

    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <AppointmentForm.Label text="First Name" type="title" />
        <AppointmentForm.TextEditor
          value={appointmentData.PatienInfo}
          onValueChange={onFirstNameFieldChange}
          placeholder="First Name"
        />
      </AppointmentForm.BasicLayout>
    )
  }
  const creerRendezVousIndiv = (data) => {
    console.log('this sis the rendez vous ', data)
  }
  const currentDateChange = (currentDate) => {
    setState({ currentDate })
  }
  const commitChanges = ({ added, changed, deleted }) => {
    setState((state) => {
      let { data } = state
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0
        data = [...data, { id: startingAddedId, ...added }]
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        )
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted)
      }
      console.log('this is the new added data ', data)
      return { data }
    })
  }

  // const []
  const dispatch = useDispatch()
  if (loading) return <Loading />
  if (error) return <p>Error :(</p>
  return (
    <div className="calend__main">
      <div>
        <SideBar />
      </div>
      <div className="calend__container">
        <div className="header__container">
          <button
            className="btn__blue ml-auto d-flex align-items-center"
            onClick={() => dispatch(TypeRdvAction())}
            // onClick={() => console.log('this is the emails ', studentsAccount)}
          >
            <AddIcon className="mr-1" />
            <span>Crèer un rendez vous</span>
          </button>
        </div>

        <div>
          <Paper>
            <Scheduler data={state.data}>
              <ViewState
                defaultCurrentDate={currentDate}
                defaultCurrentViewName="Week"
                onCurrentDateChange={currentDateChange}
              />
              <EditingState onCommitChanges={commitChanges} />
              <IntegratedEditing />
              <DayView startDayHour={9} endDayHour={19} />
              <WeekView startDayHour={9} endDayHour={16} />

              <ConfirmationDialog />

              <Toolbar />
              <ViewSwitcher />
              <DateNavigator />
              <TodayButton />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm
                basicLayoutComponent={BasicLayout}
                textEditorComponent={TextEditor}
                messages={messages}
              />
            </Scheduler>
          </Paper>
        </div>
      </div>
      <ChoisirRendezVous
        currentDate={currentDate}
        studentsAccount={studentsAccount}
        onCreerRendezVousIndiv={creerRendezVousIndiv}
      />
    </div>
  )
}

export default Calend
