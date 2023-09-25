import axios from "axios";
const URL =
  "https://development-project-0105-api-zdnf.onrender.com/internships/";

//GET
async function getInternshipsEntries() {
  return await axios.get(URL);
}

//POST
async function createInternshipEntry(
  title,
  description,
  salary,
  address,
  startingDate,
  endingDate,
  employerId
) {
  const internshipEntry = fromInternshipDateToJsonObject(
    title,
    description,
    salary,
    address,
    startingDate,
    endingDate,
    employerId
  );
  return await axios.post(URL, internshipEntry);
}

//DELETE
async function deleteInternshipEntry(internshipId) {
  return await axios.delete(URL + internshipId);
}

//Other functions
function fromInternshipDateToJsonObject(
  title,
  description,
  salary,
  address,
  startingDate,
  endingDate,
  employerId
) {
  return {
    title: title,
    description: description,
    salary: salary,
    address: address,
    startingDate: startingDate,
    endingDate: endingDate,
    employerId: employerId,
  };
}

const apiInternshipManager = {
  getInternshipsEntries: getInternshipsEntries,
  createInternshipEntry: createInternshipEntry,
  deleteInternshipEntry: deleteInternshipEntry,
};

export default apiInternshipManager;
