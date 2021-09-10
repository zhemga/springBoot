
import React from 'react';
import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <FontAwesomeIcon className="loader-element animate__animated animate__jackInTheBox fa-5x text-secondary" icon={faHospital} />
    </div>
  );
};
