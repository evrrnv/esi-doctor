import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IndvRdvAction } from '../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
const RendezVousIndividuelle = (props) => {
  const dispatch = useDispatch()
  const toggleIndividuelleRdvModal = useSelector(
    (individuelleRdv) => individuelleRdv.toggleIndividuelleRdvModal
  )
  const [dateDebutIndv, setDateDebutIndiv] = useState({
    dateDebut: props.currentDate
  })

  const [tempsDebutIndv, setTempsDebutIndiv] = useState({
    tempDebut: props.currentTime
  })
  const [studentInfo, setStudentInfo] = useState({})
  const [descriptionIndv, setDescriptionIndv] = useState({})

  // const [typingTimeOut,]
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 250
    },
    root: {
      width: 200,
      '& > * + *': {
        marginTop: theme.spacing(3)
      }
    }
  }))
  const defaultProps = {
    options: [
      ...props.studentsAccount,
      {
        nom: 'abdelkader',
        prenom: 'boussiad'
      }
    ],
    getOptionLabel: (option) => `${option.nom} ${option.prenom}`
  }
  const classes = useStyles()
  return (
    <div>
      <Modal
        isOpen={toggleIndividuelleRdvModal}
        toggle={() => dispatch(IndvRdvAction())}
        className={'content__container'}
        size="xl"
      >
        <div className="d-flex flex-column justify-content-center">
          <div className="title__container p-5">
            <h2>Crèer un Rendez Vous Individuelle</h2>
          </div>
        </div>
        <ModalBody>
          <div className="d-flex flex-column justify-content-center">
            <div className="description__container">
              <input
                id="descriptionIndv"
                type="text"
                placeholder="Description"
                className="border__grey pl-3"
              />
            </div>
            <div className="timing__container d-flex mt-4 px">
              <div className="dates__indiv border__grey d-flex justify-content-center align-items-center">
                <span className="mt-3">Date dèbut :</span>
                <form className={classes.container} noValidate>
                  <TextField
                    id="dateDebutIndiv"
                    label="Debut"
                    type="date"
                    defaultValue={props.currentDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={(e) => {
                      const dateDebut = e.target.value
                      setDateDebutIndiv({ dateDebut })
                    }}
                  />
                </form>
              </div>

              <div className="dates__indiv border__grey d-flex justify-content-center align-items-center ml-3">
                <span className="mt-3"> Temps dèbut :</span>
                <form className={classes.container} noValidate>
                  <TextField
                    id="timeIndv"
                    label="Temps dèbut"
                    type="time"
                    defaultValue={props.currentTime}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                    onChange={(e) => {
                      const tempDebut = e.target.value
                      setTempsDebutIndiv({ tempDebut })
                    }}
                  />
                </form>
              </div>
            </div>
            <div className="student__info__container__indv border__grey mt-1 px d-flex align-items-center mb-4">
              <div className="student__email__indiv">
                <Autocomplete
                  style={{ width: 40 + 'vw' }}
                  {...defaultProps}
                  id="debug"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Email D'etudiant"
                      margin="normal"
                    />
                  )}
                  onChange={(e, value) => {
                    console.log('this is student ', value)

                    // console.log('this is student ', student)
                    setStudentInfo({
                      student: value
                    })
                  }}
                />
              </div>
            </div>
            <div className="create_btn_container d-flex justify-content-center align-items-center mt-4">
              <button
                className=""
                onClick={() => {
                  if (Object.keys(studentInfo).length === 0)
                    alert('you must fill the student')
                  else {
                    const appointement = {
                      ...tempsDebutIndv,
                      ...dateDebutIndv,
                      ...studentInfo,
                      description:
                        document.getElementById('descriptionIndv').value
                    }
                    props.onCreerRendezVousIndiv(appointement)
                    dispatch(IndvRdvAction())
                  }
                }}
              >
                Crèer
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default RendezVousIndividuelle
