// scripts/script.js

document.addEventListener('DOMContentLoaded', function() {
    const smsForm = document.getElementById('smsForm');
    const responseDiv = document.getElementById('response');

    smsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const message = document.getElementById('message').value;

        // Envio da mensagem via fetch para o backend Node.js
        fetch('/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: message })
        })
        .then(response => response.json())
        .then(data => {
            responseDiv.textContent = data.message;
        })
        .catch(error => {
            console.error('Erro ao enviar SMS:', error);
            responseDiv.textContent = 'Erro ao enviar SMS. Por favor, tente novamente.';
        });
    });
});
