import React, { useState } from 'react';
import SideBar from '../components/layout/sideBar';
import '../assets/css/examen.css'
import avatar  from '../assets/images/avatar.jpg';
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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '../assets/images/delete.png'
import BtnChangers from '../components/shared/btnChanger'


const Examen = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {if(activeTab !== tab) setActiveTab(tab);}

    const location = useLocation();

    console.log(location)

    return (
        <>
            <div className="mainContent">
                <SideBar />
                <div className="examen_content  d-flex flex-column justify-content-between">
                <div className="infos  d-flex justify-content-between align-items-center">
                    <div className="personal_info d-flex align-items-end">
                        <img className="personal_img"  src={avatar} alt="" />
                        <div className ="text_infos">
                            <p className="title">Titre</p>
                            <p className="name">Nom et Prénom </p>
                            <p className="email">email@esi-sba.dz</p>
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
                <TabPane tabId="1"> <Exams /> </TabPane>
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
    const Notes = props => props.data.map(note => <div className="headTableOrd d-flex flex-row justify-content-between align-items-center">
        <span className="titles">Médicament</span>
        <span className="titles">Quantité(Boite)</span>
        <span className="titles">Durée du traitement (jours)</span>
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
    return(
        <div>
           <div className="">
           <Notes data={data} />
           <div className="d-flex flex-row align-items-center justify-content-around">
                <div className= "addNoteOrd d-flex flex-row align-items-center justify-content-around">
                    <FontAwesomeIcon icon={faPlus} size="1x" />
                    <input className="input" id="noteinput" type="text" onKeyDown={handleKeyDown} placeholder="Ajouter une autre note" /><span className="filetypes filetypes-e-7z"></span>
                    
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
    return(
        <div className="certif mb-4"> 
            <Notes data={data} />
                <div className= "addNoteCertif d-flex flex-row align-items-center justify-content-around">
                    <FontAwesomeIcon icon={faPlus} size="1.5x" />
                    <input className="input" id="noteinput" type="text" onKeyDown={handleKeyDown} placeholder="Ajouter une autre note" /><span className="filetypes filetypes-e-7z"></span>
                    
                </div>
                <div className="d-flex flex-column align-items-end mr-5" >
                <Btn id="print" icon={faPrint} name="Imprimer" color="black"  text="print" />
                     </div>
            
        </div>
    ); 
}
const Exams = ()  => {
    return(
    <div className="exams d-flex flex-column align-items-center"> 
    <Exam name="Rapport Médical" icon={Rapportmedical} /> 
    <Exam name="Peau et Muqueuses" icon={Peau} /> 
    <Exam name="Ophtalmologique" icon={Vision} /> 
    <Exam name="O.R.L" icon={Ear} /> 
    <Exam name="Locomoteur" icon={Locomoteur} /> 
    <Exam name="Respiratoire" icon={Respiratoire} /> 
    <Exam name="Cardio-vasculaire" icon={Cardio} /> 
    <Exam name="Digestif" icon={Digestif} /> 
    <Exam name="Genito-Urinaire" icon={Digestif} /> 
    <Exam name="Neurologique et Psychisme" icon={Neurologique} /> 
    <Exam name="Hématologie et Ganglionnaire" icon={Hematologie} /> 
    <Exam name="Endocrinologie" icon={Hematologie} /> 
    <Exam name="Profile Psychologique" icon={Psychology} /> 
    <Exam name="Examens Complémentaires" icon={Rapport} /> 
    <Exam name="Orientation" icon={Rapport} />  
    </div>  );    


}
const Exam = (props , Key) => {

   
    
    const [visible, setVisible]=useState(false) ; 
    const[color, setColor] = useState('');
    const hundler = () => {setVisible(!visible)} ; 
    const changeColor = ()=>{setColor('black')} ; 
    return(
    <div className={"exam "+ color }  >
        <div className="simple d-flex flex-row align-items-center" onClick={hundler} style={{cursor:"pointer"} } >
        <img className="icon_img"  src={props.icon} alt={props.icon} />
        <p className="exam_paragraph">{props.name}</p>
        </div>
        {visible && props.name==="Ophtalmologique" ? <Notes/> : null }
        {visible && props.name==="O.R.L" ? <Details2/> : null }
        {visible && props.name==="Rapport Médical" ? <Notes/> : null }
        {visible && props.name==="Peau et Muqueuses" ? <Notes/> : null }
        {visible && props.name==="Respiratoire" ? <Notes/> : null }
        {visible && props.name==="Locomoteur" ? <Notes/> : null }
        {visible && props.name==="Cardio-vasculaire" ? <Notes/> : null }
        {visible && props.name==="Genito-Urinaire" ? <Notes/> : null }
        {visible && props.name==="Digestif" ? <Notes/> : null }
        {visible && props.name==="Neurologique et Psychisme" ? <Notes/> : null }
        {visible && props.name==="Hématologie et Ganglionnaire" ? <Notes/> : null }
        {visible && props.name==="Endocrinologie" ? <Notes/> : null }
        {visible && props.name==="Profile Psychologique" ? <Notes/> : null }
        {visible && props.name==="Examens Complémentaires" ? <Notes/> : null }
        {visible && props.name==="Orientation" ? <Notes/> : null }
    </div>
    );
}


const Details = () =>{
    const Notes = props => props.data.map(note => <div className="notes d-flex flex-column"> <span className="subtitle">Description</span>
    <div> {note.text} </div> </div>);
    const initialData = [{ text: 'Note' }];
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
                 <Btn id="confirm" icon={faCheck} name="Confirmer" color="#56C596" text="accept"  />
             </div>
        </div>
    </div> 
    
    );
}
function Btn(props){
    return( 
           <BtnChangers/>     
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
const Notes = () => {
    const [input,setInput] = useState("");
    const [text,setText] = useState([])
    return(
        <div className="personal_infos_">
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
                                        }
                                        onKeyUp={(event) => {
                                            if (event.key == "Enter"){
                                                if (input === "" || input === " ") return;
                                                else{ 
                                                    if(![...text].includes(input)){
                                                    setText([...text,input]);
                                                    }
                                                    setInput("");
                                                }
                                            }
                                        }}
                                        />
                                    </div>
                                    <button className="btn_infos_notes d-flex  align-items-center" onClick={()=> {
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
                        <BtnChangers/>
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
        >
          <MenuItem value="Oui" >Oui</MenuItem>
          <MenuItem value="Non">Non</MenuItem>
        </Select>
      </FormControl>
    );

}
const Details2 = () =>{
  
    const [text,setText] = useState([])
    const [input,setInput] = useState([])  
    return(
        
    <div className= "details d-flex flex-row align-items-start justify-content-between">
        <div className= "allNote d-flex flex-column justify-content-between align-items-center">
                <SelectItem label="Siflements" />
                <SelectItem label="Angines Répétées" />
                <SelectItem label="Expitaxis" />
                <SelectItem label="Rhinorthée" />
        </div> 
        <div className= "buttons d-flex flex-column align-items-start justify-content-around" > 
             <div className="NoteItems d-flex flex-column">
                <input placeholder="Add Notes here" 
                onChange={                     
                    (event) =>{
                                const {value} = event.target  
                                setInput(value) 
                               }
               }
              onKeyUp={(event) => {
                  if (event.key == "Enter"){
                            if (input === "" || input === " ") return;
                            else{ 
                                if(![...text].includes(input)){
                                setText([...text,input]);
                            }
                            setInput("");
                            }
                                            }
             }}/>
                <div className="elements_notes d-flex flex-column">
                    {
                         <NoteElm text={text} onClick={setText}/>  
                    }
                </div>
             </div> 
               
             <BtnChangers/>
        </div>
    </div> 
    
    );


}
export default Examen;


