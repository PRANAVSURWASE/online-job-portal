
export const getAllCompanies = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/jobs/viewAllCompanies") // 
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          // extract unique company names
          const uniqueCompanies = [
            ...new Set(data.data.map((job) => job.company_name)),
          ];
          resolve(uniqueCompanies);
        } else {
          resolve([]); 
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
