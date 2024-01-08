export interface Client {
    ID?: number;
    Nome: string;
    CPF_CNPJ: string;
    Fone: string;
    CEP: bigint;
    Codigo: string;
    Logradouro: string;
    Endereco: string;
    Numero: number;
    Bairro: string;
    Cidade: string;
    UF: string;
    Complemento: string;
    LimiteCredito: number;
    Validade: Date;
  }

  export interface ClientFilter {
    Nome?: string;
    Cidade?: string;
    CEP?: string;
    Codigo?: string;
  }