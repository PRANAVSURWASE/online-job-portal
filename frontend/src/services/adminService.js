import axios from "axios";

export const getAdminProfile=(token)=>{
    let promise = axios.get("http://localhost:4000/admin/adminProfile",{
        headers:{Authorization:`Bearer ${token}`},
    })
    return promise;
};

export const getAdminStats = (token) => {
  return axios.get("http://localhost:4000/admin/stats", {
    headers: { Authorization: `Bearer ${token}` }
  });
};
export const getHRs = (token) => {
  return axios.get("http://localhost:4000/admin/viewHR", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addHR = (hrData) => {
  let promise= axios.post("http://localhost:4000/admin/addHR", hrData);
  return promise;
};

export const deleteHR = (hr_id) => {
  return axios.post(`http://localhost:4000/admin/deleteHR/${hr_id}`);
};

export const updateHR =(hrData)=>{
  return axios.put("http://localhost:4000/admin/updateHR",hrData)
  
}
