import ViaCEP from "@/interfaces/Viacep";
import axios from "axios";

const viaCepUrl = "https://viacep.com.br/ws";

export default async function getCEP(cep: string): Promise<ViaCEP> {
  try {
    const response = await axios.get(`${viaCepUrl}/${cep}/json`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar CEP: ${error}`);
  }
}
