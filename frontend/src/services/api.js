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