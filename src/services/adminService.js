import {
  authorizedGetCall,
  authorizedPostCall,
  authorizedPutCall,
  authorizedDeleteCall,
} from './APIsService';

// Get all patients with pagination
export const getPatients = async ({ size, pageNo, search, title } = {}) => {
  const params = {};
  if (size) params.size = size;
  if (pageNo) params.pageNo = pageNo;
  if (search) params.search = search;
  if (title) params.title = title;
  const query = new URLSearchParams(params).toString();
  return authorizedGetCall(`/patients${query ? `?${query}` : ''}`);
};

// Get a single patient by ID
export const getPatientById = async (id) => {
  return authorizedGetCall(`/patients/${id}`);
};

// Create a new patient
export const createPatient = async (data) => {
  return authorizedPostCall('/patients', data);
};

// Update patient vitals (PATCH)
export const updatePatientVitals = async (id, data) => {
  // PATCH method is not directly available, so use axios directly or add to APIsService if needed
  // For now, use authorizedPutCall as a placeholder (update APIsService for PATCH if needed)
  return authorizedPutCall(`/patients/${id}`, data);
};

// Delete a patient
export const deletePatient = async (id) => {
  return authorizedDeleteCall(`/patients/${id}`);
};
