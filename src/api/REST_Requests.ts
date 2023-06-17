import axios from "axios";
import { BASE_URL } from "../consts";
import { user } from "../stores/userStore";

// GET
export async function sendGet(route: string, secretKey: string|null) {
  return await axios.get(`${BASE_URL}/${route}`, {
      headers: {
        Authorization: `${secretKey}`,
      },
  });
}

// POST
export async function sendPost(route: string, param: any, secretKey: string|null) {
  return await axios.post(`${BASE_URL}/${route}`, param, {
    headers: {
      Authorization: `${secretKey}`,
    },
  });
}

// PUT
export async function sendPut(route: string, itemId:number|string, param: any, secretKey: string|null) {
  return await axios.put(`${BASE_URL}/${route}?id=${itemId}`, param, {
    headers: {
      Authorization: `${secretKey}`,
    },
  });
}

// DELETE
export async function sendDelete(route: string, itemId:number|string, secretKey: string|null) {
  return await axios.delete(`${BASE_URL}/${route}?id=${itemId}`, {
    headers: {
      Authorization: `${secretKey}`,
    },
  });
}

// LOGIN
export async function sendLogin(email: string, password: string) {
  return await axios.post(`${BASE_URL}/user/login`,{
    email: email,
    password: password
  });
}

// SIGNUP
export async function sendSignUp(newUser: user) {
  return await axios.post(`${BASE_URL}/user/signup`,
    {
        name: newUser.user_name,
        password: newUser.password,
        email: newUser.mail,
        isInCharge: newUser.isSuperviosr,
        homeAddress: newUser.homeAddress,
        contactNumber: newUser.contactNumber
    }
  );
}

// PUT USER
export async function sendEditUser(mail: string, secretKey: string|null, name?: string, homeAddress?: string, contactNumber?: string) {
  return await axios.put(
    `${BASE_URL}/user?email=${mail}`,
    {
        name: name,
        email: mail,
        homeAddress: homeAddress,
        contactNumber: contactNumber
    },
    {
      headers: {
        Authorization: secretKey,
      },
    });
}

// RESET PASSWORD
export async function sendResetPassword(mail: string, name: string, password: string) {
  return await axios.put(`${BASE_URL}/user/forgotPassword?email=${mail}`,{
    name: name,    
    password: password
});
}