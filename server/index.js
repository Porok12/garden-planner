// import express from 'express';
const express = require('express');

const app = express();
const PORT = 8000;

const db = require("./src/models");
db.initial();

app.get('/', (req, res) => {
    res.send('Test');
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
