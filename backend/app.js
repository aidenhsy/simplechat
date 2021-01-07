const router = require('./routes/index');

const app = require('express')();

app.use(router);

module.exports = app;
