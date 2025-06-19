import axios from "axios";

const API_BASE_URL = "http://localhost:5035/api";

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Transaction`);
    return response.data;
  } catch (error) {
    console.error("A aparut eroarea: ", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/User`);
    return response.data;
  }catch(error){
    console.error("A aparut eroarea: ", error);
    throw error;
  }
};


export const fetchBudgets = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/Budget`);
    return response.data;
  }catch(error){
    console.error("A aparut o eroare: ", error);
    throw error;
  }
};


export const fetchCategories = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/Category`);
    return response.data;
  }catch(error){
    console.error("A aparut o eroare: ", error);
    throw error;
  }
};

export const fetchAccounts = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/Account`);
    return response.data;

  }catch(error){
    console.error("A aparut o eroare:", error);
    throw error;
  }
};

export const fetchReports = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/Report`);
    return response.data;
  }catch(err){
    console.error("A aparut o eroare: ", err);
    throw err;
  }
};

export const createTransaction = async(transactionData) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/Transaction`, transactionData);
    return response.data;
  }catch(err){
    console.error("A aparut o eroare: ", err);
    throw err;
  }
};

export const createAccount = async(accountData) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/Account`, accountData);
    return response.data;
  }catch(err){
    console.error("A aparut o eroare: ", err);
    throw err;
  }
}

export const createBudget = async(budgetData) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/Budget`, budgetData);
    return response.data;
  }catch(err){
    console.error("A aparut o eroare: ", err);
    throw err;
  }
}

export const createReport = async(reportData) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/Report`, reportData);
    return response.data;
  }catch(err){
    console.error("A aparut o eroare", err);
    throw err;
  }
}

export const deleteAccount = async(accountId) => {
  try{
    const response = await axios.delete(`${API_BASE_URL}/Account/${accountId}`);
    return response.data;
  }catch(err){
    console.error("A aparut o eroare: ", err);
    throw err;
  }
}

export const deleteBudget = async(budgetId) => {
  try{
    const response = await axios.delete(`${API_BASE_URL}/Budget/${budgetId}`);
    return response.data;
  }catch(error){
    console.error("A aparut o eroare: ", error);
    throw error;
  }
}

export const deleteTransaction = async(transactionId) => {
  try{
    const response = await axios.delete(`${API_BASE_URL}/Transaction/${transactionId}`);
    return response.data;
  }catch(error){
    console.error("A aparut o eroare: ", error);
    throw error;
  }
}

export const loginUser = async(email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }) 
  });

  if(!response.ok){
      throw new Error("Login failed");
  }
  const data = await response.json();
  return data;
}

export const registerUser = async(email, password, firstName, lastName) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email,password,firstName,lastName})
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err[0]?.description || "Registration failed");
  }
  const data = await response.json();
  return data;
}

export const fetchUserTransactions = async(id) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/user/${id}/transactions`);
    return response.data;
  }
  catch(err){
    console.error("An error occured: ", err);
    throw err;
  }
}


export const fetchUserAccounts = async(id) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/user/${id}/accounts`);
    return response.data;
  }catch(err){
    console.error("An error occured:", err);
    throw err;
  }
}

export const fetchUserBudgets = async(id) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/user/${id}/budgets`);
    return response.data;
  }catch(err){
    console.error("An error occured:", err);
    throw err;
  }
}

export const fetchUserReports = async(id) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/user/${id}/reports`);
    return response.data;
  }catch(err){
    console.error("An error occured:", err);
    throw err;
  }
}

export const updateAccountBalance = async (id, updateData) => {
  try{
    const response = await axios.put(`${API_BASE_URL}/Account/${id}`, updateData);
    return response.data;
  }catch(err){
    console.error("A aparut o eroare: ", err);
    throw err;
  }
};