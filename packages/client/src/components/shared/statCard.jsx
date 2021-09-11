import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const StatCard = (props) => {
    return (
        <>
          <div className="stat__card py-3 px-3 d-flex flex-column">
              <div className="d-flex justify-content-between">
                  <FontAwesomeIcon className="stat__card__icon" icon={props.icon} />
                  <h6 className="stat__card__percent">{props.percent}</h6>
              </div>
              <h1 className="stat__card__nbr mx-auto mb-3">{props.nbr}</h1>
              <h6 className="stat__card__type mx-auto text-center">{props.type}</h6>
          </div>  
        </>
    );
}

export default StatCard;
