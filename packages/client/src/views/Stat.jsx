import React, { useState } from 'react'
import SideBar from '../components/layout/sideBar'
import DoctorHeader from '../components/shared/doctorHeader'
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/client'
import { STATISTICS } from '../graphql/queries/STATISTICS'
import Loading from '../components/shared/loading'
import { convertDateToReadable, percentage } from '../utils'
import '../assets/css/stat.css'
import TimelineIcon from '@material-ui/icons/Timeline'
import StatCard from '../components/shared/statCard'
import {
  faBan,
  faBuilding,
  faCheckCircle,
  faFemale,
  faHistory,
  faMale,
  faSuitcase,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import 'react-google-flight-datepicker/dist/main.css'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'
import CircleInfos from '../components/shared/circleInfos'
import { DateRangePicker } from 'rsuite'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const Stat = () => {
  const client = useApolloClient()

  const dailyStats = [
    {
      name: 'Dim',
      Etud: 10,
      Ens: 2,
      Ats: 3
    },
    {
      name: 'Lun',
      Etud: 8,
      Ens: 1,
      Ats: 0
    },
    {
      name: 'Mar',
      Etud: 5,
      Ens: 3,
      Ats: 1
    },
    {
      name: 'Merc',
      Etud: 7,
      Ens: 1,
      Ats: 2
    },
    {
      name: 'Jeu',
      Etud: 12,
      Ens: 4,
      Ats: 3
    }
  ]
  const datas = [
    { name: 'Etudiants', value: 600 },
    { name: 'Enseignants', value: 300 },
    { name: 'ATS', value: 100 }
  ]
  const COLORS = ['#2BCC71', '#FF8E00', '#5453CD']

  const [days, setDays] = useState(1)

  const { loading, error, data } = useQuery(STATISTICS, {
    variables: {
      days
    }
  })

  if (loading) return <Loading />
  if (error) return <p>Error(:</p>

  const { currentUser, statistics, allCompletedDossierMedicalsCounter } = data

  return (
    <div className="stat__main">
      <SideBar />
      <div className="patients__content">
        <DoctorHeader
          nom={currentUser.nom}
          prenom={currentUser.prenom}
          profilePictureUrl={currentUser.profilePicture}
        />
        <div className="stat__body mt-2">
          <div className="stat__head d-flex justify-content-between align-items-center">
            <div className="stat__head__title d-flex align-items-center">
              <TimelineIcon id="timeline__icon" />
              <h3 className="stat__head__txt">Statistiques totales</h3>
            </div>
            <div className="stat__filter d-flex">
              <div className="stat__day__filter d-flex mr-2">
                <button
                  className="stat__day__filter__btns"
                  onClick={() => setDays(1)}
                >
                  Aujourd'hui
                </button>
                <button
                  className="stat__day__filter__btns"
                  onClick={() => setDays(7)}
                >
                  Semaine
                </button>
                <button
                  className="stat__day__filter__btns"
                  onClick={() => setDays(31)}
                >
                  Mois
                </button>
                <button
                  className="stat__day__filter__btns"
                  onClick={() => setDays(93)}
                >
                  Trimestre
                </button>
                <button
                  className="stat__day__filter__btns last__filter__btn"
                  onClick={() => setDays(365)}
                >
                  Année
                </button>
              </div>
              <div className="stat__date__filter">
                <DateRangePicker
                  className="range__picker"
                  placeholder="Interval de date"
                  showOneCalendar
                  style={{ width: '240px' }}
                />
              </div>
            </div>
          </div>
          <div className="stat__general mt-4  pb-4 mx-1 row">
            <div className="stat__cards__container col-8">
              <div className="stat__cards row">
                <div className="col-3">
                  <StatCard
                    icon={faSuitcase}
                    nbr={statistics.etudiant}
                    type="Etudiant"
                  />
                </div>
                <div className="col-3">
                  <StatCard
                    icon={faUser}
                    nbr={statistics.enseignant}
                    type="Enseignant"
                  />
                </div>
                <div className="col-3">
                  <StatCard icon={faBuilding} nbr={statistics.ats} type="ATS" />
                </div>
                <div className="col-3">
                  <StatCard
                    icon={faHistory}
                    nbr={statistics.total}
                    type="Total"
                  />
                </div>
              </div>
              <div className="stat__cards mt-4 row">
                <div className="col-3">
                  <StatCard icon={faMale} nbr={statistics.homme} type="Homme" />
                </div>
                <div className="col-3">
                  <StatCard
                    icon={faFemale}
                    nbr={statistics.femme}
                    type="Femme"
                  />
                </div>
                <div className="col-3">
                  <StatCard
                    icon={faCheckCircle}
                    nbr={allCompletedDossierMedicalsCounter.completed}
                    type="Dossiers complets"
                  />
                </div>
                <div className="col-3">
                  <StatCard
                    icon={faBan}
                    nbr={allCompletedDossierMedicalsCounter.notCompleted}
                    type="Dossiers non-complets"
                  />
                </div>
              </div>
            </div>
            <div className="stat__circle__container  col-4">
              <div className="stat__circle pt-4 pl-5 pr-0">
                <h6 className="stat__circle__txt">Dossiers médicaux</h6>
                <PieChart width={250} height={200}>
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
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <div className="d-flex justify-content-between mt-1">
                  <CircleInfos
                    color="#00DE51"
                    type="Etudiant"
                    percent={`${percentage(
                      statistics.etudiant,
                      statistics.total
                    )}%`}
                    left="-25%"
                  />
                  <CircleInfos
                    color="#FF8E00"
                    type="Enseignant"
                    percent={`${percentage(
                      statistics.enseignant,
                      statistics.total
                    )}%`}
                    left="-25px"
                  />
                </div>
                <span className="d-flex ">
                  <CircleInfos
                    color="#5453CD"
                    type="ATS"
                    percent={`${percentage(statistics.ats, statistics.total)}%`}
                    left="-34%"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="stats__details mt-0  row ml-3 mr-0">
            <div className="stat__bars  py-3 col-6">
              <h6 className="stat__circle__txt ml-3 mb-3">Visites médicaux</h6>
              <BarChart
                width={500}
                height={320}
                data={dailyStats}
                margin={{
                  top: 5,
                  right: 0,
                  left: -25,
                  bottom: 10
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Etud"
                  fill="#00DE51"
                  background={{ fill: '#eee' }}
                />
                <Bar
                  dataKey="Ens"
                  fill="#FF8E00"
                  background={{ fill: '#eee' }}
                />
                <Bar
                  dataKey="Ats"
                  fill="#5453CD"
                  background={{ fill: '#eee' }}
                />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stat
