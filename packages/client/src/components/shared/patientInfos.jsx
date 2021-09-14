import React, { useState } from 'react'
import '../../assets/css/patientInfos.css'
import {useLocation,useHistory} from 'react-router-dom'
import SideBar from '../layout/sideBar'
import personalIcon from '../../assets/images/open-person.png'
import Biometric from '../../assets/images/fingerprint.png'
import Layer from '../../assets/images/Layer.png'
import Layer2 from '../../assets/images/Layer2.png'
import group from '../../assets/images/group.png'
import ModifierButton from './button' 
import InfoHeader from './infoHeader'
import InfoInput from './inputInfos'
import InfosTab from './infosTab'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import DateRange from '../../assets/images/date-range.png'
import BtnChangers from './btnChanger'
import Question from './questionInput'
import AddIcon from '@material-ui/icons/Add';
import { useMutation, useQuery } from '@apollo/client';
import Loading from './loading'
import { PATIENTS_PERSONAL_INFO } from '../../graphql/queries/PATIENTS_PERSONAL_INFO'
import { calculateAge, convertDateToReadable, readNiveau, readSexe, capitalizeFirstLetter, writeSexe, writeNiveau, stringToBoolean } from '../../utils'
import { UPDATE_PERSONAL_INFORMATION } from '../../graphql/mutations/UPDATE_PERSONAL_INFORMATION'
import { UPDATE_BIOMETRIQUE } from '../../graphql/mutations/UPDATE_BIOMETRIQUE'
import { UPDATE_ANTECEDENTS_PERSONNELLES } from '../../graphql/mutations/UPDATE_ANTECEDENTS_PERSONNELLES'
import { UPDATE_ANTECEDENTS_MEDICO_CHIRUGICAUX } from '../../graphql/mutations/UPDATE_ANTECEDENTS_MEDICO_CHIRUGICAUX'
import '../../assets/css/notes.css'
import DeleteIcon from '../../assets/images/delete.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

const ObjList = (i,j,k) => {
    return {title:i,text:j,unit:k};
}
const InfosCont = (props) =>{
    return(
        <div className="text_content_dtails">
            <div className="text_content d-flex">
                <span>{props.title}</span>
                <div className="infos_item_content">
                    <span>{props.text}</span>
                    <span>{props.unit}</span>
                </div>
            </div>
        </div>
    );
}
const NoteItem = (props) =>{
    return(
         <div className="notes_text d-flex align-items-center">
               <span>{props.text}</span>
               <button className="btn-delete" onClick={props.pushIt}><img src={DeleteIcon}/></button> 
         </div>
    );
}
const NoteElm = (props) =>{ 
    let SuppArray = [];  

  
    return(
        <div className="Notes_items d-flex flex-column">
            <div className="notes_area">
            {  
               
               props.text.map((i,k) =><NoteItem key={i+'_'+k} text={i} 
               pushIt={() =>{props.onClick(props.text.filter(e => {return i != e}))
            }}/>) 
            
            }
            </div>
        </div>
    );
}
const BioDetail = (props) =>{
    const [indicat,setIndicat]=useState(false)
    return(
      <div className="details_bio d-flex" onClick={()=> setIndicat(!indicat)}>
        <div className="empty_" style={props.isCompleted ? {backgroundColor: "#56C596"} : {backgroundColor: '#F63232'}}>
        </div>
        <div className="details_info_tab d-flex flex-column">
            <InfosTab text={props.text} src={props.src} onClick={props.onClick}/>
            {indicat && <div className="details_personal_info d-flex flex-column">
                    {   
                        props.items.map((elemt) =><InfosCont title={elemt.title} text={elemt.text} unit={elemt.unit}/>)
                    }
                </div>
            }
       </div>
      </div>  
    );
}



const PatientInfos = (props)=>{
    const location = useLocation();
    const history = useHistory();
    const [patInofs,setPatInfos]=useState(false);
    const [bioInfos,setBioInfos]=useState(false);
    const [antInfos,setAntInfos]=useState(false);
    const [antMedInfos,setMedInfos]=useState(false);
    const [exmInfos,setExm]=useState(false)
    const [input,setInput] = useState("");
    const [text,setText] = useState([])
    const [updateLoading, setUpdateLoading] = useState(false)

    const nomRef = React.createRef();
    const prenomRef = React.createRef();
    const adresseRef = React.createRef();
    const telephoneRef = React.createRef();
    const datedenaissanceRef = React.createRef();
    const sexeRef = React.createRef();
    const familyStatusRef = React.createRef();
    const niveauRef = React.createRef();

    const poidRef = React.createRef();
    const tailleRef = React.createRef();
    const imcRef = React.createRef();

    const fumerRef = React.createRef();
    const jouresDeCigarattesRef = React.createRef();
    const chiquerRef = React.createRef();
    const priseRef = React.createRef();
    const alcoolRef = React.createRef();
    const medicamentsRef = React.createRef();
    const autresRef = React.createRef();

    const id = location.search.split("=")[1]
    
    const { loading, error, data } = useQuery(PATIENTS_PERSONAL_INFO, {
        variables: { id },
        onCompleted: (queryData) => {
            const txt = queryData.userAccountById.dossierMedicalsByUserId.nodes[0].antecedentsMedicoChirugicauxById.affectionsCongenitales
            if (txt) setText(txt)
        }
    });

    const [updatePersonal] = useMutation(UPDATE_PERSONAL_INFORMATION, {
        update(cache, { data: updatedData }) {
            const existingCache = cache.readQuery({ 
                query: PATIENTS_PERSONAL_INFO,
                variables: { id }
            })
            
            const newData = { ...existingCache }
            newData.userAccountById = updatedData.updateUserAccountById.userAccount

            cache.writeQuery({
                query: PATIENTS_PERSONAL_INFO,
                variables: { id },
                data: newData
            })
            setUpdateLoading(false)
        }
    })

    const [updateBiometrique] = useMutation(UPDATE_BIOMETRIQUE, {
        update(cache, { data: updatedData }) {
            const existingCache = cache.readQuery({ 
                query: PATIENTS_PERSONAL_INFO,
                variables: { id }
            })

            const newData = JSON.parse(JSON.stringify(existingCache))
            
            newData.userAccountById.dossierMedicalsByUserId.nodes[0].biometriqueById = updatedData.updateBiometriqueById.biometrique
            
            cache.writeQuery({
                query: PATIENTS_PERSONAL_INFO,
                variables: { id },
                data: newData
            })
            setUpdateLoading(false)
        }
    })

    const [updateAntecedentsPersonnelles] = useMutation(UPDATE_ANTECEDENTS_PERSONNELLES, {
        update(cache, { data: updatedData }) {
            const existingCache = cache.readQuery({ 
                query: PATIENTS_PERSONAL_INFO,
                variables: { id }
            })

            const newData = JSON.parse(JSON.stringify(existingCache))

            newData.userAccountById.dossierMedicalsByUserId.nodes[0].antecedentsPersonnelleById = updatedData.updateAntecedentsPersonnelleById.antecedentsPersonnelle

            cache.writeQuery({
                query: PATIENTS_PERSONAL_INFO,
                variables: { id },
                data: newData
            })

            setUpdateLoading(false)
        }
    })
    const [updateAntecedentsMedicoChirugicaux] = useMutation(UPDATE_ANTECEDENTS_MEDICO_CHIRUGICAUX, {
        update(cache, { data: updatedData }) {
            const existingCache = cache.readQuery({ 
                query: PATIENTS_PERSONAL_INFO,
                variables: { id }
            })

            const newData = JSON.parse(JSON.stringify(existingCache))
            
            newData.userAccountById.dossierMedicalsByUserId.nodes[0].antecedentsMedicoChirugicauxById = updatedData.updateAntecedentsMedicoChirugicauxById.antecedentsMedicoChirugicaux

            cache.writeQuery({
                query: PATIENTS_PERSONAL_INFO,
                variables: { id },
                data: newData
            })

            setUpdateLoading(false)
        }
    })
    const examinRouteChange = () =>{ 
        history.push({
            pathname: "/examiner",
        })
    }
    if (loading || updateLoading) return <Loading />
    if (error) return <p>Error :(</p>;

    const { userAccountById : user } = data

    const dossierMedicalsByUserId = user.dossierMedicalsByUserId.nodes[0].id
    const biometriqueById = user.dossierMedicalsByUserId.nodes[0].biometriqueById
    const antecedentsPersonnelleById = user.dossierMedicalsByUserId.nodes[0].antecedentsPersonnelleById
    const antecedentsMedicoChirugicauxById = user.dossierMedicalsByUserId.nodes[0].antecedentsMedicoChirugicauxById

    return(
        <div className="main_">
            <SideBar/>
            {
            (!patInofs&&!bioInfos&&!antInfos&&!antMedInfos&&!exmInfos)&&
            <button onClick={()=>history.goBack()} className="drop_down d-flex  burger">
            <ArrowBackIosIcon fontSize="large"/></button>
            }
            <div className="patient_infos d-flex justify-content-between align-items-flex-end">
                <div className="general_infos d-flex justify-content-between align-items-center">
                    <div className="main__infos d-flex justify-content-between align-items-center">
                        <div className="personal__img">
                            <img alt="probably avatar of person" src="https://images.unsplash.com/photo-1560329072-17f59dcd30a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=767&q=80"/>
                        </div>
                        <div className="informations">
                            <span className="titre">{capitalizeFirstLetter(user.role)}</span>
                            <span className="nomEtprenom">{user.nom} {user.prenom}</span>
                            <span className="infos_email">{user.email}</span>
                        </div>
                    </div>
                    
                    <div className="numbers d-flex justify-content-between align-items-flex-end">
                        <h1 className="visits_num">00</h1>
                        <span>Nombre totale de visites</span>
                    </div>
                </div>
                <div className="pat_examin_btn">
                    <button className="dossier__btns dossier__exam" onClick={examinRouteChange}>Examiner<FontAwesomeIcon className="dossierCard__icons" icon={faStethoscope}/></button>
                    </div>
                {(!patInofs&&!bioInfos&&!antInfos&&!antMedInfos&&!exmInfos)?
                    <>
                    <div className="personal_infos">
                        <div className="head_infos d-flex justify-content-between align-items-center">
                            <div className="main_head_infos d-flex justify-content-between align-items-center ">
                                <img alt="personal_icons" src={personalIcon}/>
                                <h1>Informations Personnelles</h1>
                            </div>
                            <ModifierButton onClick={() => setPatInfos(!patInofs)}/>
                        </div>
                                
                        <div className="all_infos">
                            <div className="list_item">
                                <div className="item">
                                    <span>Nom</span>
                                    <span>Prénom</span>
                                    <span>Addresse</span>
                                    <span>Télephone</span>
                                </div>
                                <div className="item">
                                    <span>{user.nom}</span>
                                    <span>{user.prenom}</span>
                                    <span>{user.adresse}</span>
                                    <span>{user.telephone}</span>
                                </div>              
                            </div>
                            <div className="list_item">
                                <div className="item">
                                    <span>Date de Naissance</span>
                                    <span>Sexe</span>
                                    <span>Situation Familiale</span>
                                    <span>Niveau</span>
                                </div>
                                <div className="item">
                                    <span>{convertDateToReadable(user.datedenaissance)}</span>
                                    <span>{readSexe(user.sexe)}</span>
                                    <span>{capitalizeFirstLetter(user.familyStatus)}</span>
                                    <span>{readNiveau(user.niveau, user.specialite)}</span>
                                </div>
                            </div>
                            <div className="list_item">
                                <div className="item">
                                    <span>Age</span>
                                </div>
                                <div className="item">
                                    <span>{calculateAge(user.datedenaissance)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="infoTabs_items">
                        <BioDetail isCompleted={biometriqueById.isCompleted} items={[ObjList("taille",170,"Cm"),ObjList("Poids",66,"kg"),ObjList('IMC',"this is my test")]} text="Biométriques" src={Biometric} onClick={() => setBioInfos(!bioInfos)}/> 
                        <BioDetail isCompleted={antecedentsPersonnelleById.isCompleted} items={[ObjList("A Fumer ?","OUI"),ObjList("Jour",15),ObjList("A Chiquer?","OUI"),ObjList("A Prise?","OUI"),ObjList("Alcohol","OUI"),ObjList("Médicament","OUI"),ObjList("Autres","Text ...")]} text="Antécédents Personnells" src={Layer2} onClick={() => setAntInfos(!antInfos)}/>
                        <BioDetail isCompleted={antecedentsMedicoChirugicauxById.isCompleted} items={[ObjList("Affection Congénitales","some text")]} text="Antécédents Médico-Chirugicaux" src={Layer} onClick={() => setMedInfos(!antMedInfos)}/>
                        <BioDetail items={[]} text="Examens Médicaux" src={group}/>
                    </div>

                    </>:patInofs?
                    <div className="personal_infos_II">
                        <InfoHeader text="Informations Personnelles" icon={personalIcon}/>
                        <div className="inputs">
                            <div className="infos__inputs">
                                <InfoInput text="Nom" name="nom" value={user.nom} ref={nomRef} />
                                <InfoInput text="Prénom" name="prenom" value={user.prenom} ref={prenomRef}/>
                                <InfoInput text="Addresse" name="adresse" value={user.adresse} ref={adresseRef}/>
                                <InfoInput text="Télephone" name="telephone" value={user.telephone} ref={telephoneRef}/>
                            </div>
                            <div className="inputs_const">
                                <div className="date_input d-flex align-items-center">
                                    <InfoInput text="Date de naissence" name="birthdate" value={user.datedenaissance} ref={datedenaissanceRef}/>                                     
                                    <img src={DateRange}></img>
                                </div>
                                <div className="sexe">
                                    <div className="input__item d-flex align-items-flex-start">
                                        <span>Sexe</span>
                                        <select className="form-control" defaultValue={user.sexe} ref={sexeRef}>
                                            <option></option>
                                            <option value="M">Mâle</option>
                                            <option value="F">Femelle</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input_select">
                                    <div className="input__item d-flex align-items-flex-start">
                                        <span>Situation Familiale</span>
                                        <select className="form-control" defaultValue={capitalizeFirstLetter(user.familyStatus)} ref={familyStatusRef}>
                                            <option></option>
                                            <option value="Celibataire">Celibataire</option>
                                            <option value="Marie">Marie</option>
                                            <option value="Divorce">Divorce</option>
                                            <option value="Veuf">Veuf</option>
                                        </select>
                                    
                                    </div>
                                </div>
                                <div className="input_select">
                                    <div className="input__item d-flex align-items-flex-start">
                                        <span>Niveau</span>
                                        <div className="patientInfos_select">
                                            <select className="form-control" defaultValue={readNiveau(user.niveau, user.specialite)} ref={niveauRef}>
                                                <option></option>
                                                <option value="1CP">1CP</option>
                                                <option value="2CP">2CP</option>
                                                <option value="1SC">1SC</option>
                                                <option value="2SC-SIW">2SC-SIW</option>
                                                <option value="2SC-ISI">2SC-ISI</option>
                                                <option value="3SC-SIW">3SC-SIW</option>
                                                <option value="3SC-ISI">3SC-ISI</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BtnChangers onClickAnnuler={() => setPatInfos(!patInofs)} onClickConfirmer={() => {
                            setPatInfos(!patInofs)
                            const { niveau, specialite } = writeNiveau(niveauRef.current.value)
                            setUpdateLoading(true)
                            updatePersonal({ variables: {
                                id,
                                data: {
                                    nom: nomRef.current.value.trim() || null,
                                    prenom: prenomRef.current.value.trim() || null,
                                    adresse: adresseRef.current.value.trim() || null,
                                    telephone: telephoneRef.current.value.trim() || null,
                                    datedenaissance: datedenaissanceRef.current.value.trim() || null,
                                    sexe: sexeRef.current.value || null,
                                    niveau: niveau || null,
                                    specialite: specialite || null,
                                    familyStatus: familyStatusRef.current.value.toUpperCase() || null
                                }
                            } })
                        }}/>
                    </div>
                :bioInfos?
                <>
                <div className="personal_infos_II">
                    <InfoHeader text="Biométriques" icon={Biometric}/>
                    <div className="bio_div">
                        <div className="inputs">
                            <div className="infos__inputs">
                                <div className="bio_inputs d-flex align-items-center">
                                    <InfoInput text="Taille" name="taille" value={biometriqueById.taille} ref={tailleRef}/>
                                    <span>cm</span>
                                </div>
                                <div className="bio_inputs d-flex align-items-center">
                                    <InfoInput  text="Poids" name="poids" value={biometriqueById.poid} ref={poidRef}/>
                                    <span>kg</span>
                                </div>
                                <InfoInput text="IMC" name="imc" value={biometriqueById.imc} ref={imcRef}/>
                            </div>
                        </div>
                    </div>
                    <BtnChangers onClickAnnuler={() => setBioInfos(!bioInfos)} onClickConfirmer={() => {
                        setBioInfos(!bioInfos)
                        setUpdateLoading(true)
                        updateBiometrique({
                            variables: {
                                id: dossierMedicalsByUserId,
                                data: {
                                    poid: parseInt(poidRef.current.value.trim()) || null,
                                    imc: parseInt(imcRef.current.value.trim()) || null,
                                    taille: parseInt(tailleRef.current.value.trim()) || null
                                }
                            }
                        })
                    }}/>
                </div>
                </>
                :antInfos?
                <>
                 <div className="personal_infos_II">
                     <InfoHeader text="Antécédents Personnells" icon={Layer2}/>
                     <div className="inputs">
                         <div className="infos__inputs">
                            <Question question="A fumer?" value={antecedentsPersonnelleById.fumer} ref={fumerRef}/>
                            <InfoInput text="Jour" name="jour" value={antecedentsPersonnelleById.jouresDeCigarattes} ref={jouresDeCigarattesRef}/>
                            <Question question="A chiquer?" value={antecedentsPersonnelleById.chiquer} ref={chiquerRef}/>
                            <Question question="A prise?" value={antecedentsPersonnelleById.prise} ref={priseRef}/>
                         </div>
                        <div className="_inputs_const">
                            <Question question="Alcohol" value={antecedentsPersonnelleById.prise} ref={alcoolRef}/>
                            <Question question="Médicaments?" value={antecedentsPersonnelleById.medicaments} ref={medicamentsRef}/>
                            <div className="input__item_textarea d-flex flex-column">
                                <span>Autres</span>
                                <textarea className="input_textarea form-control" placeholder="Text..." defaultValue={antecedentsPersonnelleById.autres} ref={autresRef}></textarea>
                            </div>
                        </div>
                     </div>
                     <BtnChangers onClickAnnuler={() => setAntInfos(!antInfos)} onClickConfirmer={() => {
                         setAntInfos(!antInfos)
                         setUpdateLoading(true)
                         const fumer = stringToBoolean(fumerRef.current.value)
                         const jouresDeCigarattes = parseInt(jouresDeCigarattesRef.current.value.trim())
                         const chiquer = stringToBoolean(chiquerRef.current.value)
                         const prise = stringToBoolean(priseRef.current.value)
                         const alcool = stringToBoolean(alcoolRef.current.v.btn_infosalue)
                         const medicaments = stringToBoolean(medicamentsRef.current.value)
                         const autres = autresRef.current.value.trim()
                         updateAntecedentsPersonnelles({
                             variables: {
                                id: dossierMedicalsByUserId,
                                data: {
                                    fumer: fumer != null ? fumer : null,
                                    jouresDeCigarattes: jouresDeCigarattes || null,
                                    chiquer: chiquer != null ? chiquer : null,
                                    prise: prise != null ? prise : null,
                                    alcool: alcool != null ? alcool : null,
                                    medicaments: medicaments != null ? medicaments : null,
                                    autres: autres || null
                                }
                             }
                         })
                     }}/>
                 </div>
                </>
                :antMedInfos?
                <>
                 <div className="personal_infos_II">
                     <InfoHeader text="Antécédents Médico-Chirugicaux" icon={Layer}/>
                     <div className="inputs">
                        <div className="infos__inputs">
                            <div className="ant_textarea d-flex flex-column">
                                <div className="input__item d-flex align-items-flex-start">
                                    <span>Affection Congénitales</span>
                                    <input type="text" className="form-control" name="notes" value={input} placeholder="Text..." onChange={
                                        (event) =>{
                                            const {value} = event.target  
                                            setInput(value) 
                                        }
                                    }/>
                                </div>
                                <button className="btn_infos_notes d-flex  align-items-center" onClick={() => {
                                    if (input === "" || input === " ") return;
                                    else{ 
                                        if(![...text].includes(input)){
                                        setText([...text,input]);
                                        }
                                        setInput("");
                                    }
                                    }}>
                                        <div className="content_btn_infos">
                                            <AddIcon />  
                                            <span>Ajouter une autre note</span>
                                        </div>
                                </button>
                            </div> 
                        </div>
                        
                        <div className="infos_notes">
                            {
                                <NoteElm text={text} onClick={setText}/>                             
                            }
                             
                        </div>
                           
                    </div>
                    <BtnChangers onClickAnnuler={() => setMedInfos(!antMedInfos)} onClickConfirmer={() => {
                        setMedInfos(!antMedInfos)
                        setUpdateLoading(true)
                        updateAntecedentsMedicoChirugicaux({
                            variables: {
                                id: dossierMedicalsByUserId,
                                data: {
                                    affectionsCongenitales: text
                                }
                            }
                        })
                    }}/>
                 </div>
                </>
                :<></>
                }
            </div>
        </div>
    );
}
export default PatientInfos;