import React from 'react';
import LastExam from './lastExam';
import SearchIcon from '@material-ui/icons/Search';
import avatar from '../../assets/images/avatar.jpg'
import { GET_RECENT_EXAMEN_MEDICALS } from '../../graphql/queries/GET_RECENT_EXAMEN_MEDICALS';
import Loading from './loading';
import { useLazyQuery, useQuery } from '@apollo/client';
import { capitalizeFirstLetter } from '../../utils';

const HistoLastExam = (props) => {

    const inputRef = React.createRef();

    const { loading, error, data, refetch } = useQuery(GET_RECENT_EXAMEN_MEDICALS, {
        variables: {
            search: ""
        }
    });

    const searchClickHandler = () => {
        refetch({ search: inputRef.current.value })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            refetch({ search: inputRef.current.value })
        }
    }

    if (loading) return (
        <div className="patients__examen align-self-end">
            
        </div>
    );
    if (error) return <p>Error(:</p>;

    return (
        <>
           <div className="patients__examen align-self-end">
                    <h6 className="lastExam__txt text-center">Historique des examens médicaux</h6>
                    <div className="search__exam d-flex justify-content-between align-items-center m-1">
                    <input onKeyDown={handleKeyDown} ref={inputRef} className="pers__recherche" type="text" placeholder="Rechercher" />
                    <span style={{cursor: 'pointer'}} onClick={searchClickHandler}><SearchIcon id="search__icon"/></span>
                    </div>
                    <div className="pers__examen">
                        {data.recentExamenMedicals.nodes.map((v, i) => {
                                return (<LastExam userId={v.userId} examenId={v.examenId} key={i} avatar={v.profilePicture} name={`${v.nom} ${v.prenom}`} title={capitalizeFirstLetter(v.role)} time={v.lastEdit}/>)
                        })}
                    </div>
            </div> 
        </>
    );
}

export default HistoLastExam;
