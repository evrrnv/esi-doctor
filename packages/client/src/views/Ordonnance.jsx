import React, { useState ,  useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import logo  from '../assets/images/logo.png';



class OrdonnaceToPrint extends React.PureComponent {
  
    
    render() {
      console.log(this.props.data1) ; 

      return (
        <div className="d-flex flex-column align-items-center mt-5">
          <img className="personal_img d-flex align-items-center"  src={logo} alt="" />
          <span style={{ fontSize: "30px", color: "Blue" }} className="mt-2 mb-2"> Ecole Superieure en Informatique 08-MAI-1945 SIDI BEL ABBES</span>
          <span style={{ fontSize: "30px", color: "#24A9E2" }} className="mt-2 mb-2"> Unité médicale </span>
          <span style={{ fontSize: "50px", color: "#24A9E2" }}className="mt-2 mb-5"> ORDONNANCE </span>
          <div style={{ color: "black" ,  fontSize: "30px"}}> {
                this.props.data.map(note => <div className="headTableOrdc d-flex flex-row justify-content-between align-items-center">
                <span className="titles mt-2">{note.text}</span>
                <span className="titles mt-2">{note.notice}</span>
                <span className="titles  mt-2">{note.qte}</span>
                <span className="titles  mt-2">{note.duree}</span>
                </div>)}</div>

          <div className="d-flex flex-column justify-content-end mt-5 ml-6 ">
          <span style={{ fontSize: "30px", color: "Black"  }}className="mt-2 mb-5"> Signature </span>
          </div>
        </div>
      );
            }
    
  }
  export default OrdonnaceToPrint ; 