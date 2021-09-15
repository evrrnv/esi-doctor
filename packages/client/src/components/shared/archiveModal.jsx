import React ,{useEffect,useState}from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { archiveAction } from '../../redux/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { selectionSetMatchesResult } from '@apollo/client/cache/inmemory/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faFolderMinus } from '@fortawesome/free-solid-svg-icons';
const ArchiveModal = () => {

    const dispatch = useDispatch(); 
    const toggleArchive = useSelector(archive => archive.toggleArchive)

    const bringPatient = useSelector(patient => patient.bringPatient)

    const [nom , setNom] = useState(bringPatient.nom) 
    const [prenom , setPrenom] = useState(bringPatient.prenom) 


    

    return (
        <>
            <Modal isOpen={toggleArchive} toggle={() => dispatch(archiveAction())} size="md"    centered>
              
             
      
              <ModalBody className="d-flex flex-column">
                  <span className="archive__txt text-center">
                      Voulez-vous archiver ce dossier ?
                  </span>
                  <h1 className="folder__archive text-center mt-3"><FontAwesomeIcon icon={faArchive} /></h1>
              </ModalBody>
            
              <ModalFooter className=" d-flex justify-content-around">
                  <button onClick={() => dispatch(archiveAction())} className="confirm__archive__btns oui__btn">Oui</button>
                  <button onClick={() => dispatch(archiveAction())} className="confirm__archive__btns non__btn">Non</button>
              </ModalFooter>
           
            </Modal>
        </>
    );
}

export default ArchiveModal;
