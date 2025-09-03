import axios from 'axios';

export const registerEmployer=(formData)=>{
    let promise= axios
    .post("http://localhost:4000/hr/hrRegister",formData)
    return promise;

}

export const loginEmployee=(formData)=>{
    let promise = axios.post('http://localhost:4000/auth/hrLogin',formData)

    return promise;
};

export const getEmployerProfile=(token)=>{
    let promise = axios.get("http://localhost:4000/hr/hrProfile",{
        headers:{Authorization:`Bearer ${token}`},
    })
    return promise;
};

export const createJob = (jobData, token) => {
  return axios.post(`http://localhost:4000/hr/createJob`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getEmployerJobs =(token)=>{
  return axios.get("http://localhost:4000/hr/viewJob",{
    headers:{Authorization:`Bearer ${token}`},  
  })
};

export const deleteJob =(j_id,token)=>{
  return axios.delete(`http://localhost:4000/hr/deleteJob/${j_id}`,{
     headers:{ Authorization:`Bearer ${token}`},
});
};

export const updateJob = (j_id, formData, token) => {
  return axios.put(
    `http://localhost:4000/hr/updateJobById/${j_id}`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

export const getApplicants =(token)=>{
  let promise=axios.get("http://localhost:4000/hr/getApplicants",{
    headers:{ Authorization:`Bearer ${token}`},
  })
  return promise;
};

export const getScheduledInterviews = (token) => {
  return axios.get("http://localhost:4000/hr/getScheduledInterviews", {
    headers: { Authorization: `Bearer ${token}` },
  });
};