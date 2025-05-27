import React, { useState, useEffect } from "react";
import VideoRecorder from "./VideoRecorder";
import { useArgonController, setLayout } from "context";
import axios from "axios";
import "./PatientForm.css";
import {createPatient} from "../../../services/adminService";
import { authorizedPostCall } from "../../../services/APIsService";
const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api/v1";
export default function PatientForm() {
  const [controller, dispatch] = useArgonController();
  const [formData, setFormData] = useState({
    name: "",
    patientId: "",
    dateOfBirth: "",
    gender: "",
    systolicBP: "",
    diastolicBP: "",
    heartRate: "",
    heartRateVariability: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    notes: ""
  });
  const [videoBlob, setVideoBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getAccessToken = () => {
    return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
  };
  

  useEffect(() => {
    setLayout(dispatch, "user");
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoRecorded = (blob) => {
    console.log("inside handleVideoRecorded");
    setVideoBlob(blob);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First, create the patient
      const patientResponse = await createPatient(formData);
      console.log("patientResponse", patientResponse);

      console.log("videoBlob", videoBlob);
      if (videoBlob) {
        console.log("inside if videoBlob");
        const formData = new FormData();
        formData.append('video', videoBlob, 'recording.webm');

        await axios.post(`${baseURL}/videos/upload/${patientResponse.data._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: "Bearer " + getAccessToken(),
          }
        });
      }

      // Reset form
      setFormData({
        name: "",
        patientId: "",
        dateOfBirth: "",
        gender: "",
        systolicBP: "",
        diastolicBP: "",
        heartRate: "",
        heartRateVariability: "",
        respiratoryRate: "",
        oxygenSaturation: "",
        notes: ""
      });
      setVideoBlob(null);
      
      alert('Patient data submitted successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="form-heading">
    <h1 className="form-title">Patient Submission Form</h1>
    </div>
    <div className="app-container">
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Patient Info Section */}
        <div className="form-section">
          <h2>Patient Information</h2>
          <div className="patient-grid">
            <div className="patient-field">
              <label htmlFor="name">Patient Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter patient's full name"
                required
              />
            </div>
            <div className="patient-field">
              <label htmlFor="patientId">Patient ID</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                placeholder="Enter patient ID"
                required
              />
            </div>
            <div className="patient-field">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="patient-field">
              <label>Gender</label>
              <div className="patient-gender">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                  /> Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                  /> Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleInputChange}
                  /> Other
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        <section className="form-section">
          <h2>Video Recording</h2>
          <div className="video-upload-container">
            <VideoRecorder onVideoRecorded={handleVideoRecorded} videoBlob={videoBlob} />
          </div>
          <p className="note-text">
            ⚠️ Please ensure the video clearly shows the patient's face and any relevant symptoms.
          </p>
        </section>

        {/* Vital Signs Section */}
        <section className="form-section">
          <h2>Vital Signs</h2>
          <div className="form-grid vitals-grid">
            <div className="vital-group">
              <label>Blood Pressure (mmHg)</label>
              <div className="blood-pressure">
                <input
                  type="number"
                  name="systolicBP"
                  value={formData.systolicBP}
                  onChange={handleInputChange}
                  placeholder="Systolic"
                  min="70"
                  max="200"
                  required
                />
                <span>/</span>
                <input
                  type="number"
                  name="diastolicBP"
                  value={formData.diastolicBP}
                  onChange={handleInputChange}
                  placeholder="Diastolic"
                  min="40"
                  max="130"
                  required
                />
              </div>
            </div>
            <div className="vital-group">
              <label>Heart Rate (BPM)</label>
              <div className="vital-input-with-unit">
                <input
                  type="number"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  placeholder="60-100"
                  min="60"
                  max="100"
                  required
                />
                <span>BPM</span>
              </div>
            </div>
            <div className="vital-group">
              <label>Heart Rate Variability (ms)</label>
              <div className="vital-input-with-unit">
                <input
                  type="number"
                  name="heartRateVariability"
                  value={formData.heartRateVariability}
                  onChange={handleInputChange}
                  placeholder="20-200"
                  min="20"
                  max="200"
                  required
                />
                <span>ms</span>
              </div>
            </div>
            <div className="vital-group">
              <label>Respiratory Rate (breaths/min)</label>
              <div className="vital-input-with-unit">
                <input
                  type="number"
                  name="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={handleInputChange}
                  placeholder="12-20"
                  min="12"
                  max="20"
                  required
                />
                <span>breaths/min</span>
              </div>
            </div>
            <div className="vital-group">
              <label>Oxygen Saturation (%)</label>
              <div className="vital-input-with-unit">
                <input
                  type="number"
                  name="oxygenSaturation"
                  value={formData.oxygenSaturation}
                  onChange={handleInputChange}
                  placeholder="95-100"
                  min="95"
                  max="100"
                  required
                />
                <span>%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Notes */}
        <section className="form-section">
          <h2>Additional Notes</h2>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Enter any additional information about the patient's condition"
          />
        </section>

        {/* Action Buttons */}
        <div className="button-group">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Patient Data'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}