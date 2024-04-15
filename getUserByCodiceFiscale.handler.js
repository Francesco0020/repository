const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
//importo il modulo 'aws-sdk' e creo un oggetto 'DocumentClient' per interagire con DynamoDB
exports.handler = async (event) => {
    const codiceFiscale = event.pathParameters.codiceFiscale;
//creo una funzione  per gestire la richiesta Lambda e estraggo il parametro codiceFiscale
//dalla stringa di percorso('pathParameters') dell'evento, che viene utilizzato come chiave per
//per recuperare l'utente dalla tabella DynamoDB
    const params = {
        TableName: 'Utenti',
        Key: {
            'codiceFiscale': codiceFiscale
        }
    };
//creo i parametri necessari per la richiesta di lettura della tabella DynamoDB
//specificando il nome della tabella('TableName') e la chiave primaria('Key') dell'
//elemento da recuperare

    try {
        const data = await dynamoDB.get(params).promise();
        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Utente non trovato' })
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
        /*
        Eseguo la richiesta di lettura nella tabella DynamoDB utilizzando il metodo 'get'
        dell'oggetto 'dynamoDB', con attesa dell'esito tramite 'awayt'
        Se l'utente non viene trovato (ossia se data.Item è vuoto), viene restituito uno status code 404
        e un messaggio che indica che l'utente non è stato trovato.
        Se l'utente viene trovato, viene restituito uno status code 200 e i dati dell'utente in formato JSON.
        */
    } catch (error) {
        console.error('Errore durante la ricerca dell\'utente', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Si è verificato un errore durante la ricerca dell\'utente' })
        };
    }
    /*
    Se si verifica un errore durante l'operazione, viene catturato nell'istruzione catch,
    viene registrato un messaggio di errore e la funzione restituisce uno status code 500 con un messaggio di errore.
    */
};
