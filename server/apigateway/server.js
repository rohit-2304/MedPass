const express = require('express')
const proxy = require ('express-http-proxy')
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT;



app.use('/node_server', proxy('http://localhost:5000'));
app.use('/RAG_server', proxy('http://127.0.0.1:8001'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
