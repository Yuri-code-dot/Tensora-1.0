const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.json());

app.use('/api/*', async (req, res) => {
    const apiUrl = `https://externalapi.com${req.originalUrl}`;
    try {
        const response = await axios({
            method: req.method,
            url: apiUrl,
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            data: req.body
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});