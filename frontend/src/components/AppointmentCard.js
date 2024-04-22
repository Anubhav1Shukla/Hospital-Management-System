// src/components/AppointmentCard.js

import React from "react";

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="appointment-card" 
    style={{

      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      borderRadius: '5px',
      width: '40%',
      margin: '10px',
      padding: '20px',
      textAlign: 'left',
      backgroundColor: '#f1f1f1',
      
      
    }}
    >
      <p>
        <span>Patient:</span>
        {appointment.patientName}
      </p>
      <p>
        <span>Doctor:</span>
        {appointment.doctorName}
      </p>
	  
      <p>
        <span>Catogary:</span>
        {appointment.catogary}
      </p>
      <p>
        <span>Date:</span>
        {new Date(appointment.date).toLocaleDateString()}
      </p>
      <div className="btn-container">
        {/* <button onClick={() => onEdit(appointment)}>Edit</button> */}
        <button onClick={() => onDelete(appointment._id)}>Delete</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
