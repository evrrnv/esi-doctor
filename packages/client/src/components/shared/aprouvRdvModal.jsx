import React ,{useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector,useDispatch } from 'react-redux';
import { AprouvRdvAction } from '../../redux/actions';
import avatar  from '../../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarAlt, faCalendarTimes, faCheckCircle, faClock, faClockAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { readNiveau } from '../../utils';
import { useMutation } from '@apollo/client';
import { VALIDATE_RDV } from '../../graphql/mutations/VALIDATE_RDV';
import { GET_DEMENDES_RDV } from '../../graphql/queries/GET_DEMENDES_RDV';

const AprouvRdvModal = () => {

    const dispatch = useDispatch(); 
    const toggleAprouvRdv = useSelector(aprouvRdv => aprouvRdv.toggleAprouvRdv)
    const bringData = useSelector(aprouvRdv => aprouvRdv.bringNotification)

    const [validateRdv] = useMutation(VALIDATE_RDV)

    const i = new Date(bringData.startDate)
    const f = new Date(bringData.endDate)
    var date = i.getDate()+'-'+(i.getMonth()+1)+'-'+i.getFullYear();
    const startTime = i.getHours() + ":" + i.getMinutes() + "h"
    const endTime = f.getHours() + ":" + f.getMinutes() + "h"

    const handleClick = (v) => {
        validateRdv({
            variables: {
                id: bringData.id,
                isValid: v
            },
            update: (cache, {data: updatedData}) => {
              const existingCache = cache.readQuery({ 
                  query: GET_DEMENDES_RDV
              })
              const newData = JSON.parse(JSON.stringify(existingCache))

              const ar = newData.allRendezVous.nodes.filter(item => item.id !== updatedData.updateRendezVousById.rendezVous.id)
              newData.allRendezVous.nodes = ar

              cache.writeQuery({
                  query: GET_DEMENDES_RDV,
                  data: newData
              })
            }
        })
    }

    return (
        <>
             <Modal isOpen={toggleAprouvRdv} toggle={() => dispatch(AprouvRdvAction())}    centered>
              
              <ModalHeader className="modal__head" toggle={() => dispatch(AprouvRdvAction())} ><span className="demand__head__txt">Approbation du rendez-Vous</span></ModalHeader>
      
              <ModalBody className="d-flex flex-column">
                 
                 <div className="aprouv__patient__infos d-flex align-items-center justify-content-around">
                 <img src={bringData.profilePicture} className="aprouv__img " alt="avatar" />
                 <div className="">
                     <h6 className="aprouv__rdv__infos d-flex align-items-center"><p className="aprouv__titles">Nom : </p><p className="aprouv__infos">{bringData.nom}</p></h6>
                     <h6 className="aprouv__rdv__infos d-flex align-items-center"><p className="aprouv__titles">Prénom : </p><p className="aprouv__infos">{bringData.prenom}</p></h6>
                     <h6 className="aprouv__rdv__infos d-flex align-items-center"><p className="aprouv__titles">Niveau : </p><p className="aprouv__infos">{readNiveau(bringData.niveau, bringData.specialite)}</p></h6>
                     <h6 className="aprouv__rdv__infos d-flex align-items-center"><p className="aprouv__titles">Groupe : </p><p className="aprouv__infos">{bringData.groupe}</p></h6>
                 </div>
                 
                 </div>
                 
             
                 <div className="aprouv__rdv__demand  mt-3">
                     <h4 className="demand__date"><FontAwesomeIcon className="mr-4"  icon={faCalendarAlt}/> {date} </h4>
                     <h4 className="demand__timeInterval"><FontAwesomeIcon className="mr-4"  icon={faClock}/> {startTime} <FontAwesomeIcon className="rdv__interval" icon={faLongArrowAltRight}/> {endTime} </h4>
                 </div>
              </ModalBody>
            
              <ModalFooter className=" d-flex justify-content-around">
                  <button onClick={() => {
                      handleClick(true)
                      dispatch(AprouvRdvAction())
                  }}  className="aprouv__btns aprouv__btn"><FontAwesomeIcon icon={faCheckCircle}/> Approuver</button>
                  <button onClick={() => {
                      handleClick(null)
                      dispatch(AprouvRdvAction())
                  }}  className="aprouv__btns desaprouv__btn"><FontAwesomeIcon className="mr-2" icon={faCalendarTimes}/>Désapprouver</button>
              </ModalFooter>
           
            </Modal>
        </>
    );
}

export default AprouvRdvModal;
