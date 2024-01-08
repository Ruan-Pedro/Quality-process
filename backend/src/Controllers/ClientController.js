const { default: axios } = require("axios");
const Client = require("../Models/Client");
const { Op } = require("sequelize");
const viaCepUrl = `https://viacep.com.br/ws`;

const getClients = async (req, res) => {
  try {
    let whereClause = {};
    if (req.query.Nome) {
      whereClause.Nome = {
        [Op.like]: `%${req.query.Nome}%`,
      };
    }

    if (req.query.Codigo) {
      whereClause.Codigo = {
        [Op.like]: `%${req.query.Codigo}%`,
      };
    }

    if (req.query.Cidade) {
      whereClause.Cidade = {
        [Op.like]: `%${req.query.Cidade}%`,
      };
    }

    if (req.query.CEP) {
      whereClause.CEP = {
        [Op.like]: `%${req.query.CEP}%`,
      };
    }

    await Client.findAll({
      where:whereClause,
      raw: true,
      order: [["DataHoraCadastro", "DESC"]],
    }).then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getClientById = async (req, res) => {
  await Client.findByPk(req.params.id)
    .then((client) => {
      res.status(200).send(client);
    }).catch((err) => {
      console.error(err);
      res.status(200).send(err);
    });
};

const insertClients = async (req, res) => {
    let body = req.body;
    const cep = parseInt(req.body.CEP.replace("-", ""), 10);
    const url = viaCepUrl + `/${cep}/json`;
    
    await axios.get(url).then(data => {
        Client.create({
            idUsuario: body.idUsuario,
            Codigo: body.codigo,
            Nome: body.Nome,
            CPF_CNPJ: body.CPF_CNPJ,
            CEP: cep,
            Endereco: `${data.data.logradouro} ${body.Numero || ""} ${body.Complemento || ""}, ${data.data.bairro}, ${data.data.localidade}`,
            Logradouro: data.data.logradouro,
            Numero: body.Numero,
            Bairro: data.data.bairro,
            Cidade: data.data.localidade,
            UF: data.data.uf,
            Complemento: body.Complemento || "",
            Fone: body.Fone,
            LimiteCredito: body.LimiteCredito,
            Validade: body.Validade
    
        }).then((data) => {
            console.log({ 'cliente cadastrado': data });
            res.status(200).send(data);
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        })
    }).catch(err => {
        console.error(err);
        return res.status(500).send(`Erro ao achar o CEP informado`);
    })
    
}

const updateClient = async (req, res) => {
  const id = req.params.id;
  let body = req.body;

  try {

    if (req.body.CEP && typeof req.body.CEP === 'string') {
      req.body.CEP = parseInt(req.body.CEP.replace("-", ""), 10);
      const urlViaCEP = viaCepUrl + `/${req.body.CEP}/json`;
      
      await axios.get(urlViaCEP).then((data) =>{
        body.Logradouro = data.data.logradouro;
        body.Bairro = data.data.bairro;
        body.Cidade = data.data.localidade;
        UF = data.data.uf,
        body.Endereco = `${data.data.logradouro} ${body.Numero || ""} ${body.Complemento || ""}, ${data.data.bairro}, ${data.data.localidade}`;

      })
    }

    const clientToUpdate = await Client.findByPk(id);
    if (!clientToUpdate) return res.status(404).send({ msg: "Esse cliente não existe" });

    const clientUpdated = await clientToUpdate.update(body);
    if (!clientUpdated) return res.status(404).send({ msg: "erro ao alterar cliente" });

    return res.status(200).send({ data: clientUpdated });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Error" });
  }
};

const deleteClient = async (req, res) => {
  const id = req.params.id;
  try {
    const clientToDelete = await Client.findByPk(id);
    if (!clientToDelete) return res.status(404).send({ msg: "Esse cliente não existe" });

    const deletedClient = await clientToDelete.destroy();
    if (!deletedClient) return res.status(404).send({ msg: "Erro ao deletar cliente" });
    
    return res.status(200).send({ msg: "Cliente deletado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Error" });
  }
};

module.exports = {
  getClients,
  getClientById,
  insertClients,
  updateClient,
  deleteClient
};
