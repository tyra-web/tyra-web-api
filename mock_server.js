const express = require('express');
const file_upload = require('express-fileupload');

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

/* Upload Files */
app.use(file_upload({ createParentPath: true }));

/* Using routes from the default env variables. */
app.use('/config', CONFIG_ROUTER);
app.use('/users', USER_ROUTER);
app.use('/breeds', BREED_ROUTER);
app.use('/clients', CLIENT_ROUTER);
app.use('/pets', PET_ROUTER);
app.use('/services', SERVICE_ROUTER);
app.use('/dayschedules', DAY_SCHEDULE_ROUTER);

module.exports = app;
