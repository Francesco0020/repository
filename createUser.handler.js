import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB.DocumentClient();



/*
Il codice inizia importando il modulo aws-sdk, che è il SDK ufficiale di AWS per JavaScript,
utilizzato per interagire con i servizi AWS. Successivamente, viene creato un oggetto DocumentClient per DynamoDB.

*/

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);

/*
La funzione esportata exports.handler è l'entry point della Lambda function. Questa funzione accetta un oggetto event come argomento, che contiene i dati inviati all'endpoint della Lambda function.
*/
    const params = {
        TableName: 'Utenti',
        Item: {
            'codiceFiscale': requestBody.codiceFiscale,
            'name': requestBody.name,
            'surname': requestBody.surname,
            'address': {
            'street': requestBody.address.street,
            'city': requestBody.address.city,
            'state': requestBody.address.state,
            'postalCode': requestBody.address.postalCodce
},
            'email': requestBody.email,
            'phoneNumber': requestBody.phoneNumber,
            'role': requestBody.role
            //posso aggiungere altri campi della tabella utente secondo le necessità

        }
    };
    //Viene creato un oggetto params contenente i dettagli necessari per inserire un elemento nella tabella DynamoDB.
    //Questi includono il nome della tabella (TableName) e l'oggetto da inserire (Item)
    

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Utente creato con successo' })
        };
        
        //Viene effettuata un'operazione put per inserire l'oggetto nella tabella DynamoDB
        //utilizzando il metodo put() dell'oggetto dynamoDB. Si utilizza await per attendere il completamento dell'operazione.
    } catch (error) {
        console.error('Errore durante la creazione dell\'utente', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Si è verificato un errore durante la creazione dell\'utente' })
        };
    }
    //Se si verifica un errore durante l'operazione, viene catturato nell'istruzione catch,
    //viene registrato un messaggio di errore e la funzione restituisce uno status code 500 con un messaggio di errore.
};
