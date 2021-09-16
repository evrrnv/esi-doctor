import React, { useState, useRef } from 'react';
import SideBar from '../components/layout/sideBar';
import '../assets/css/examen.css'
import avatar  from '../assets/images/avatar.jpg';
import logo  from '../assets/images/logo.png';
import Cardio  from '../assets/icons/Cardio.svg'
import Digestif  from '../assets/icons/Digestif.svg'
import Ear  from '../assets/icons/Ear.svg'
import Hematologie  from '../assets/icons/Hematologie.svg'
import Locomoteur  from '../assets/icons/Locomoteur.svg'
import Neurologique  from '../assets/icons/Neurologique.svg'
import Peau  from '../assets/icons/Peau.svg'
import Psychology  from '../assets/icons/Psychology.svg'
import Rapportmedical  from '../assets/icons/Rapportmedical.svg'
import Rapport  from '../assets/icons/Rapport.svg'
import Respiratoire  from '../assets/icons/Respiratoire.svg'
import Vision  from '../assets/icons/Vision.svg'
import examen  from '../assets/icons/examen.svg'
import { makeStyles } from '@material-ui/core/styles' 
import produce from 'immer';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Ordonance  from '../assets/icons/Ordonance.svg'
import Certaficat  from '../assets/icons/Certaficat.svg'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { TabContent, TabPane, NavLink} from 'reactstrap';
import classnames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EXAMEN_MEDICAL } from '../graphql/queries/GET_EXAMEN_MEDICAL';
import Loading from '../components/shared/loading';
import { UPDATE_OPHTALMOLOGIQUE, UPDATE_PEAU_MUQUEUSES, UPDATE_RAPPORT } from '../graphql/mutations/UPDATE_EXAMEN_MEDICAL';
import { capitalizeFirstLetter } from '../utils';
import { useReactToPrint } from "react-to-print";

const Examen = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {if(activeTab !== tab) setActiveTab(tab);}

    const location = useLocation();

    const split = location.search.split("=")
    const [userId, examenId] = split[1].split("+")

    const { loading, error, data } = useQuery(GET_EXAMEN_MEDICAL, {
        variables: {
            id: examenId,
            userId
        }
    })

    if (loading) return <Loading />;
    if (error) return <p>Error(:</p>;

    
    return (
        <>
            <div className="mainContent">
                <SideBar />
                <div className="examen_content  d-flex flex-column justify-content-between">
                <div className="infos  d-flex justify-content-between align-items-center">
                    <div className="personal_info d-flex align-items-end">
                        <img className="personal_img"  src={data.userAccountById.profilePicture} alt="" />
                        <div className ="text_infos">
                            <p className="title">{capitalizeFirstLetter(data.userAccountById.role)}</p>
                            <p className="name">{`${data.userAccountById.nom} ${data.userAccountById.prenom}`}</p>
                            <p className="email">{data.userAccountById.email}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-around align-items-center ">
                        <div className="height d-flex flex-column justify-content-between align-items-center ">
                            <h3 className="number">180 cm</h3> 
                            <h4 className="text">Taille</h4>
                        </div>
                        <div className="weight d-flex flex-column justify-content-between align-items-center text-align-center">
                            <h3 className="number">65 kg</h3> 
                            <h4 className="text">Poids</h4>
                        </div>
                    </div>
                </div>
                <div className="empty d-flex flex-row align-items-center">
                    <img className="head_icon_img"  src={examen} alt="Examen Médical"  />
                    <span className="headText">Examen Médical</span>
                </div>
                <div className="headContent d-flex flex-row align-self-center">
                    <div className="emptyContent">
                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} >
                       <HeadBtn name="Rapport Médical" icon={Rapport} id="first" text="rapportBlue" />
                    </NavLink>
                    </div>
                    <div className="emptyContent">
                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} >
                        <HeadBtn name="Ordonnance" icon={Ordonance} /> 
                    </NavLink>
                    </div>
                    <div className="emptyContent">
                    <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }} >
                        <HeadBtn name="Certeficat" icon={Certaficat}  id="last"  />
                    </NavLink>
                    </div>
                </div>
               <div>
               <TabContent activeTab={activeTab}>
                <TabPane tabId="1"> <Exams examenMedical={data.examenMedicalById} /> </TabPane>
                <TabPane tabId="2"> <Ordonnance/> </TabPane>
                <TabPane tabId="3"> <Certeficat/> </TabPane>
               </TabContent> 
               </div>
                </div>
                
                
            </div>

            
        </>
    );

    
}
const Ordonnance = () => {
    const Notes = props => props.data.map(note => <div className="headTableOrdc d-flex flex-row justify-content-between align-items-center">
    <div className="d-flex flex-column align-items-center ">
    <span className="titles">{note.text}</span>
    <span className="desc ml-3">{note.notice}</span>
    </div>
    <span className="titles">{note.qte}</span>
    <span className="titles">{note.duree}</span>
    </div>);
    const initialData = [{ text: 'Médicament' , notice: '' , qte :'Quantité(Boite)' , duree:'Durée du traitement (jours)' },];
    const [data, setData] = useState(initialData);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const text = document.querySelector('#nom').value.trim();
            const qte = document.querySelector('#qte').value.trim();
            const duree = document.querySelector('#duree').value.trim();
            const notice = document.querySelector('#notice').value.trim();
            if (text) {
              const nextState = produce(data, draftState => {
                draftState.push({ text:text ,qte:qte ,  duree:duree , notice : notice});
              });
              document.querySelector('#nom').value = '';
              document.querySelector('#qte').value = '';
              document.querySelector('#duree').value = '';
              document.querySelector('#notice').value = '';

              setData(nextState);
            }    
        }
        
        
      }
    return(
        <div>
           <div className="">
           <Notes data={data} />
           <div className="d-flex flex-row align-items-center justify-content-around">
                <div className= "addNoteOrd d-flex flex-row align-items-center justify-content-around">
                    <FontAwesomeIcon icon={faPlus} size="1x" className="mr-2 ml-2" />
                    <input className="input" id="nom" type="text"  placeholder="Nom du médicament" /><span className="filetypes filetypes-e-7z"></span>
                    <input className="input" id="notice" type="text"  placeholder="Notice" /><span className="filetypes filetypes-e-7z"></span>        
                    <input className="input" id="qte" type="text" placeholder="Qte" /><span className="filetypes filetypes-e-7z"></span>
                    <input className="input" id="duree" type="text" placeholder="Durée" onKeyDown={handleKeyDown} /><span className="filetypes filetypes-e-7z"></span>
                    
                </div>
                <div className= "imprimerOrd d-flex flex-row align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faPrint} size="1x" />
                    <span className="ml-2">Imprimer</span>
                </div>

                </div>               
           </div>
        </div>
    ); 
}
const Certeficat = () => {
    class ComponentToPrint extends React.PureComponent {
        render() {
    
          return (
            <div className="d-flex flex-column align-items-center mt-5">
              <img className="personal_img d-flex align-items-center"  src={logo} alt="" />
              <span style={{ fontSize: "30px", color: "Blue" }} className="mt-2 mb-2"> Ecole Superieure en Informatique 08-MAI-1945 SIDI BEL ABBES</span>
              <span style={{ fontSize: "30px", color: "Blue" }} className="mt-2 mb-2"> Unité médicale </span>
              <span style={{ fontSize: "50px", color: "Blue" }}className="mt-2 mb-5"> CERTEFICAT </span>
              <div style={{ color: "black" ,  fontSize: "30px"}}>
              Je soussigné Docteur………, demuerant………..certifie avoir examiné ce jour monsieur ou madame ... né(e) le…..à……. et avoir constaté ‘altération de ses facultés mentales et/ou corporelles.  
              Ce patient me paraît avoir besoin : 
              </div>
              <div style={{ color: "black" ,  fontSize: "30px"}}>
              Les points mentionnés :
              </div>
            </div>
          );
                }
        
      }
    const Notes = props => props.data.map(note => <div className="noteCertif d-flex flex-column">
        <span className="subtitle">Description</span>
         <div> {note.text} </div>
        </div>);
    const initialData = [{ text: 'Notes' }];
    const [data, setData] = useState(initialData);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const text = document.querySelector('#noteinput').value.trim();
            if (text) {
              const nextState = produce(data, draftState => {
                draftState.push({ text });
              });
              document.querySelector('#noteinput').value = '';
              setData(nextState);
            }
        }
      }
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current});
    return(
        <div className="certif mb-4"> 
            <Notes data={data} />
                <div className= "addNoteCertif d-flex flex-row align-items-center justify-content-around">
                    <FontAwesomeIcon icon={faPlus} size="1.5x" />
                    <input className="input" id="noteinput" type="text" onKeyDown={handleKeyDown} placeholder="Ajouter une autre note" /><span className="filetypes filetypes-e-7z"></span>
                    
                </div>
                <div style={{ display: "none" }}>
                <ComponentToPrint ref={componentRef} />
                </div>
                <div className="d-flex flex-column align-items-end mr-5"  onClick={handlePrint}>
                <Btn id="print" icon={faPrint} name="Imprimer" color="black"  text="print" />
                     </div>
            
        </div>
    ); 
}
const Exams = ({ examenMedical })  => {
    return(
    <div className="exams d-flex flex-column align-items-center"> 
    <Exam name="Rapport Médical" icon={Rapportmedical} examenMedical={examenMedical}/> 
    <Exam name="Peau et Muqueuses" icon={Peau}  examenMedical={examenMedical}/> 
    <Exam name="Ophtalmologique" icon={Vision} examenMedical={examenMedical}/> 
    <Exam name="O.R.L" icon={Ear} examenMedical={examenMedical}/> 
    <Exam name="Locomoteur" icon={Locomoteur} examenMedical={examenMedical}/> 
    <Exam name="Respiratoire" icon={Respiratoire} examenMedical={examenMedical}/> 
    <Exam name="Cardio-vasculaire" icon={Cardio} examenMedical={examenMedical}/> 
    <Exam name="Digestif" icon={Digestif} examenMedical={examenMedical}/> 
    <Exam name="Genito-Urinaire" icon={Digestif} examenMedical={examenMedical}/> 
    <Exam name="Neurologique et Psychisme" icon={Neurologique} examenMedical={examenMedical}/> 
    <Exam name="Hématologie et Ganglionnaire" icon={Hematologie} examenMedical={examenMedical}/> 
    <Exam name="Endocrinologie" icon={Hematologie} examenMedical={examenMedical}/> 
    <Exam name="Profile Psychologique" icon={Psychology} examenMedical={examenMedical}/> 
    <Exam name="Examens Complémentaires" icon={Rapport} examenMedical={examenMedical}/> 
    <Exam name="Orientation" icon={Rapport} examenMedical={examenMedical}/>  
    </div>  );    


}

const PeauMuqueuses = ({ data, examenId }) => {
    const [updatePeauMuqueuses] = useMutation(UPDATE_PEAU_MUQUEUSES)

    const handleOnClick = (info) => {
            updatePeauMuqueuses({ variables: {
                id: examenId,
                data: {
                    notes: info
                }
            },
            // update(cache) {
            //     const existingCache = cache.readQuery({
            //         query: GET_EXAMEN_MEDICAL,
            //         variables: {
            //             id: examenId
            //         }
            //     })
            //     const newData = JSON.parse(JSON.stringify(existingCache))
            //     newData.examenMedicalById.peauEtMuqueusById.notes = notes
            //     cache.writeQuery({
            //         query: GET_EXAMEN_MEDICAL,
            //         variables: {
            //             id: examenId
            //         }
            //     })
            // }
        })
    }

    return (<Details notes={data?.notes} onClick={handleOnClick} />)
}

const Ophtalmologique = ({ data, examenId }) => {
    const [updateOphtalmologique] = useMutation(UPDATE_OPHTALMOLOGIQUE)

    const handleOnClick = ({ info, larmolement, douleurs, tachesDyeux }) => {
        console.log("uuu", larmolement, douleurs, tachesDyeux)

            const a = larmolement != null ? larmolement === "true" || larmolement === true : null
            const b = douleurs != null ? douleurs === "true" || douleurs === true : null
            const c = tachesDyeux != null ? tachesDyeux === "true"|| tachesDyeux === true : null
            console.log("c", a, b, c)
            data.larmolement = larmolement
            data.douleurs = douleurs
            data.tachesDevantLesYeux = tachesDyeux
            updateOphtalmologique({ variables: {
                id: examenId,
                data: {
                    notes: info,
                    larmolement: a,
                    douleurs: b,
                    tachesDevantLesYeux: c
                }
            }
        })
    }

    return (<Details1 onClick={handleOnClick} notes={data?.notes} larmolement={data?.larmolement} douleurs={data?.douleurs} tachesDyeux={data?.tachesDevantLesYeux} />)
}

const RapportMedical = ({ data, examenId }) => {
    const [updateRapport] = useMutation(UPDATE_RAPPORT)

    const handleOnClick = ( info ) => {
        console.log(info)
            updateRapport({ variables: {
                id: examenId,
                data: {
                    notes: info
                }
            }
        })
    }

    return (<Details notes={data?.notes} onClick={handleOnClick} />)
}

const Exam = (props , Key) => {

    const [visible, setVisible]=useState(false) ; 
    const[color, setColor] = useState('');
    const hundler = () => {setVisible(!visible)} ; 

    return(
    <div className={"exam "+ color }  >
        <div className="simple d-flex flex-row align-items-center" onClick={hundler} style={{cursor:"pointer"} } >
        <img className="icon_img"  src={props.icon} alt={props.icon} />
        <p className="exam_paragraph">{props.name}</p>
        </div>
        
        {visible && props.name==="Rapport Médical" ? <RapportMedical data={props.examenMedical?.rapportMedicalById} examenId={props.examenMedical?.id} /> : null }
        {visible && props.name==="Peau et Muqueuses" ? <PeauMuqueuses data={props.examenMedical?.peauEtMuqueusById} examenId={props.examenMedical?.id} /> : null }
        {visible && props.name==="Ophtalmologique" ? <Ophtalmologique data={{...props.examenMedical?.ophtalmologiqueById}} examenId={props.examenMedical?.id} /> : null }
        {visible && props.name==="O.R.L" ? <Details2 notes={['orl']} siflements={true} angines={false} expitaxis={true} rhinorthee={false} /> : null }
        {visible && props.name==="Respiratoire" ? <Details notes={['r']} /> : null }
        {visible && props.name==="Locomoteur" ? <Details notes={['l']} /> : null }
        {visible && props.name==="Cardio-vasculaire" ? <Details notes={['cv']}/> : null }
        {visible && props.name==="Genito-Urinaire" ? <Details notes={['gur']} /> : null }
        {visible && props.name==="Digestif" ? <Details notes={['dig']} /> : null }
        {visible && props.name==="Neurologique et Psychisme" ? <Details notes={['psy']} /> : null }
        {visible && props.name==="Hématologie et Ganglionnaire" ? <Details notes={['hema']}/> : null }
        {visible && props.name==="Endocrinologie" ? <Details notes={['endoc']}/> : null }
        {visible && props.name==="Profile Psychologique" ? <Details notes={['prof']}/> : null }
        {visible && props.name==="Examens Complémentaires" ? <Details notes={['ex']}/> : null }
        {visible && props.name==="Orientation" ? <Details notes={['orient']}/> : null }
    </div>
    );
}


const Details = ({ notes, onClick }) =>{
    if (!notes) notes = []
    const Notes = props => props.data.map((note, i) => <div key={i} className="notes d-flex flex-column"> <span className="subtitle">Description</span>
    <div> {note} </div> </div>);
    const [data, setData] = useState(['Note',...notes]);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const text = document.querySelector('#noteinput').value.trim();
            if (text) {
              const nextState = produce(data, draftState => {
                draftState.push(text);
              });
              document.querySelector('#noteinput').value = '';
              setData(nextState);
            }
        }
      }
    
    return(
        
    <div className= "details d-flex flex-row align-items-start justify-content-between">
        <div className= "allNote d-flex flex-column justify-content-between align-items-center">
            <Notes data={data} />
            <div className= "addNote d-flex flex-row align-items-center justify-content-around">
                <FontAwesomeIcon icon={faPlus} size="1.5x" />
                <input className="input" id="noteinput" type="text" onKeyDown={handleKeyDown} placeholder="Ajouter une autre note" />
            </div>
            
        </div> 
        <div className= "buttons d-flex flex-row align-items-end justify-content-around" > 
             <div className= "d-flex flex-row justify-content-between">
                 <Btn id="demiss" icon={faAngleLeft} name="Annuler" color="red"  text="retry" />
                 <Btn onClick={() => {
                     const info = [...data]
                     info.shift()
                     console.log(info)
                     onClick(info)
                 }} id="confirm" icon={faCheck} name="Confirmer" color="#56C596" text="accept"  />
             </div>
        </div>
    </div> 
    
    );
}
function Btn(props){
    return( 
           <button onClick={props.onClick}  className="d-flex flex-row align-items-center justify-content-center mr-2" id ={props.id} >
               <FontAwesomeIcon className="button_icons mr-2" icon={props.icon} size="2x" color={props.color} />
               <span className={props.text} >{props.name}</span>
           </button>     
    )
}
function HeadBtn(props){
    return( 
        
           <button  className="headbtn d-flex flex-row align-items-center justify-content-center" id ={props.id} >
               <img className="icon_img mr-2"  src={props.icon} alt ={props.icon}  />
               <span className="btnText" id={props.text} >{props.name}</span>
           </button>     
    )
}
const Details1 = ({ notes, larmolement, douleurs, tachesDyeux, onClick}) =>{
    if (!notes) notes = []
    const Notes = props => props.data.map((note, i) => <div key={i} className="notes"> {note} </div>);
    const [data, setData] = useState(['Note', ...notes]);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const text = document.querySelector('#noteinput').value.trim();
            if (text) {
              const nextState = produce(data, draftState => {
                draftState.push(text);
              });
              document.querySelector('#noteinput').value = '';
              setData(nextState);
            }
        }
      }

      console.log(larmolement, douleurs, tachesDyeux)

    return(
        
    <div className= "details d-flex flex-row align-items-start justify-content-between">
        <div className= "allNote d-flex flex-column justify-content-between align-items-center">
                <SelectItem label="larmolement" value={larmolement != null ? larmolement : ''} onSelect={(v) => larmolement = v.target.value}  />
                <SelectItem label="Douleurs" value={douleurs != null ? douleurs : ''} onSelect={(v) => douleurs = v.target.value}  />
                <SelectItem label="Taches devant les yeux" value={tachesDyeux != null ? tachesDyeux : ''} onSelect={(v) => tachesDyeux = v.target.value}  />
            
        </div>  
        <div className= "buttons d-flex flex-column align-items-start justify-content-around" > 
             <div>
                <Notes data={data} />
                <div className= "addNote d-flex flex-row align-items-center justify-content-around">
                    <FontAwesomeIcon icon={faPlus} size="1.5x" />
                    <input className="input" id="noteinput" type="text" onKeyDown={handleKeyDown} placeholder="Ajouter une autre note" /><span className="filetypes filetypes-e-7z"></span>
                </div>
             </div> 
               
             <div className= "d-flex flex-row align-items-end">
                 <Btn id="demiss" icon={faAngleLeft} name="Annuler" color="red"  text="retry" />
                 <Btn onClick={() => {
                     console.log("fff" + larmolement, douleurs, tachesDyeux)
                     const info = [...data]
                     info.shift()
                    onClick({ info, larmolement, douleurs, tachesDyeux })
                 }} id="confirm" icon={faCheck} name="Confirmer" color="#56C596" text="accept"  />
             </div>
        </div>
    </div> 
    
    );
}
const SelectItem = (props) => {

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          width : 190 ,

        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));
      
    const classes = useStyles();

    return(
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label={props.label}
          defaultValue={props.value}
          onChange={props.onSelect}
        >
          <MenuItem value="true">Oui</MenuItem>
          <MenuItem value="false">Non</MenuItem>
        </Select>
      </FormControl>
    );

}

const Details2 = ({ notes, siflements, angines, expitaxis, rhinorthee }) =>{
    const Notes = props => props.data.map((note, i) => <div key={i} className="notes"> {note} </div>);
    const [data, setData] = useState(['Note', ...notes]);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const text = document.querySelector('#noteinput').value.trim();
            if (text) {
              const nextState = produce(data, draftState => {
                draftState.push(text);
              });
              document.querySelector('#noteinput').value = '';
              setData(nextState);
            }
        }
      }
    
    return(
        
    <div className= "details d-flex flex-row align-items-start justify-content-between">
        <div className= "allNote d-flex flex-column justify-content-between align-items-center">
                <SelectItem label="Siflements" value={siflements} />
                <SelectItem label="Angines Répétées" value={angines} />
                <SelectItem label="Expitaxis" value={expitaxis} />
                <SelectItem label="Rhinorthée" value={rhinorthee} />
        </div> 
        <div className= "buttons d-flex flex-column align-items-start justify-content-around" > 
             <div>
                <Notes data={data} />
                <div className= "addNote d-flex flex-row align-items-center justify-content-around">
                    <FontAwesomeIcon icon={faPlus} size="1.5x" />
                    <input className="input" id="noteinput" type="text" onKeyDown={handleKeyDown} placeholder="Ajouter une autre note" /><span className="filetypes filetypes-e-7z"></span>
                </div>
             </div> 
               
             <div className= "d-flex flex-row align-items-end">
                 <Btn id="demiss" icon={faAngleLeft} name="Annuler" color="red"  text="retry" />
                 <Btn id="confirm" icon={faCheck} name="Confirmer" color="#56C596" text="accept"  />
             </div>
        </div>
    </div> 
    
    );


}
export default Examen;


