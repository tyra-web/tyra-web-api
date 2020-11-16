require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const fileUpload = require('express-fileupload');

/* Defining port */
const PORT = process.env.PORT || 3000;

/* Mongo DB Connection */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_TYRAWEB_TEST, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

/* Defining routes */
const CONFIG_ROUTER = require('./routes/config-file');
const USER_ROUTER = require('./routes/user');
const BREED_ROUTER = require('./routes/breed');
const CLIENT_ROUTER = require('./routes/client');
const PET_ROUTER = require('./routes/pet');
const SERVICE_ROUTER = require('./routes/service');
const DAY_SCHEDULE_ROUTER = require('./routes/day_schedule');

/* Defining app */
const app = express();

/* Defining middlewares */
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.use(cors());

/* Static Folder */
app.use(serveStatic(__dirname + '../client/dist'));
app.use(express.static('uploads', { etag: false }));

/* Upload Files */
app.use(fileUpload({ createParentPath: true }));

/* Using routes */
app.use('/api' + process.env.TYRAWEB_ROUTE_CONFIG, CONFIG_ROUTER);
app.use('/api' + process.env.TYRAWEB_ROUTE_USERS, USER_ROUTER);
app.use('/api' + process.env.TYRAWEB_ROUTE_BREED, BREED_ROUTER);
app.use('/api' + process.env.TYRAWEB_ROUTE_CLIENTS, CLIENT_ROUTER);
app.use('/api' + process.env.TYRAWEB_ROUTE_PETS, PET_ROUTER);
app.use('/api' + process.env.TYRAWEB_ROUTE_SERVICES, SERVICE_ROUTER);
app.use('/api' + process.env.TYRAWEB_ROUTE_DAY_SCHEDULES, DAY_SCHEDULE_ROUTER);

app.listen(PORT, error => {
	if(error)
		return console.error(error);

	return console.log('Server is listening on ' + PORT);
})

module.exports = app;
