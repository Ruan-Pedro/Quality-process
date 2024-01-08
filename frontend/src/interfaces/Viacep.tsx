import { UF } from "./UF";
export default interface ViaCEP {
    cep: number;
    logradouro: string;
      complemento: string;
      bairro: string;
      localidade: string;
      uf: UF;
      ibge: number;
      gia: number;
      ddd: number;
      siafi: number;
}