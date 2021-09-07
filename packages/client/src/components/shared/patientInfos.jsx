import React, { useState } from 'react'
import '../../assets/css/shared.css'
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
import NoteElm from './note'


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
                            <img alt="probably avatar of person" src={location.state.props.avatar}/>
                        </div>
                        <div className="informations">
                            <span className="titre">{location.state.props.title}</span>
                            <span className="nomEtprenom">{location.state.props.name}</span>
                            <span className="infos_email">infos_email@esi-sba.dz</span>
                        </div>
                    </div>
                    <div className="numbers d-flex justify-content-between align-items-flex-end">
                        <h1 className="visits_num">00</h1>
                        <span>Nombre totale de visites</span>
                    </div>
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
                                    <span>Mesmoudi</span>
                                    <span>Amine</span>
                                    <span>104 el amir,Tlemcen</span>
                                    <span>077516235586</span>
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
                                    <span>Nov 09,2000</span>
                                    <span>Màle</span>
                                    <span>Célilataire</span>
                                    <span>2SC-SIW</span>
                                </div>
                            </div>
                            <div className="list_item">
                                <div className="item">
                                    <span>Age</span>
                                </div>
                                <div className="item">
                                    <span>20</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="infoTabs_items">
                        <InfosTab text="Biométriques" src={Biometric} onClick={() => setBioInfos(!bioInfos)}/>
                        <InfosTab text="Antécédents Personnells" src={Layer2} onClick={() => setAntInfos(!antInfos)}/>
                        <InfosTab text="Antécédents Médico-Chirugicaux" src={Layer} onClick={() => setMedInfos(!antMedInfos)}/>
                        <InfosTab text="Examens Médicaux" src={group}/>
                    </div>
                    </>:patInofs?
                    <div className="personal_infos_II">
                        <InfoHeader text="Informations Personnelles" icon={personalIcon}/>
                        <div className="inputs">
                            <div className="infos__inputs">
                                <InfoInput text="Nom" name="nom" value="Mesmoudi"/>
                                <InfoInput text="Prénom" name="prenom" value="Amine"/>
                                <InfoInput text="Addresse" name="adresse" value="104 elamir,Tlemcen"/>
                                <InfoInput text="Télephone" name="telephone" value="07658956512"/>
                            </div>
                            <div className="inputs_const">
                                <div className="date_input d-flex align-items-center">
                                    <InfoInput text="Date de naissence" name="birthdate" value="Nov 09,2000"/>                                     
                                    <img src={DateRange}></img>
                                </div>
                                <div className="sexe">
                                    <div className="input__item d-flex align-items-flex-start">
                                        <span>Sexe</span>
                                        <select className="form-control">
                                            <option>Màle</option>
                                            <option>Femàle</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input_select">
                                    <div className="input__item d-flex align-items-flex-start">
                                        <span>Situation Familiale</span>
                                        <select className="form-control">
                                            <option>Célibataire</option>
                                            <option>Marié</option>
                                            <option>Divorcé</option>
                                            <option>Veuf</option>
                                        </select>
                                    
                                    </div>
                                </div>
                                <div className="input_select">
                                    <div className="input__item d-flex align-items-flex-start">
                                        <span>Niveau</span>
                                        <div className="patientInfos_select">
                                            <select class="form-control">
                                                <option>1CPI</option>
                                                <option>2CPI</option>
                                                <option>1CS</option>
                                                <option>2CS-SIW</option>
                                                <option>2CS-ISI</option>
                                                <option>3CS-SIW</option>
                                                <option>3CS-ISI</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BtnChangers onClickAnnuler={() => setPatInfos(!patInofs)} onClickConfirmer={() => setPatInfos(!patInofs)}/>
                    </div>
                :bioInfos?
                <>
                <div className="personal_infos_II">
                    <InfoHeader text="Biométriques" icon={Biometric}/>
                    <div className="bio_div">
                        <div className="inputs">
                            <div className="infos__inputs">
                                <div className="bio_inputs d-flex align-items-center">
                                    <InfoInput text="Taille" name="taille" value="170"/>
                                    <span>cm</span>
                                </div>
                                <div className="bio_inputs d-flex align-items-center">
                                    <InfoInput  text="Poids" name="poids" value="66"/>
                                    <span>kg</span>
                                </div>
                                <InfoInput text="IMC" name="imc" value="text"/>
                            </div>
                        </div>
                    </div>
                    <BtnChangers onClickAnnuler={() => setBioInfos(!bioInfos)} onClickConfirmer={() => setBioInfos(!bioInfos)}/>
                </div>
                </>
                :antInfos?
                <>
                 <div className="personal_infos_II">
                     <InfoHeader text="Antécédents Personnells" icon={Layer2}/>
                     <div className="inputs">
                         <div className="infos__inputs">
                            <Question question="A fumer?"/>
                            <InfoInput text="Jour" name="jour" value="15"/>
                            <Question question="A chiquer?"/>
                            <Question question="A prise?"/>
                         </div>
                        <div className="_inputs_const">
                            <div className="date_input d-flex align-items-center">
                                    <InfoInput text="Alcohol" name="alcohol" value="OUI"/>                                     
                                    <img src={DateRange}></img>
                            </div>
                            <Question question="Médicaments?"/>
                            <div className="input__item_textarea d-flex flex-column">
                                <span>Autres</span>
                                <textarea className="input_textarea form-control" placeholder="Text..."></textarea>
                            </div>
                        </div>
                     </div>
                     <BtnChangers onClickAnnuler={() => setAntInfos(!antInfos)} onClickConfirmer={() => setAntInfos(!antInfos)}/>
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
                                    <input type="text" className="form-control" name="notes" placeholder="Text..." onChange={
                                        (event) =>{
                                            const {value} = event.target  
                                            if (value === '') console.log(value === '' || value === ' ')
                                            else setInput(value)
                                        }
                                    }/>
                                </div>
                                <button className="btn_infos_notes d-flex  align-items-center" onClick={() => {
                                    if (input === "" || input === " ") return;
                                    else{ 
                                        setText([...text,input]);
                                        setInput("");
                                    }
                                    }}>
                                <AddIcon/>  
                                <span>Ajouter une autre note</span>
                                </button>
                            </div> 
                        </div>
                        
                        <div className="infos_notes container">
                            {
        
                                text.map((i) => <NoteElm text={i} />)
                            }
                        </div>
                           
                    </div>
                    <BtnChangers onClickAnnuler={() => setMedInfos(!antMedInfos)} onClickConfirmer={() => setMedInfos(!antMedInfos)}/>
                 </div>
                </>
                :<></>
                }
            </div>
        </div>
    );
}
export default PatientInfos;