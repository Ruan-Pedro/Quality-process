'use client'
import { deleteClient, getAll } from "@/api/clients";
import { Client } from "@/interfaces/Client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import deleteIcon from '../../../public/images/excluir.png';
import readIcon from '../../../public/images/lupa.png';
import "./clienttable.css";

interface ClientFilter {
  Nome: string;
  Cidade: string;
  CEP: string;
  Codigo: string;
}

export default function ClientsTable() {
    const router = useRouter();
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([...clients]);
    const [filter, setFilter] = useState<ClientFilter>({
      Nome: "",
      Cidade: "",
      CEP: "",
      Codigo: "",
    });

    useEffect(() => {
        getAll(filter)
        .then(response => {
          setClients(response);
          setFilteredClients(response);
        })
        .catch(err => console.error(err));

        applyFilters();
    }, []);
    
    const handleDelete = (id:number) => {
        deleteClient(id)
        .then((data) => {
            if(data.status == 200) setFilteredClients(clients.filter((clients) => clients.ID !== id))
        }).catch(err => console.error(err));
    }

    const handleFilterChange = (field: string, value: string) => {
      setFilter({
        ...filter,
        [field]: value,
      });
    };
    
    const applyFilters = () => {
      getAll(filter).then((data) => {
        setFilteredClients(data);  
      }).catch(err => console.error(err));
    };

  return (
    <section className="table-section w-full mx-auto">
      <div className="flex flex-row justify-between items-center mt-2">
        <h1 className="my-5 text-4xl font-semibold">Lista de Clientes</h1>
        <button
          className="bg-blue-500 text-white px-4 py-3 rounded-md transition-all duration-300 hover:bg-blue-400"
          onClick={() => router.push('/client')}
        >
          Cadastrar Cliente
        </button>
      </div>

      <div className="filters flex flex-row gap-3 mb-5">
        <input className="pl-2"
          type="text"
          placeholder="Filtrar por Nome"
          value={filter.Nome}
          onChange={(e) => handleFilterChange('Nome', e.target.value)}
        />
        <input className="pl-2 focus:*:"
          type="text"
          placeholder="Filtrar por CEP"
          value={filter.CEP}
          onChange={(e) => handleFilterChange('CEP', e.target.value)}
        />
        <input className="pl-2 focus:*:"
          type="text"
          placeholder="Filtrar por Cidade"
          value={filter.Cidade}
          onChange={(e) => handleFilterChange('Cidade', e.target.value)}
        />
        <input className="pl-2 focus:*:"
          type="text"
          placeholder="Filtrar por Codigo"
          value={filter.Codigo}
          onChange={(e) => handleFilterChange('Codigo', e.target.value)}
        />

        <button className="bg-gray-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-400" onClick={applyFilters}>
          Aplicar Filtros
        </button>
      </div>

      <table className="clientsTable w-full mb-20 table-auto shadow-md">
        <thead>
          <tr>
            <th className="bg-blue-200 border py-1">Nome</th>
            <th className="bg-blue-200 border py-1">CPF_CNPJ</th>
            <th className="bg-blue-200 border py-1">Fone</th>
            <th className="bg-blue-200 border py-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients .map((client) => (
            <tr key={client.ID}>
              <td className="border pl-2 py-1 hover:shadow-lg hover:bg-blue-300 transition-all duration-300">{client.Nome}</td>
              <td className="border pl-2 py-1 hover:shadow-lg hover:bg-blue-300 transition-all duration-300">{client.CPF_CNPJ}</td>
              <td className="border pl-2 py-1 hover:shadow-lg hover:bg-blue-300 transition-all duration-300">{client.Fone}</td>
              <td className="border pl-2 py-1 flex flex-row items-center justify-start gap-4 hover:shadow-lg hover:bg-blue-300 transition-all duration-300">
                <button onClick={() => router.push(`/client/${client.ID}`)}>
                  <img className="w-8" src={readIcon.src} alt="" />
                </button>
                <button onClick={() => client.ID && handleDelete(client.ID)}>
                  <img className="w-8" src={deleteIcon.src} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}