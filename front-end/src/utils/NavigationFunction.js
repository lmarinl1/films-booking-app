import config from './config';

async function navigate(method, api, body = undefined) {
    
    // Options Composition
    var options = {
        method,
        json: true,
        headers:{
            'cache-control':'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json; charset=utf-8',
            'Accept': 'application/json',
        }
    }

    // Body Configuration
    if (body !== undefined) options.body =  JSON.stringify(body)

    // Url Composition
    var url = config.backendServer.host + ":" + config.backendServer.port + api
    if (config.backendServer.https) url = "https://"+ url
    else url = "http://"+ url

    return await fetch(url, options).then((response) => response.json())
    .then((data) => {
        return data;
        
    }).catch((error) => {      
        console.log(error);
    });
}

export default navigate;