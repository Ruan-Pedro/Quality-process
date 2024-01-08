'use client'
import { deleteClient, getClientById, insertClient, updateClient } from "@/api/clients";
import getCEP from "@/api/viacep";
import { Client } from "@/interfaces/Client";
import ViaCEP from "@/interfaces/Viacep";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './clientdetails.css';


interface ClientDetailsProps {
  id?: number;
}

export default function ClientDetails({ id }: ClientDetailsProps) {
    const router = useRouter();
    const [editMode, setEditMode] = useState(id == null);
    const [client, setClient] = useState<Client | null>(null);
    const [clientData, setClientData] = useState<Client | any>(null);
    const [cepData, setCepData] = useState<ViaCEP | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
            const clientData = await getClientById(id);
            setClient(clientData);
            setClientData(clientData);
            
        } else setClient(null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const delayedCepChange = setTimeout(() => {
      if (clientData && clientData.CEP) {
        handleCepChange(clientData.CEP);
      }
    }, 1000);
  
    return () => clearTimeout(delayedCepChange);
  }, [clientData?.CEP]);


  const formattedDate = (date: Date | undefined): string => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  const handleSaveChanges = () => {
    if (id) {
      updateClient(id, clientData)
        .then(() => {
          setClient(clientData);
          alert("Cliente Atualizado com sucesso");
          setEditMode(false);
        })
        .catch((err) => console.error(err));
    } else {
      insertClient(clientData)
      .then((response) => {
        if (response.status == 200) {
          alert("Cliente Cadastrado com sucesso");
          router.push(`/client/${response.data.ID}`);
        }
      }).catch(err => console.error(err));
    }
  };

  const handleCepChange = async (cep: string) => {
    try {
      if (clientData && cep.length == 8) {
        const cepData = await getCEP(cep);
          setClientData((prevData: any) => ({
            ...prevData,
            CEP: cepData.cep,
            Endereco: cepData.logradouro,
            Bairro: cepData.bairro,
            Cidade: cepData.localidade,
            UF: cepData.uf,
          }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const HandleDeleteClient = () => {
    if (id) {
      deleteClient(id)
        .then((data) => {
          if (data.status == 200) {
            alert("Cliente Deletado na base de dados");
            router.push("/");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <section className="clientDetails">
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md mt-8">
        <h1 className="text-3xl font-semibold mb-4">Detalhes do Cliente</h1>
        {editMode ? (
          <div>
            <label className="block mb-2">
              Nome:
              <input
                type="text"
                value={clientData?.Nome || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    Nome: e.target.value,
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              CPF/CNPJ:
              <input
                type="text"
                value={clientData?.CPF_CNPJ || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    CPF_CNPJ: e.target.value,
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              Telefone:
              <input
                type="text"
                value={clientData?.Fone || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    Fone: e.target.value,
                  })
                }
                className="form-input mt-1"
              />
            </label>

            <label className="block mb-2">
              CEP:
              <input
                type="text"
                value={clientData?.CEP || ""}
                onChange={(e) => 
                    setClientData({
                      ...clientData,
                      CEP: e.target.value,
                    })
                }
                className="form-input mt-1"
              />
            </label>

            <label className="block mb-2">
              Endereço:
              <input
                type="text"
                value={clientData?.Endereco || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    Endereco: e.target.value,
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              Número:
              <input
                type="number"
                value={clientData?.Numero || 0}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    Numero: parseInt(e.target.value, 10),
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              Bairro:
              <input
                type="text"
                value={clientData?.Bairro || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    Bairro: e.target.value,
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              Cidade:
              <input
                type="text"
                value={clientData?.Cidade || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    Cidade: e.target.value,
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              UF:
              <input
                type="text"
                value={clientData?.UF || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    UF: e.target.value,
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              Complemento:
              <input
                type="text"
                value={clientData?.Complemento || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    Complemento: e.target.value,
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              Limite de Crédito:
              <input
                type="number"
                value={clientData?.LimiteCredito || 0}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    LimiteCredito: parseFloat(e.target.value),
                  })
                }
                className="form-input mt-1"
              />
            </label>
            <label className="block mb-2">
              Validade:
              <input
                type="date"
                value={formattedDate(clientData?.Validade)}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    Validade: new Date(e.target.value),
                  })
                }
                className="form-input mt-1"
              />
            </label>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium">ID do Cliente: {id || ""}</p>
            <p className="text-lg font-medium">Nome: {client?.Nome || ""}</p>
            <p className="text-lg font-medium">CPF/CNPJ: {client?.CPF_CNPJ || ""}</p>
            <p className="text-lg font-medium">Telefone: {client?.Fone || ""}</p>
            <p className="text-lg font-medium">CEP: {client?.CEP?.toString() || ""}</p>
            <p className="text-lg font-medium">Endereço: {client?.Endereco || ""}</p>
            <p className="text-lg font-medium">Número: {client?.Numero || ""}</p>
            <p className="text-lg font-medium">Bairro: {client?.Bairro || ""}</p>
            <p className="text-lg font-medium">Cidade: {client?.Cidade || ""}</p>
            <p className="text-lg font-medium">UF: {client?.UF || ""}</p>
            <p className="text-lg font-medium">
              Complemento: {client?.Complemento || ""}
            </p>
            <p className="text-lg font-medium">
              Limite de Crédito: {client?.LimiteCredito}
            </p>
            <p className="text-lg font-medium">
              Validade:{" "}
              {client?.Validade
                ? new Date(client.Validade).toLocaleDateString()
                : "Não disponível"}
            </p>
          </div>
        )}

        <div className="mt-6">
          {!editMode ? (
            <div className="flex gap-5 justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-400"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-400"
                onClick={HandleDeleteClient}
              >
                Deletar
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-400"
                onClick={handleSaveChanges}
              >
                Salvar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-400"
                onClick={() => {
                  if (id) {
                    setEditMode(false);
                    setClientData(client);
                  } else router.push("/");
                }}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}