// services/scheduleService.js
import axios from "axios";
export const scheduleInterview = (token, data) => {
  return axios.post(`http://localhost:4000/hr/scheduleInterview`, data, {
    headers: { Authorization: `Bearer ${token}`,
                 "Content-Type": "application/json",
     },
  });
};
export const getScheduledInterviews = (token, hr_id) => {
  return axios.get("/api/getScheduledInterviews", {
    headers: { Authorization: `Bearer ${token}` },
    params: { hr_id }  
  });
};
