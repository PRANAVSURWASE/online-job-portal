// jobService.js
export const getAllJobs = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/jobs/listAllJobs") 
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          resolve(data.data);
        } else {
          resolve([]); 
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
