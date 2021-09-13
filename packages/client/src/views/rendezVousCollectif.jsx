import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collecRdvAction } from '../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../assets/css/clend.css'
import { faCalendarDay, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'

const RendezVousCollectif = (props) => {
  const { buttonLabel, className } = props
  const dispatch = useDispatch()

  const toggleCollecRdvModal = useSelector(
    (collecRdv) => collecRdv.toggleCollecRdvModal
  )
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      maxWidth: 140
    },
    root: {
      width: 200,
      '& > * + *': {
        marginTop: theme.spacing(3)
      }
    }
  }))
  const classes = useStyles()
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 }
  ]
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title
  }
  return (
    <>
      <Modal
        isOpen={toggleCollecRdvModal}
        toggle={() => dispatch(collecRdvAction())}
        className={'content__container'}
        size="xl"
      >
        <ModalBody>
          <div className="d-flex flex-column justify-content-center">
            <div className="title__container p-5">
              <h2>Crèer un Rendez Vous Collectif</h2>
            </div>
            <div className="groupe__container border__grey d-flex align-items-center mt-4">
              <Autocomplete
                style={{ width: 19 + 'vw' }}
                {...defaultProps}
                id="debug"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choisir L'annèe"
                    margin="normal"
                  />
                )}
              />

              <select
                className="select__groupe ml-auto"
                name="Groupe"
                id="cars"
              >
                <option value="groupe1">groupe1</option>
                <option value="groupe2">groupe2</option>
                <option value="groupe3"> groupe3 </option>
              </select>
            </div>
            <div className="timing__container d-flex mt-4 px">
              <div
                className="date__infos border__grey d-flex justify-content-center align-items-center"
                id="date__debut"
              >
                <span className="mt-3">Date dèbut :</span>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="Debut"
                    type="date"
                    defaultValue={props.currentDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
              </div>
              <div
                className="date__infos border__grey d-flex justify-content-center align-items-center ml-3"
                id="temp__debut"
              >
                <span className="mt-3"> Temps dèbut :</span>
                <form className={classes.container} noValidate>
                  <TextField
                    id="time"
                    label="Alarm clock"
                    type="time"
                    defaultValue={props.currentTime}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                  />
                </form>
              </div>
              <div
                className="date__infos border__grey d-flex justify-content-center align-items-center ml-3"
                id="temp__debut"
              >
                <span className="mt-3"> Date fin :</span>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="Debut"
                    type="date"
                    defaultValue={props.currentDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
              </div>
              <div
                className="date__infos border__grey d-flex justify-content-center align-items-center ml-3"
                id="temp__debut"
              >
                <span className="mt-3"> Temps fin :</span>
                <form className={classes.container} noValidate>
                  <TextField
                    id="time"
                    label="Alarm clock"
                    type="time"
                    defaultValue={props.nextTime}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                  />
                </form>
              </div>
            </div>
            <div className="student__info__container border__grey mt-1 px d-flex align-items-center ">
              <span className="mt-3 mr-3">
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              <div className="student__email">
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Student Emails"
                      placeholder="Favorites"
                    />
                  )}
                />
              </div>
            </div>
            <div className="create_btn_container d-flex justify-content-center align-items-center mt-4">
              <button className="">Crèer</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default RendezVousCollectif
