const { Sequelize, Connection } = require("../database/Database");

const Client = Connection.define(
  "Client",
  {
    ID: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUsuario: {
      type: Sequelize.BIGINT,
      allowNull: true,
    },
    Codigo: {
      type: Sequelize.STRING(15),
      allowNull: true,
    },
    Nome: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    CPF_CNPJ: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    CEP: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Logradouro: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    Endereco: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },
    Numero: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    Bairro: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    Cidade: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    UF: {
      type: Sequelize.ENUM(
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
        'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO'
      ),
      allowNull: false,
    },
    Complemento: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },
    Fone: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    LimiteCredito: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: Sequelize.literal(200)
    },
    Validade: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    DataHoraCadastro: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    DataHoraModificado: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeUpdate: (client, options) => {
        client.set('DataHoraModificado', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
      },
    },
    timestamps: false,
  }
);

Client.sync({ force: false });
module.exports = Client;
