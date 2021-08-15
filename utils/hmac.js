const ts  = Date.now();
// pm.environment.set("timestamp", ts);

let paramsObject = {};

const binance_api_secret = process.env.BINANCE_API_SECRET;

const parameters = pm.request.url.query;

parameters.map((param) => {
    if (param.key != 'signature' && 
        param.key != 'timestamp' && 
        !is_empty(param.value) &&
        !is_disabled(param.disabled)) {
            paramsObject[param.key] = param.value;
            //console.log(encodeURIComponent(param.value));
            //pm.environment.set(param.key, encodeURIComponent(param.value));
    }
})
        
Object.assign(paramsObject, {'timestamp': ts});

if (binance_api_secret) {
    const queryString = Object.keys(paramsObject).map((key) => {
        return `${key}=${paramsObject[key]}`;
    }).join('&');
    console.log(queryString);
    const signature = CryptoJS.HmacSHA256(queryString, binance_api_secret).toString();
    pm.environment.set("signature", signature);
}


function is_disabled(str) {
    return str == true;
}

function is_empty(str) {
    if (typeof str == 'undefined' ||
        !str || 
        str.length === 0 || 
        str === "" ||
        !/[^\s]/.test(str) ||
        /^\s*$/.test(str) ||
        str.replace(/\s/g,"") === "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

function addSignature() {
    
}