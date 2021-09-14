import React, { useEffect } from 'react'
import SideBar from '../components/layout/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import DoctorHeader from '../components/shared/doctorHeader'
import '../assets/css/specifPatients.css'
import HistoLastExam from '../components/shared/histoLastExam'
import TypeHero from '../components/shared/typeHero'
import DossierCard from '../components/shared/dossierCard'

const SpecifPatients = (props) => {
  useEffect(() => {
    console.log(props.type)
  }, [])
  return (
    <div className="specifPatients__main">
      <SideBar />
      <div className="patients__content">
        <DoctorHeader />
        <div className="patients__body  d-block d-sm-flex justify-content-between">
          <div className="patients__types align-self-end">
            <h1 className="patients__header mb-3 text-center">
              Surveiller la santé de vos Patients{' '}
            </h1>
            <TypeHero
              type={props.type}
              nbr={props.nbr}
              complet={props.complet}
              nonComplet={props.nonComplet}
              img1={props.img1}
              img2={props.img2}
            />
            <div className="Dm__search__container">
              <input
                className="Dm__search"
                type="text"
                placeholder="Rechercher un dossier"
              />
              <FontAwesomeIcon icon={faSearch} className="Dm__searchIcon" />
            </div>
          </div>
          <HistoLastExam type={props.type} />
        </div>

        <div className="Dm__container">
          <div className="Dm__content">
            <h3 className="modif__txt Dm__txt mb-3 ">DOSSIERS MÉDICAUX</h3>
            <div className="Dms ml-1  d-flex flex-column ">
              <DossierCard />
              <DossierCard />
              <DossierCard />
              <DossierCard />
              <DossierCard />
              <DossierCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecifPatients
