import React from 'react';
import LastExam from './lastExam';
import SearchIcon from '@material-ui/icons/Search';
import avatar from '../../assets/images/avatar.jpg'

const HistoLastExam = (props) => {
    return (
        <>
           <div className="patients__examen align-self-end">
                <h6 className="lastExam__txt text-center">Historique des examens médicaux</h6>
                <div className="search__exam d-flex justify-content-between align-items-center m-1">
                   <input className="pers__recherche" type="text" placeholder="Rechercher" />
                   <span ><SearchIcon id="search__icon"/></span>
                </div>
                <div className="pers__examen">
                    <LastExam avatar={avatar} name='Aek Boussaid' title='Etudiant' time='2m'/>
                    <LastExam avatar={avatar} name='Moncif Bendada' title='Enseignant' time='1h'/>
                    <LastExam avatar={avatar} name='Aek Boussaid' title='ATS' time='2h'/>
                    <LastExam avatar={avatar} name='Mhammed Seddaoui' title='Etudiant' time='3h'/>
                    <LastExam avatar={avatar} name='Moncif Bendada' title='Enseignant' time='1h'/>
                    <LastExam avatar={avatar} name='Aek Boussaid' title='ATS' time='2h'/>
                    <LastExam avatar={avatar} name='Mhammed Seddaoui' title='Etudiant' time='3h'/>
                </div>
            </div> 
        </>
    );
}

export default HistoLastExam;
