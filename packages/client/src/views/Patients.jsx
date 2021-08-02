import React from 'react';
import SideBar from '../components/layout/sideBar';

const Patients = () => {
    return (
        <div className="d-flex">
            <SideBar />
            <h1 className="m-auto">La liste des patients</h1>
        </div>
    );
};

export default Patients;