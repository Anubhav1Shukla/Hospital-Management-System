//Doctors.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import "../components/Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleAddDoctor = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/doctors/add", newDoctor)
      .then((response) => {
        console.log("doc", response.data);
        setDoctors([...doctors, response.data]);
        setNewDoctor({
          name: "",
          specialty: "",
        });
      })
      .catch((error) => console.error("Error adding doctor:", error));
  };

  const handleUpdateDoctor = (id, e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
      .then((response) => {
        const updateDoc = {
          ...selectedDoctor,
          _id: id,
        };

        console.log("update doc", updateDoc);

        setDoctors(
          doctors.map((doctor) => (doctor._id === id ? updateDoc : doctor))
        );

        setSelectedDoctor(null);
        setIsEditMode(false); // Switch back to Add mode
      })
      .catch((error) => console.error("Error updating doctor:", error));
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(`http://localhost:5000/doctors/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      })
      .catch((error) => console.error("Error deleting doctor:", error));
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true); // Switch to Edit mode
  };

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
        <div className="form-sections "
		style={{
			margin: "0 auto",
			padding: "20px",
			border: "1px solid #ccc",
			borderRadius: "5px",
			boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
			backgroundColor: "#f9f9f9",
			minWidth:"100%",
		
		}}
		>
          <h4>{isEditMode ? "Edit Doctor" : "Add New Doctor"}</h4>
          <form
            onSubmit={
              isEditMode
                ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
                : handleAddDoctor
            }
          >
            <label>Name: </label>
            <input
              type="text"
              value={isEditMode ? selectedDoctor.name : newDoctor.name}
              onChange={(e) =>
                isEditMode
                  ? setSelectedDoctor({
                      ...selectedDoctor,
                      name: e.target.value,
                    })
                  : setNewDoctor({
                      ...newDoctor,
                      name: e.target.value,
                    })
              }
            />
            <br />
            <label>Specialty: </label>
            <input
              type="text"
              value={
                isEditMode ? selectedDoctor.specialty : newDoctor.specialty
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedDoctor({
                      ...selectedDoctor,
                      specialty: e.target.value,
                    })
                  : setNewDoctor({
                      ...newDoctor,
                      specialty: e.target.value,
                    })
              }
            />
            <br />
            <button type="submit">
              {isEditMode ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </div>
      </div>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onEdit={handleEditDoctor}
            onDelete={handleDeleteDoctor}
          />
        ))}
      </div>
    </div>
  );
};

export default Doctors;
