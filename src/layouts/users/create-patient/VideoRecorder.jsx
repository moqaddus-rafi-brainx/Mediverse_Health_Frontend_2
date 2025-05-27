import React, { useState, useRef, useEffect } from "react";
import "./PatientForm.css";

export default function VideoRecorder({ onVideoRecorded, videoBlob }) {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  useEffect(() => {
    if (!videoBlob) {
        setVideoURL(null);
    }
    if (recording) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
          recordedChunksRef.current = [];
          setVideoURL(URL.createObjectURL(blob));
          
          // Pass the blob to parent component
          if (onVideoRecorded) {
            console.log("inside if onVideoRecorded");
            onVideoRecorded(blob);
          }

          stream.getTracks().forEach((track) => track.stop());
        };
        mediaRecorderRef.current.start();
      });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [recording, onVideoRecorded]);

  function handleRecordClick() {
    if (!recording) {
      setVideoURL(null);
      setRecording(true);
    } else {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }

  return (
    <div>
      <div className="video-card">
        <div className="video-container">
          {!recording && !videoURL && (
            <div className="placeholder-text">Press record button to start</div>
          )}

          {recording && <video ref={videoRef} autoPlay muted />}

          {!recording && videoURL && (
            <video src={videoURL} controls />
          )}
        </div>
      </div>

      <div>
        {!recording ? ( !videoURL ? (
            <button onClick={handleRecordClick} className="record-btn">
            Start Recording
          </button>
        ):(
            <button onClick={handleRecordClick} className="record-btn">
            Re-record
            </button>
        )) : (
          <button onClick={handleRecordClick} className="stop-btn">
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
}