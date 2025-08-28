// src/services/contactService.js
import axios from 'axios'

const API_BASE_URL = "http://localhost:4000";

export const sendContactMessage = (formData) => {
  return axios.post(`${API_BASE_URL}/contact/contactUs`, formData)
  .then((res)=>  
       res.data); 
};
