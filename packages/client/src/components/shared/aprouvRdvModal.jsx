import React ,{useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector,useDispatch } from 'react-redux';
import { AprouvRdvAction } from '../../redux/actions';
import avatar  from '../../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarAlt, faCalendarTimes, faCheckCircle, faClock, faClockAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const AprouvRdvModal = () => {

    const dispatch = useDispatch(); 
    const toggleAprouvRdv = useSelector(aprouvRdv => aprouvRdv.toggleAprouvRdv)
    return (
        <>
             <Modal isOpen={toggleAprouvRdv} toggle={() => dispatch(AprouvRdvAction())}    centered>
              
              <ModalHeader className="modal__head" toggle={() => dispatch(AprouvRdvAction())} ><span className="demand__head__txt">Approbation du rendez-Vous</span></ModalHeader>
      
              <ModalBody className="d-flex flex-column">
                 
                 <div className="aprouv__patient__infos d-flex align-items-center justify-content-around">
                 <img src={avatar} className="aprouv__img " alt="avatar" />
                 <div className="">
                     <h6 className="aprouv__rdv__infos d-flex align-items-center"><p className="aprouv__titles">Nom : </p><p className="aprouv__infos">Mesmoudi</p></h6>
                     <h6 className="aprouv__rdv__infos d-flex align-items-center"><p className="aprouv__titles">Prénom : </p><p className="aprouv__infos">Mmed Amin</p></h6>
                     <h6 className="aprouv__rdv__infos d-flex align-items-center"><p className="aprouv__titles">Niveau : </p><p className="aprouv__infos">1SC</p></h6>
                     <h6 className="aprouv__rdv__infos d-flex align-items-center"><p className="aprouv__titles">Groupe : </p><p className="aprouv__infos">2</p></h6>
                 </div>
                 
                 </div>
                 
             
                 <div className="aprouv__rdv__demand  mt-3">
                     <h4 className="demand__date"><FontAwesomeIcon className="mr-4"  icon={faCalendarAlt}/> 13-09-2021 </h4>
                     <h4 className="demand__timeInterval"><FontAwesomeIcon className="mr-4"  icon={faClock}/> 10:30h <FontAwesomeIcon className="rdv__interval" icon={faLongArrowAltRight}/> 11:00h </h4>
                 </div>
              </ModalBody>
            
              <ModalFooter className=" d-flex justify-content-around">
                  <button className="aprouv__btns aprouv__btn"><FontAwesomeIcon icon={faCheckCircle}/> Approuver</button>
                  <button className="aprouv__btns desaprouv__btn"><FontAwesomeIcon className="mr-2" icon={faCalendarTimes}/>Désapprouver</button>
              </ModalFooter>
           
            </Modal>
        </>
    );
}

export default AprouvRdvModal;
