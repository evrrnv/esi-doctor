import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { faUser, faUsers } from '@fortawesome/fontawesome-free-solid'
import { useDispatch, useSelector } from 'react-redux'
import { collecRdvAction, TypeRdvAction, IndvRdvAction } from '../redux/actions'

import PeopleIcon from '@material-ui/icons/People'
import '../assets/css/clend.css'
import RendezVousCollectif from './rendezVousCollectif'
import RendezVousIndividuelle from './rendezVousIndividuelle'
import { useState } from 'react'
import moment from 'moment'

const ChoisirRendezVous = (props) => {
  const [collecRdvModalIsOpen, setCollecRdvModalIsOpen] = useState(false)

  const currentTime = moment().format('HH:mm')
  const nextTime = moment().add(30, 'minutes').format('HH:mm')
  const toggleRdvTypeAfterChoose = (func) => {
    dispatch(TypeRdvAction())
    dispatch(func())
  }

  const toggleTypeRdvModal = useSelector(
    (typeRdv) => typeRdv.toggleTypeRdvModal
  )
  const dispatch = useDispatch()
  return (
    <div>
      <Modal
        isOpen={toggleTypeRdvModal}
        toggle={() => dispatch(TypeRdvAction())}
        className={'content__container'}
        size="xl"
      >
        <ModalBody>
          <div className="">
            <div className="title__container p-5">
              <h2>Choisir le type de rendez-Vous</h2>
            </div>
            <div className="btn__container d-flex justify-content-center align-items-center">
              <button
                className="type__rend__btn mr-4"
                onClick={() => {
                  // dispatch(TypeRdvAction())
                  dispatch(IndvRdvAction())
                }}
              >
                <FontAwesomeIcon icon={faUser} />

                <span>Individual</span>
              </button>
              <button
                className="type__rend__btn ml-4"
                onClick={() => {
                  dispatch(collecRdvAction())

                  // dispatch(TypeRdvAction())
                }}
              >
                <FontAwesomeIcon icon={faUsers} />
                <span>Collectif</span>
              </button>
              <RendezVousCollectif
                currentDate={props.currentDate}
                currentTime={currentTime}
                nextTime={nextTime}
              />
              <RendezVousIndividuelle
                currentDate={props.currentDate}
                currentTime={currentTime}
                studentsAccount={props.studentsAccount}
                onCreerRendezVousIndiv={props.onCreerRendezVousIndiv}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ChoisirRendezVous
