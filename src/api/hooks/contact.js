import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000";
async function fetchContacts() {
  return axios
    .get(`${API_URL}/contact`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

// async function addContact(contactInfo) {
//   return axios
//     .post(`${API_URL}/contact`, contactInfo)
//     .then((res) => res.data)
//     .catch((err) => err.data)
// }
async function addContact(contactInfo) {
  return axios
    .post(`${API_URL}/contact`, contactInfo)
    .then((res) => {
      toast.success("Added successfully.");
      return res;
    })
    .catch((err) => {
      if (err.response.data.errno === 1062) {
        toast.error(`Phone number already exist.`);
        return err.response;
      }
    });
}

async function viewContact(contactId) {
  return axios
    .get(`${API_URL}/contact/${contactId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

async function deleteContact(contactId) {
  return axios
    .delete(`${API_URL}/contact/${contactId}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

async function updateContact(contactInfo) {
  const { id, first_name, last_name, email, phone, address } = contactInfo;
  const payload = {
    first_name,
    last_name,
    email,
    phone,
    address,
  };

  return axios
    .put(`${API_URL}/contact/${id}`, payload)
    .then((res) => {
      toast.success("Edited successfully.");
      return res;
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data.errno === 1062) {
        toast.error(`Phone number already exist.`);
        return err.response;
      }
    });
}
async function updateUserProfile(userInfo) {
  return axios
    .put(`${API_URL}/user`, userInfo)
    .then((res) => toast.success("Edited successfully."))
    .catch((err) => console.log(err));
}
async function searchContact(searchTerm) {
  return axios
    .get(`${API_URL}/search/${searchTerm}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

async function changepass(payload) {
  const stringPayload = JSON.stringify(payload);
  console.log(stringPayload);
  return axios
    .post(`${API_URL}/changepass`, stringPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
}

export {
  fetchContacts,
  addContact,
  viewContact,
  deleteContact,
  updateContact,
  updateUserProfile,
  searchContact,
  changepass,
};
