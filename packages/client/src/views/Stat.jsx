import React , {useState} from 'react';
import SideBar from '../components/layout/sideBar';
import DoctorHeader from '../components/shared/doctorHeader';
import { useQuery } from '@apollo/client';
import { GET_PATIENTS_LIST } from '../graphql/queries/GET_PATIENTS_LIST';
import Loading from '../components/shared/loading';
import { convertDateToReadable } from '../utils';
import '../assets/css/stat.css'
import TimelineIcon from '@material-ui/icons/Timeline';
import StatCard from '../components/shared/statCard';
import { faBan, faBuilding, faCheckCircle, faFemale, faHistory, faMale, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import 'react-google-flight-datepicker/dist/main.css';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import CircleInfos from '../components/shared/circleInfos';
import { DateRangePicker } from 'rsuite';


const Stat = () => {
    
    const datas = [
        { name: 'Etudiants', value: 600 },
        { name: 'Enseignants', value: 300 },
        { name: 'ATS', value: 100 },
      ];
      const COLORS = ['#2BCC71', '#FF8E00', '#5453CD'];
   
      const { loading, error, data } = useQuery(GET_PATIENTS_LIST);
      console.log('data:{'+data+'}')
      if (loading) return <Loading />;
      if (error) return <p>Error(:</p>;
      
      const { currentUser, patientsNumberByRole: { nodes: patientsNumber }, recentUpdatedDossierMedicals } = data
  
    

    return (
        <div className="main">
            <SideBar/>
            <div className="patients__content">
            <DoctorHeader  nom={currentUser.nom} prenom={currentUser.prenom} profilePictureUrl={currentUser.profilePicture} />
                <div className="stat__body mt-2">
                        <div className="stat__head d-flex justify-content-between align-items-center">
                            <div className="stat__head__title d-flex align-items-center">
                                <TimelineIcon id="timeline__icon" />
                                <h3 className="stat__head__txt">Statistiques totales</h3>
                            </div>
                            <div className="stat__filter d-flex">
                                <div className="stat__day__filter d-flex mr-2">
                                    <button className="stat__day__filter__btns">Aujourd'hui</button>
                                    <button className="stat__day__filter__btns">Semaine</button>
                                    <button className="stat__day__filter__btns">Mois</button>
                                    <button className="stat__day__filter__btns">Trimestre</button>
                                    <button className="stat__day__filter__btns last__filter__btn">Année</button>
                                </div>
                                <div className="stat__date__filter">
                                    <DateRangePicker className="range__picker" placeholder="Interval de date" showOneCalendar style={{width: "240px"}}/>
                                </div>
                            </div>
                        </div>
                        <div className="stat__general mt-4 mb-3 pb-4 mx-1 row">
                            <div className="stat__cards__container col-8">
                                <div className="stat__cards row">
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="460" type="Etudiant" percent="+50%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faUser} nbr="30" type="Enseignant" percent="+23%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faBuilding} nbr="15" type="ATS" percent="+34%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faHistory} nbr="567" type="Total" percent="+45%"/>
                                    </div>
                                </div>
                                <div className="stat__cards mt-4 row">
                                    <div className="col-3">
                                        <StatCard icon={faMale} nbr="356" type="Homme" percent="+34%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faFemale} nbr="120" type="Femme" percent="+26%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faCheckCircle} nbr="346" type="Dossiers complets" percent="+18%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faBan} nbr="135" type="Dossiers non-complets" percent="+50%"/>
                                    </div>
                                </div>
                            </div>
                            <div className="stat__circle__container  col-4">
                              <div className="stat__circle pt-4 px-5 ">
                                    
                                <h6 className="stat__circle__txt">Dossiers médicaux</h6>
                                <PieChart width={300} height={200} >
                                    <Pie
                                      data={datas}
                                      cx={120}
                                      cy={100}
                                      innerRadius={65}
                                      outerRadius={80}
                                      fill="#8884d8"
                                      paddingAngle={0}
                                      dataKey="value"
                                    >
                                      {datas.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    
                                </PieChart>
                                <div className="d-flex justify-content-between mt-1">
                                    <CircleInfos color="#00DE51" type="Etudiant" percent="65%" left="-25%"/>
                                    <CircleInfos color="#FF8E00" type="Enseignant" percent="25%" left="-25px"/>
                                </div>
                                <span className="d-flex "><CircleInfos color="#5453CD" type="ATS" percent="10%" left="-34%"/></span>
                              </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Stat;