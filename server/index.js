// import express from 'express';
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

const db = require("./src/models");
db.initial();

app.get('/', (req, res) => {
    res.send('Test');
});

// routes
require('./src/routes/auth')(app);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
