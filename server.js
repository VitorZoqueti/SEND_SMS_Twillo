// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o pacote cors
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Middleware CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar o cliente Twilio com suas credenciais
const accountSid = 'SUA_ACCOUNT_TWILLO_ID';
const authToken = 'SUA_AUTH_TWILLO_TOKEN';
const client = twilio(accountSid, authToken);

// Rota para enviar SMS
app.post('/send-sms', (req, res) => {
    const { body, to } = req.body;

    // Enviar SMS usando o cliente Twilio
    client.messages
        .create({
            body: body,
            from: '+SEU_NUMERO_TWILLO', // Seu número Twilio
            to: to
        })
        .then(message => {
            console.log(`SMS enviado com sucesso para ${to}: ${message.sid}`);
            res.send({ message: `SMS enviado com sucesso para ${to}: ${message.sid}` });
        })
        .catch(err => {
            console.error('Erro ao enviar SMS:', err);
            res.status(500).json({ error: err.message });
        });
});

// Iniciar o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
