//Appointments.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "../components/AppointmentCard";
import "../components/Appointment.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    catogary: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleAddAppointment = (e) => {
    if (!isEditMode) {
      newAppointment.catogary = doctors.filter(
        (doctor) => doctor.name === newAppointment.doctorName
      )[0]?.specialty;
    }

    console.log(newAppointment);
    if (!newAppointment.patientName) {
      alert("Please enter patient name");
      return;
    }
    if (!newAppointment.doctorName) {
      alert("Please enter doctor name");
      return;
    }
    if (!newAppointment.date) {
      alert("Please enter date");
      return;
    }
    if (!newAppointment.catogary) {
      alert("Please enter catogary");
      return;
    }
    e.preventDefault();

    axios
      .post("http://localhost:5000/appointments/add", newAppointment)
      .then((response) => {
        console.log(response.data);
        setAppointments([...appointments, response.data]);
        setNewAppointment({
          patientName: "",
          doctorName: "",
          date: "",
          catogary: "",
        });
      })
      .catch((error) => console.error("Error adding appointment:", error));
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:5000/appointments/update/${id}`,
        selectedAppointment
      )
      .then((response) => {
        console.log(response.data);
        const updateApp = {
          ...selectedAppointment,
          _id: id,
        };
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id ? updateApp : appointment
          )
        );
        setSelectedAppointment(null);
        setIsEditMode(false); // Switch back to Add mode
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`http://localhost:5000/appointments/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true); // Switch to Edit mode
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctors");
      console.log("Doctors:", response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/patients");
      console.log("Patients:", response.data);
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <form
          className="appointment-form"
          onSubmit={
            isEditMode
              ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
              : handleAddAppointment
          }
          style={{
            width: "100%",
            minWidth: "90%",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <label>Patient Name:</label>
          <select
            name="patient"
            id="patient"
            value={
              isEditMode
                ? selectedAppointment.patientName
                : newAppointment.patientName
            }
            onChange={(e) =>
              isEditMode
                ? setSelectedAppointment({
                    ...selectedAppointment,
                    patientName: e.target.value,
                  })
                : setNewAppointment({
                    ...newAppointment,
                    patientName: e.target.value,
                  })
            }
            style={{
              width: "100%",

              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
              marginTop: "6px",
              marginBottom: "16px",
              resize: "vertical",
            }}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient.name}>
                {patient.name}
              </option>
            ))}
          </select>

          <label>Doctor Name:</label>

          <select
            name="doctor"
            id="doctor"
            value={
              isEditMode
                ? selectedAppointment.doctorName
                : newAppointment.doctorName
            }
            onChange={(e) =>
              isEditMode
                ? setSelectedAppointment({
                    ...selectedAppointment,
                    doctorName: e.target.value,
                  })
                : setNewAppointment({
                    ...newAppointment,
                    doctorName: e.target.value,
                  })
            }
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
              marginTop: "6px",
              marginBottom: "16px",
              resize: "vertical",
            }}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>

          <label for="cat">Catogary:</label>
          <input
            type="text"
            id="cat"
            name="cat"
            value={
              isEditMode
                ? selectedAppointment.catogary
                : doctors.filter(
                    (doctor) => doctor.name === newAppointment.doctorName
                  )[0]?.specialty
            }
            disabled={!isEditMode}
            onChange={(e) =>
              isEditMode
                ? setSelectedAppointment({
                    ...selectedAppointment,
                    catogary: e.target.value,
                  })
                : ""
            }
          />

          <label>Date:</label>
          <input
            type="date"
            value={isEditMode ? selectedAppointment.date : newAppointment.date}
            onChange={(e) =>
              isEditMode
                ? setSelectedAppointment({
                    ...selectedAppointment,
                    date: e.target.value,
                  })
                : setNewAppointment({
                    ...newAppointment,
                    date: e.target.value,
                  })
            }
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "14px 20px",
              margin: "8px 0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {isEditMode ? "Update Appointment" : "Add Appointment"}
          </button>
        </form>
      </div>
      <div>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Appointments ({appointments.length})
        </h2>
        <div
          className="appointment-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {appointments.map((appointment) => (
            <>
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onEdit={handleEditAppointment}
                onDelete={handleDeleteAppointment}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
