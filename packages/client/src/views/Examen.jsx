import React from 'react';
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
import { useState } from 'react';
import produce from 'immer';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'



const Examen = () => {

  

    return (
        <>
            <div className="main">
                <SideBar />
                <div className="examen_content  d-flex flex-column justify-content-between">
                <div className="infos  d-flex justify-content-between align-items-center">
                    <div className="personal_infos d-flex align-items-end">
                        <img className="personal_img"  src={avatar} alt="" />
                        <div className ="text_infos">
                            <p className="title">Titre</p>
                            <p className="name">Nom et Prénom </p>
                            <p className="email">email@esi-sba.dz</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center ">
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <h3 className="number">180 cm</h3> 
                            <h4 className="text">Taille</h4>
                        </div>
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <h3 className="number">65 kg</h3> 
                            <h4 className="text">Poids</h4>
                        </div>
                    </div>
                </div>
                <div className="empty d-flex flex-row justify-content-around">
                    <div className="emptyContent"></div>
                    <div className="emptyContent"></div>
                    <div className="emptyContent"></div>
                </div>
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
                
                </div>
                </div>
                
                
            </div>

            
        </>
    );

    
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
        {visible && props.name=="Rapport Médical" ? <Details/> : null }
        {visible && props.name=="Peau et Muqueuses" ? <Details/> : null }
        {visible && props.name=="Respiratoire" ? <Details/> : null }
        {visible && props.name=="Locomoteur" ? <Details/> : null }
        {visible && props.name=="Cardio-vasculaire" ? <Details/> : null }
        {visible && props.name=="Genito-Urinaire" ? <Details/> : null }
        {visible && props.name=="Digestif" ? <Details/> : null }
        {visible && props.name=="Neurologique et Psychisme" ? <Details/> : null }
        {visible && props.name=="Hématologie et Ganglionnaire" ? <Details/> : null }
        {visible && props.name=="Endocrinologie" ? <Details/> : null }
        {visible && props.name=="Profile Psychologique" ? <Details/> : null }
        {visible && props.name=="Examens Complémentaires" ? <Details/> : null }
        {visible && props.name=="Orientation" ? <Details/> : null }
    </div>
    );
}


const Details = () =>{
    const Notes = props => props.data.map(note => <div className="notes"> {note.text} </div>);
    const initialData = [{ text: 'texte' }];
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
             <div className= "d-flex flex-row align-items-end ">
                 <Btn id="demiss" icon={faAngleLeft} name="Annuler" color="red"  text="retry" />
                 <Btn id="confirm" icon={faCheck} name="Confirmer" color="#56C596" text="accept"  />
             </div>
        </div>
    </div> 
    
    );
}
function Btn(props){
    return( 
           <button  className="d-flex flex-row align-items-center align-text-center" id ={props.id} >
               <FontAwesomeIcon className="button_icons" icon={props.icon} size="2x" color={props.color} />
               <p className={props.text} >{props.name}</p>
           </button>     
    )
}
export default Examen;


