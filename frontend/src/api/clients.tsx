
import { Client } from "@/interfaces/Client";
import axios from "axios";

const urlBackEnd = `http://localhost:8080`;

export async function getAll(filters?: { Nome?: string; Codigo?: string; Cidade?: string; CEP?: string }) {
    let getUrl = `${urlBackEnd}/clients`;
    try {
      if (filters) {
        const params = new URLSearchParams(filters);
        getUrl += `?${params.toString()}`;
    }
    const response = await axios.get(getUrl)
    return response.data;
    } catch (error) {
      throw error;
    }    
}

export async function getClientById(id: number) {
  let getUrl = `${urlBackEnd}/client/${id}`;
  try {
    const response = await axios.get(getUrl);
    return response.data;  
  } catch (error) {
    throw error;
  }
  
}

export async function insertClient(clientData: Client) {
  try {
    const response = await axios.post(`${urlBackEnd}/client`, clientData);
    return response;  
  } catch (error) {
    throw error;
  }
  
}

export async function updateClient(id: number, updatedClientData: Client) {
  try {
    const response = await axios.put(`${urlBackEnd}/client/${id}`, updatedClientData);
  return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteClient(id: number) {
  try {
    const response = await axios.delete(`${urlBackEnd}/client/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}