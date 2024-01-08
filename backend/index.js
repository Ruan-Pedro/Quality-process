const Express = require('express');
const Routes = require('./src/Routes/Routes');
const cors = require("cors");
require('dotenv').config();

const Port = process.env.PORT;
const Host = process.env.HOST;
const App = Express();

App.use(cors({ origin: process.env.FRONT }));
App.use(cors({
    origin: '*'
  }));
App.use(Express.urlencoded({ extended: true }));
App.use(Express.json());
App.use('/', Routes);

App.listen(Port, () => {
    console.log(`[HTTP] Server running on port ${Host}:${Port}`);
    console.log(`[HTTP] Press CTRL + C to stop it`);
})
module.exports = App;