// Set BASE_URL
const baseURL = 'https://webapi.bps.go.id/v1/api/'

function getPathParameters(parameters) {
    // Get keys and values of parameters
    let paramKeys = Object.keys(parameters);
    let paramValues = Object.values(parameters);
    
    // remove first index that is unnecessary
    let removedKey = paramKeys.shift(); // remove 'path'
    let newPathParameters = paramValues;

    // put the keys between values
    // list, model, infographic, lang, ind, domain, 1800, key, <your_api_key>
    for (let i = 0; i < paramKeys.length; i++) {
        newPathParameters.splice(2 * i + 1, 0, paramKeys[i])
    }
    
    // Join the array with separator /
    return newPathParameters.join('/');
}

function callApi(url, parameters) {
    // Get full API path
    let fullUrl = url + getPathParameters(parameters);
    
    // fetch data from the fullUrl
    fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status == 'OK') {
                // get results
                const infographics = data.data;
                // show data into html with id=infografis
                document.getElementById('infografis').innerHTML = templates(infographics[1]);
            }
        })
        .catch(err => console.log(err)) // except error
}

// create template function to show image of infographic
function templates(data) {
    let html = '';
    
    for (let i = 0; i < data.length; i++) {

        html += `<div class="cell-md-4">
                    <div class="img-container img-thumbnail">
                        <img src="${data[i].img}">
                        <div class="image-overlay d-flex flex-align-center">
                            <p class="h5 text-light">${data[i].title}</p>
                        </div>
                    </div>
                </div>`;
    }
    
    return html;
}

// Get list infographics
const parameters = {
    path: 'list',
    model: 'infographic',
    lang: 'ind',
    domain: '1800', // see master domain on http://sig.bps.go.id/bridging-kode/index)
    page: 1, // page
    key: '<your_app_id_or_api_key>' // column App ID in table Applications
}

// call
callApi(baseURL, parameters);