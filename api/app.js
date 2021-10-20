const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');

// Setting express
dotenv.config();
const app = express();

// iniciarlizar sequelize
sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

//aplico cors
app.use(cors());
app.use(cookieParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting up the welcome message
require('./routes')(app);

app.get('*', (req, res) => res.status(200).send({
	message: 'api is up and running',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;